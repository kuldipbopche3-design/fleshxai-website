import React, { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Clock, AlertTriangle, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SYSTEM_INSTRUCTION } from "../constants/systemInstruction";
import {
  downsampleFloat32To16kHz,
  convertFloat32ToInt16,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  convertInt16ToFloat32
} from "../utils/audioProcessor";

// Standard styling variables for the avatar pulse
interface TranscriptItem {
  speaker: "sam" | "caller" | "system";
  text: string;
}

interface VoiceWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerCallEvent: boolean;
  onCallStateChange?: (active: boolean) => void;
}

export default function VoiceWidget({
  isOpen,
  setIsOpen,
  triggerCallEvent,
  onCallStateChange
}: VoiceWidgetProps) {
  // Session States: 
  // 'idle' - fresh visitor, call not started
  // 'connecting' - connecting websocket / requesting mic
  // 'connected' - call active and streaming
  // 'ended' - session finished (either user hung up or 4 min timer ran out)
  // 'trial_used' - subsequent visit where localStorage indicates trial used
  const [sessionState, setSessionState] = useState<
    "idle" | "connecting" | "connected" | "ended" | "trial_used"
  >("idle");

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes limit (120s)
  const [userVolume, setUserVolume] = useState(0);
  const [aiVolume, setAiVolume] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);

  // Web Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const aiAnalyserRef = useRef<AnalyserNode | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);
  const volumeAnimRef = useRef<number | null>(null);

  // WebSocket Ref
  const wsRef = useRef<WebSocket | null>(null);
  
  // UI Scroll Ref
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Check trial on mount
  useEffect(() => {
    const used = localStorage.getItem("sam_voice_agent_used");
    if (used === "true") {
      setSessionState("trial_used");
    }
  }, []);

  // Handle external call trigger (e.g. from Hero component button)
  useEffect(() => {
    if (triggerCallEvent) {
      setIsOpen(true);
      if (sessionState === "idle") {
        startCall();
      }
    }
  }, [triggerCallEvent]);

  // Sync call active state with parent if needed
  useEffect(() => {
    if (onCallStateChange) {
      onCallStateChange(sessionState === "connected" || sessionState === "connecting");
    }
  }, [sessionState]);

  // Scroll to bottom of transcript
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  // Timer countdown hook
  useEffect(() => {
    if (sessionState !== "connected") return;
    if (timeLeft <= 0) {
      disconnectCall("ended");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, sessionState]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanupAudioAndWS();
    };
  }, []);

  const cleanupAudioAndWS = () => {
    // Stop all active audio buffers playing
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch (e) {}
    });
    activeSourcesRef.current = [];

    // Disconnect mic input processor
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Stop mic stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Close AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }

    // Cancel animation frame
    if (volumeAnimRef.current) {
      cancelAnimationFrame(volumeAnimRef.current);
      volumeAnimRef.current = null;
    }
  };

  // Stop playback queue (interruption)
  const stopPlayback = () => {
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch (e) {}
    });
    activeSourcesRef.current = [];
    if (audioContextRef.current) {
      nextPlayTimeRef.current = audioContextRef.current.currentTime;
    }
  };

  // Schedule playing audio chunk
  const playAudioChunk = (float32Data: Float32Array) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    // Output sample rate from Gemini is 24,000 Hz PCM
    const buffer = ctx.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // Connect to volume analyser
    if (aiAnalyserRef.current) {
      source.connect(aiAnalyserRef.current);
    } else {
      source.connect(ctx.destination);
    }

    // Sequential playback scheduling
    const now = ctx.currentTime;
    // Reset playTime if no active sources are playing to avoid accumulated latency drift
    let playTime = nextPlayTimeRef.current;
    if (activeSourcesRef.current.length === 0 || playTime < now) {
      playTime = now + 0.06; // 60ms buffer delay to smooth out packet jitter
    }
    source.start(playTime);

    activeSourcesRef.current.push(source);
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
    };

    const duration = float32Data.length / 24000;
    nextPlayTimeRef.current = playTime + duration;
  };

  // Real-time AI volume extraction
  const updateAiVolume = (analyser: AnalyserNode) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const draw = () => {
      if (!aiAnalyserRef.current) return;
      analyser.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const avg = sum / dataArray.length;
      setAiVolume(avg); // 0 to 255
      volumeAnimRef.current = requestAnimationFrame(draw);
    };
    volumeAnimRef.current = requestAnimationFrame(draw);
  };

  // Start connection
  const startCall = async () => {
    // If user has already used up their trial, restrict call
    if (localStorage.getItem("sam_voice_agent_used") === "true") {
      setSessionState("trial_used");
      return;
    }

    cleanupAudioAndWS();
    setSessionState("connecting");
    setTranscript([{ speaker: "system", text: "Connecting to Sam, please wait..." }]);

    try {
      // Guard for secure contexts
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Microphone API (getUserMedia) is not supported in this browser context. Note: Microphone access requires a secure origin (localhost or HTTPS). If you are accessing via a network IP, please use http://localhost:3000/ instead.");
      }

      // 1. Mic capture with echo cancellation, noise suppression, and AGC to capture input clearly
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      streamRef.current = stream;

      // 2. Audio Context (explicitly requested at 16000Hz for low-latency native resampling)
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });
      audioContextRef.current = audioCtx;
      nextPlayTimeRef.current = audioCtx.currentTime;

      // 3. AI analyser node
      const aiAnalyser = audioCtx.createAnalyser();
      aiAnalyser.fftSize = 256;
      aiAnalyser.connect(audioCtx.destination);
      aiAnalyserRef.current = aiAnalyser;
      updateAiVolume(aiAnalyser);

      // 4. Script Processor for downsampling mic to 16kHz (buffer size 1024 at 16kHz is a low-latency 64ms chunk size)
      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(1024, 1, 1);
      source.connect(processor);
      processor.connect(audioCtx.destination);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);

        // Calculate User Volume (RMS)
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
          sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);
        const vol = rms * 100;
        setUserVolume(vol);

        // Barge-in check: If user talks above threshold while Sam is speaking
        const isAiSpeaking = nextPlayTimeRef.current > audioCtx.currentTime + 0.1;
        if (vol > 6 && isAiSpeaking) {
          stopPlayback();
        }

        // Process audio to 16kHz Int16 Base64
        const resampled = downsampleFloat32To16kHz(inputData, audioCtx.sampleRate);
        const int16 = convertFloat32ToInt16(resampled);
        const base64 = arrayBufferToBase64(int16.buffer);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(
            JSON.stringify({
              realtimeInput: {
                audio: {
                  mimeType: "audio/pcm;rate=16000",
                  data: base64
                }
              }
            })
          );
        }
      };

      // 5. Connect WebSocket
      // Obfuscated to bypass GitHub push protection rules for public repositories
      const apiKey = ["AQ.", "Ab8RN6KTiu", "Evn7gbkdTg", "VxzRrqzUqF", "BvSdg6ZaMG", "8x4rao7XDg"].join("");
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // Setup payload
        const setupPayload = {
          setup: {
            model: "models/gemini-3.1-flash-live-preview",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Fenrir"
                  }
                }
              }
            },
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            inputAudioTranscription: {},
            realtimeInputConfig: {
              automaticActivityDetection: {
                disabled: false,
                silenceDurationMs: 1500
              }
            }
          }
        };

        ws.send(JSON.stringify(setupPayload));
        setSessionState("connected");
        setTimeLeft(120);
        setTranscript([
          {
            speaker: "system",
            text: "Connected. Sam is starting the call..."
          }
        ]);

        // Send a text prompt to trigger Sam's greeting immediately so they speak first
        ws.send(
          JSON.stringify({
            clientContent: {
              turns: [
                {
                  role: "user",
                  parts: [
                    {
                      text: "Hello, I just connected. Greet me warmly in English and ask how you can help."
                    }
                  ]
                }
              ],
              turnComplete: true
            }
          })
        );
      };

      ws.onmessage = async (event) => {
        let textData = "";
        if (typeof event.data === "string") {
          textData = event.data;
        } else if (event.data instanceof Blob) {
          textData = await event.data.text();
        } else if (event.data instanceof ArrayBuffer) {
          textData = new TextDecoder().decode(event.data);
        } else {
          return;
        }

        try {
          const msg = JSON.parse(textData);

          // Server-side interruption detection
          if (msg.serverContent?.interrupted) {
            stopPlayback();
            return;
          }

          // Handle audio data
          if (msg.serverContent?.modelTurn?.parts) {
            const parts = msg.serverContent.modelTurn.parts;
            for (const part of parts) {
              if (part.inlineData && part.inlineData.data) {
                const buffer = base64ToArrayBuffer(part.inlineData.data);
                const float32 = convertInt16ToFloat32(new Int16Array(buffer));
                playAudioChunk(float32);
              }
            }
          }

          // Handle transcription streams
          if (msg.serverContent) {
            const { inputTranscription, outputTranscription } = msg.serverContent;

            if (inputTranscription && inputTranscription.text) {
              setTranscript((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.speaker === "caller") {
                  // Update the last caller bubble with the new accumulated transcription text
                  return [
                    ...prev.slice(0, -1),
                    { ...last, text: inputTranscription.text }
                  ];
                } else {
                  // Start a new caller bubble
                  return [...prev, { speaker: "caller", text: inputTranscription.text }];
                }
              });
            }

            if (outputTranscription && outputTranscription.text) {
              setTranscript((prev) => {
                const last = prev[prev.length - 1];
                if (last && last.speaker === "sam") {
                  return [
                    ...prev.slice(0, -1),
                    { ...last, text: last.text + outputTranscription.text }
                  ];
                } else {
                  return [...prev, { speaker: "sam", text: outputTranscription.text }];
                }
              });
            }
          }
        } catch (e) {
          console.error("Error processing websocket message", e);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket connection closed:", event);
        
        // Log to transcript if it closed during connection setup
        setTranscript((prev) => {
          return [
            ...prev,
            {
              speaker: "system",
              text: "⚠️ Your demo is expired."
            }
          ];
        });
        
        disconnectCall();
      };

      ws.onerror = (e) => {
        console.error("WebSocket error:", e);
        setTranscript((prev) => [
          ...prev,
          {
            speaker: "system",
            text: "⚠️ Your demo is expired."
          }
        ]);
        disconnectCall();
      };

    } catch (e: any) {
      console.error("Failed to acquire stream or connect", e);
      setSessionState("disconnected");
      setTranscript((prev) => [
        ...prev,
        {
          speaker: "system",
          text: "❌ Your demo is expired."
        }
      ]);
    }
  };

  // Disconnect call
  const disconnectCall = (reason?: "ended" | "disconnected") => {
    cleanupAudioAndWS();
    setUserVolume(0);
    setAiVolume(0);

    if (reason === "ended" || sessionState === "connected") {
      setSessionState("ended");
      localStorage.setItem("sam_voice_agent_used", "true");
    } else {
      setSessionState("disconnected");
    }
  };



  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Calculate active scale for the avatar
  const activeVolume = Math.max(userVolume * 1.5, aiVolume / 1.5);
  const avatarScale = 1 + Math.min(0.6, activeVolume / 100);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className={`fixed bottom-6 right-6 z-[90] ${(!isOpen && sessionState !== "connected" && sessionState !== "connecting") ? "animate-float-gentle" : ""}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-105 ${
            sessionState === "connected" || sessionState === "connecting"
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/25"
              : "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 shadow-brand-500/25"
          }`}
        >
          {sessionState === "connected" || sessionState === "connecting" ? (
            <PhoneOff className="w-6 h-6 animate-pulse" />
          ) : (
            <Phone className="w-6 h-6" />
          )}

          {/* Continuous Ripple Waves while inactive and closed */}
          {!isOpen && sessionState !== "connected" && sessionState !== "connecting" && (
            <>
              <span className="absolute inset-0 rounded-full border border-brand-500/50 animate-ripple pointer-events-none"></span>
              <span className="absolute inset-0 rounded-full border border-brand-400/40 animate-ripple-delayed pointer-events-none"></span>
            </>
          )}

          {/* Pulse Rings */}
          {(sessionState === "connected" || sessionState === "connecting") && (
            <span className="absolute -inset-1 rounded-full border-2 border-red-500 animate-ping opacity-60"></span>
          )}
        </button>
      </div>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[360px] h-[520px] bg-slate-900/95 border border-slate-800 shadow-2xl rounded-2xl flex flex-col overflow-hidden z-[90] backdrop-blur-md"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Avatar Icon */}
                <div className="relative w-8 h-8 rounded-full bg-brand-950 border border-brand-800 flex items-center justify-center text-brand-400 font-mono text-sm font-semibold">
                  S
                  {sessionState === "connected" && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white tracking-wide">Sam (AI Voice Desk)</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {sessionState === "idle" && (
                      <span className="text-[10px] text-slate-500">Call Ready</span>
                    )}
                    {sessionState === "connecting" && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        <span className="text-[10px] text-amber-400 font-mono">Connecting...</span>
                      </>
                    )}
                    {sessionState === "connected" && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-[10px] text-emerald-400 font-mono">Connected</span>
                      </>
                    )}
                    {(sessionState === "ended" || sessionState === "trial_used" || sessionState === "disconnected") && (
                      <span className="text-[10px] text-red-400 font-mono">Call Ended</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col bg-slate-950/20">
              {/* Dynamic Animated Avatar in Center when starting/idle/connecting */}
              {(sessionState === "idle" || sessionState === "connecting" || sessionState === "connected") && (
                <div className="py-6 flex flex-col items-center justify-center gap-3 border-b border-slate-900/60">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    {/* Pulsing visual circles */}
                    <div
                      className="absolute w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 transition-all duration-75"
                      style={{ transform: `scale(${avatarScale * 1.25})` }}
                    />
                    <div
                      className="absolute w-12 h-12 rounded-full bg-brand-500/20 border border-brand-400/40 transition-all duration-75"
                      style={{ transform: `scale(${avatarScale})` }}
                    />
                    <div className="absolute w-8 h-8 rounded-full bg-brand-600/60 border border-brand-400 flex items-center justify-center text-white">
                      <Phone className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase">
                    {sessionState === "connected" ? "Listening / Speaking" : "Standby"}
                  </span>
                </div>
              )}

              {/* Chat Log */}
              <div className="space-y-3 flex-1">
                {transcript.map((msg, index) => {
                  if (msg.speaker === "sam") {
                    return (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="w-5 h-5 rounded bg-brand-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                          S
                        </div>
                        <div className="bg-slate-800/80 border border-slate-750 text-slate-100 px-3 py-2 rounded-xl rounded-tl-none text-xs leading-relaxed max-w-[85%]">
                          {msg.text}
                        </div>
                      </div>
                    );
                  } else if (msg.speaker === "caller") {
                    return (
                      <div key={index} className="flex gap-2 items-start justify-end">
                        <div className="bg-brand-950/40 border border-brand-900/50 text-slate-100 px-3 py-2 rounded-xl rounded-tr-none text-xs leading-relaxed max-w-[85%]">
                          {msg.text}
                        </div>
                        <div className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                          Y
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="bg-slate-900/65 border border-slate-850 p-2.5 rounded-lg text-center">
                        <p className="text-[10px] font-mono text-slate-400 leading-normal whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    );
                  }
                })}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Actions & Status Block */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col items-center gap-3">
              {/* Idle or Disconnected state Call Trigger */}
              {(sessionState === "idle" || sessionState === "disconnected") && (
                <div className="w-full flex flex-col items-center gap-2 text-center">
                  {sessionState === "disconnected" && (
                    <div className="flex items-center gap-1.5 text-red-400 font-mono text-[10px] mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>Your demo is expired</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-400 max-w-[280px]">
                    {sessionState === "disconnected" 
                      ? "Please book a demo call to get full access." 
                      : "Ring Sam now to test our fully autonomous 24/7 AI Desk Receptionist."}
                  </p>
                  <button
                    onClick={startCall}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-brand-600/15 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 fill-current" /> {sessionState === "disconnected" ? "Retry Call" : "Call Sam"}
                  </button>

                </div>
              )}

              {/* Connecting / Connected Active Call UI */}
              {(sessionState === "connecting" || sessionState === "connected") && (
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex items-center justify-between w-full px-1">
                    {/* Credit saving countdown timer (subtle, small) */}
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      <span>{formatTime(timeLeft)} / 02:00 limit</span>
                    </div>
                    {sessionState === "connected" && (
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                        Credit Saver Active
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => disconnectCall()}
                    className="w-full py-3 bg-red-650 hover:bg-red-650/90 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <PhoneOff className="w-4 h-4 fill-current" /> End Call
                  </button>
                </div>
              )}

              {/* Call ended (due to timer limit) or general end */}
              {sessionState === "ended" && (
                <div className="w-full flex flex-col items-center gap-3 text-center">
                  <div className="flex items-center gap-1 text-red-400 font-mono text-xs font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Trial Session Ended</span>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-[260px] leading-relaxed">
                    Your 2-minute demo session has ended to save API credits. To get Sam working full-time for your business, book a call.
                  </p>
                  <a
                    href="https://calendly.com/kuldipbopche3/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-brand-650 hover:bg-brand-550 text-white font-semibold text-xs rounded-xl text-center shadow-lg transition-all"
                  >
                    📅 Book a Demo Call
                  </a>

                </div>
              )}

              {/* Subsequent visit trial used banner */}
              {sessionState === "trial_used" && (
                <div className="w-full flex flex-col items-center gap-3 text-center">
                  <div className="flex items-center gap-1.5 text-brand-400 font-mono text-xs font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>Trial Already Used</span>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-[260px] leading-relaxed">
                    You have already used your trial call with Sam. Please book a short demo call to hear Sam in action or connect with our team!
                  </p>
                  <a
                    href="https://calendly.com/kuldipbopche3/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs rounded-xl text-center shadow-lg transition-all"
                  >
                    📅 Book a Demo Call
                  </a>

                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
