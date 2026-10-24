import React, { useState, useEffect, useRef } from "react";
import { Phone, PhoneOff, Clock, X, Lock, Send, Mic, MicOff, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SYSTEM_INSTRUCTION } from "../constants/systemInstruction";

interface ChatMessage {
  speaker: "sam" | "caller" | "system";
  text: string;
}

interface VoiceWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerCallEvent: boolean;
  onCallStateChange?: (active: boolean) => void;
}

// ─── Neural Human Voice Picker ────────────────────────────────────────────────
function getBestVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Edge & Chrome Natural / Neural voices
  const neural = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Neural"))
  );
  if (neural) return neural;

  // 2. Google English voices (Chrome)
  const google = voices.find(
    (v) => v.lang.startsWith("en") && (v.name.includes("Google US") || v.name.includes("Google UK"))
  );
  if (google) return google;

  // 3. Any Google English voice
  const googleAny = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google"));
  if (googleAny) return googleAny;

  // 4. Any English voice except old Windows robotic voices (David, Zira)
  const standardEn = voices.find(
    (v) => v.lang.startsWith("en") && !["David", "Zira", "Hazel", "Cortana"].some((b) => v.name.includes(b))
  );
  if (standardEn) return standardEn;

  return voices.find((v) => v.lang.startsWith("en")) || voices[0] || null;
}

export default function VoiceWidget({
  isOpen,
  setIsOpen,
  triggerCallEvent,
  onCallStateChange
}: VoiceWidgetProps) {
  const [sessionState, setSessionState] = useState<
    "idle" | "connecting" | "connected" | "ended" | "trial_used"
  >("idle");

  const [timeLeft, setTimeLeft] = useState(120);
  const [userVolume, setUserVolume] = useState(0);
  const [aiVolume, setAiVolume] = useState(0);
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [statusText, setStatusText] = useState<string>("Standby");
  const [interimUserText, setInterimUserText] = useState<string>("");
  const [activeVoiceName, setActiveVoiceName] = useState<string>("");
  const [apiErrorMsg, setApiErrorMsg] = useState<string | null>(null);

  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem("voice_agent_unlocked") === "true";
  });

  // State refs
  const isAliveRef = useRef(false);
  const isMutedRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const conversationHistoryRef = useRef<{ role: string; parts: { text: string }[] }[]>([]);
  const lastProcessedPhraseRef = useRef("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Audio meter refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleUnlocked = () => setIsUnlocked(true);
    window.addEventListener("voice_agent_unlocked", handleUnlocked);

    const updateVoiceList = () => {
      const v = getBestVoice();
      if (v) setActiveVoiceName(v.name);
    };

    updateVoiceList();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }

    const used = localStorage.getItem("sam_voice_agent_used");
    if (used === "true") setSessionState("trial_used");

    return () => {
      window.removeEventListener("voice_agent_unlocked", handleUnlocked);
    };
  }, []);

  useEffect(() => {
    if (triggerCallEvent) {
      setIsOpen(true);
      if (!isUnlocked) {
        scrollToForm();
      } else if (sessionState === "idle") {
        startCall();
      }
    }
  }, [triggerCallEvent]);

  useEffect(() => {
    onCallStateChange?.(sessionState === "connected" || sessionState === "connecting");
  }, [sessionState]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, interimUserText]);

  useEffect(() => {
    if (sessionState !== "connected") return;
    if (timeLeft <= 0) {
      endCall();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, sessionState]);

  useEffect(() => {
    return () => stopAll();
  }, []);

  const scrollToForm = () => {
    setIsOpen(false);
    const el = document.getElementById("ask-question-form") || document.getElementById("booking");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const stopAll = () => {
    isAliveRef.current = false;
    isSpeakingRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
      recognitionRef.current = null;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (_) {}
      audioContextRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    setUserVolume(0);
    setAiVolume(0);
    setStatusText("Standby");
    setInterimUserText("");
  };

  // ─── Robust Speech Output (Safe Un-Stuck Speech Synthesizer) ─────────────────
  const speakText = (fullText: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    // Reset speech engine
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    isSpeakingRef.current = true;

    // Temporarily pause mic recognition while Sam speaks to prevent mic feedback
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }

    const cleanText = fullText.replace(/[*_#`~]/g, "").trim();
    if (!cleanText) {
      isSpeakingRef.current = false;
      setStatusText("Listening...");
      setAiVolume(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getBestVoice();
    if (voice) {
      utterance.voice = voice;
      setActiveVoiceName(voice.name);
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    let finished = false;
    const maxDurationMs = Math.max(3500, cleanText.length * 80);

    const finishSpeech = () => {
      if (!finished) {
        finished = true;
        isSpeakingRef.current = false;
        setStatusText("Listening...");
        setAiVolume(0);

        // Resume mic recognition
        if (isAliveRef.current && recognitionRef.current) {
          try {
            recognitionRef.current.start();
          } catch (_) {}
        }
      }
    };

    const safetyTimer = setTimeout(finishSpeech, maxDurationMs);

    utterance.onstart = () => {
      setStatusText("Sam Speaking");
      setAiVolume(65);
    };

    utterance.onend = () => {
      clearTimeout(safetyTimer);
      finishSpeech();
    };

    utterance.onerror = () => {
      clearTimeout(safetyTimer);
      finishSpeech();
    };

    window.speechSynthesis.speak(utterance);
  };

  // ─── Query Gemini 2.5 Flash (Confirmed Active 200 OK Model) ──────────────────
  const processUserSpeech = async (userText: string) => {
    if (!isAliveRef.current || !userText.trim()) return;

    setStatusText("Thinking...");
    setApiErrorMsg(null);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing in .env");
      }

      // Ensure valid alternating history starting with user role
      const rawHistory = conversationHistoryRef.current.slice(-8);
      const validHistory: { role: string; parts: { text: string }[] }[] = [];

      for (const item of rawHistory) {
        if (validHistory.length === 0) {
          if (item.role === "user") validHistory.push(item);
        } else {
          const lastRole = validHistory[validHistory.length - 1].role;
          if (item.role !== lastRole) {
            validHistory.push(item);
          }
        }
      }

      const contents = [
        ...validHistory,
        { role: "user", parts: [{ text: userText }] }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents,
            generationConfig: {
              maxOutputTokens: 500, // Ample output space for complete answers
              temperature: 0.7
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[VoiceWidget] Gemini 2.5 API error response:", errorData);
        throw new Error(errorData.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()?.replace(/\n+/g, " ") || "";

      if (!replyText || !isAliveRef.current) return;

      // Save to history
      conversationHistoryRef.current.push(
        { role: "user", parts: [{ text: userText }] },
        { role: "model", parts: [{ text: replyText }] }
      );

      setTranscript((prev) => [...prev, { speaker: "sam", text: replyText }]);

      // Speak complete reply
      speakText(replyText);

    } catch (err: any) {
      console.error("[VoiceWidget] Gemini 2.5 Flash error:", err);
      setApiErrorMsg(err.message || "Failed to query Gemini API");
      const fallback = "I'm sorry, I couldn't process that. Could you please try asking again?";
      setTranscript((prev) => [...prev, { speaker: "sam", text: fallback }]);
      speakText(fallback);
    }
  };

  // ─── Speech Recognition (Listening) ─────────────────────────────────────────
  const startSpeechRecognition = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      console.warn("[VoiceWidget] Speech Recognition not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
      recognitionRef.current = null;
    }

    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    recognitionRef.current = rec;

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    rec.onresult = (e: any) => {
      if (isSpeakingRef.current) return;

      let interim = "";
      let newFinalPhrase = "";

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcriptChunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          newFinalPhrase += transcriptChunk;
        } else {
          interim += transcriptChunk;
        }
      }

      if (interim) {
        setInterimUserText(interim);
        setStatusText("User Speaking...");
      }

      const cleanFinal = newFinalPhrase.trim();
      if (cleanFinal) {
        setInterimUserText("");

        if (cleanFinal.length < 2) return;
        if (cleanFinal.toLowerCase() === lastProcessedPhraseRef.current.toLowerCase()) return;

        lastProcessedPhraseRef.current = cleanFinal;
        setTranscript((prev) => [...prev, { speaker: "caller", text: cleanFinal }]);

        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          processUserSpeech(cleanFinal);
        }, 300);
      }
    };

    rec.onerror = (e: any) => {
      if (e.error !== "no-speech" && e.error !== "aborted") {
        console.warn("[VoiceWidget] Speech recognition error:", e.error);
      }
    };

    rec.onend = () => {
      if (!isAliveRef.current) return;
      if (isSpeakingRef.current) return;

      setTimeout(() => {
        if (isAliveRef.current && recognitionRef.current === rec && !isSpeakingRef.current) {
          try {
            rec.start();
          } catch (_) {}
        }
      }, 150);
    };

    try {
      rec.start();
      setStatusText("Listening...");
    } catch (err) {
      console.warn("[VoiceWidget] Speech recognition start error:", err);
    }
  };

  // ─── Start Call ──────────────────────────────────────────────────────────────
  const startCall = async () => {
    const unlocked = localStorage.getItem("voice_agent_unlocked") === "true";
    if (!unlocked) {
      setIsUnlocked(false);
      setIsOpen(true);
      scrollToForm();
      return;
    }

    localStorage.removeItem("sam_voice_agent_used");
    stopAll();

    isAliveRef.current = true;
    isMutedRef.current = false;
    lastProcessedPhraseRef.current = "";

    const greetingText = "Hello! Welcome to Flow AI Voice Agency. I'm Sam, your 24/7 AI Desk Receptionist. How can I help you today?";
    conversationHistoryRef.current = [
      { role: "user", parts: [{ text: "Hello Sam" }] },
      { role: "model", parts: [{ text: greetingText }] }
    ];

    setTranscript([{ speaker: "sam", text: greetingText }]);
    setIsMuted(false);
    setTimeLeft(120);
    setSessionState("connected");
    setStatusText("Connecting...");

    // Setup Mic Audio Visualizer
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateMicVol = () => {
          if (!isAliveRef.current || !analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
          if (!isMutedRef.current) {
            setUserVolume(Math.min(100, (sum / dataArray.length) * 2));
          }
          animFrameRef.current = requestAnimationFrame(updateMicVol);
        };
        updateMicVol();
      }
    } catch (micErr) {
      console.warn("[VoiceWidget] Mic audio meter setup warning:", micErr);
    }

    startSpeechRecognition();
    speakText(greetingText);
  };

  const sendTextMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || !isAliveRef.current) return;

    setTextInput("");
    setTranscript((prev) => [...prev, { speaker: "caller", text: trimmed }]);
    await processUserSpeech(trimmed);
  };

  const endCall = () => {
    stopAll();
    setSessionState("idle");
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    isMutedRef.current = next;
    if (next) setUserVolume(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const activeVol = Math.max(userVolume, aiVolume);
  const avatarScale = 1 + Math.min(0.5, activeVol / 100);

  // ─── Render UI ───────────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating Call Button */}
      <div className={`fixed bottom-6 right-6 z-[90] ${
        !isOpen && sessionState !== "connected" && sessionState !== "connecting" ? "animate-float-gentle" : ""
      }`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 transform hover:scale-105 ${
            sessionState === "connected" || sessionState === "connecting"
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/25"
              : "bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 shadow-brand-500/25"
          }`}
        >
          {sessionState === "connected" || sessionState === "connecting"
            ? <PhoneOff className="w-6 h-6 animate-pulse" />
            : <Phone className="w-6 h-6" />}

          {!isOpen && sessionState !== "connected" && sessionState !== "connecting" && (
            <>
              <span className="absolute inset-0 rounded-full border border-brand-500/50 animate-ripple pointer-events-none" />
              <span className="absolute inset-0 rounded-full border border-brand-400/40 animate-ripple-delayed pointer-events-none" />
            </>
          )}
          {(sessionState === "connected" || sessionState === "connecting") && (
            <span className="absolute -inset-1 rounded-full border-2 border-red-500 animate-ping opacity-60" />
          )}
        </button>
      </div>

      {/* Main Voice Panel */}
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
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0 w-8 h-8 rounded-full bg-brand-950 border border-brand-800 flex items-center justify-center text-brand-400 font-mono text-sm font-semibold">
                  S
                  {sessionState === "connected" && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-950" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-white tracking-wide truncate flex items-center gap-1.5">
                    Sam — AI Voice Desk
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {sessionState === "idle" && (
                      <span className="text-[10px] text-slate-400 font-mono">Gemini 2.5 Flash Engine</span>
                    )}
                    {sessionState === "connecting" && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] text-amber-400 font-mono">Connecting...</span>
                      </>
                    )}
                    {sessionState === "connected" && (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[10px] text-emerald-400 font-mono truncate">
                          Gemini 2.5 Flash · Active
                        </span>
                      </>
                    )}
                    {(sessionState === "ended" || sessionState === "trial_used") && (
                      <span className="text-[10px] text-red-400 font-mono">Call Ended</span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="shrink-0 text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content / Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-slate-950/20">
              {/* API Error Notification */}
              {apiErrorMsg && (
                <div className="mb-2 p-2 bg-red-950/80 border border-red-800 text-red-300 text-[11px] font-mono rounded-lg">
                  ⚠️ {apiErrorMsg}
                </div>
              )}

              {/* Avatar Visualization */}
              {(sessionState === "idle" || sessionState === "connecting" || sessionState === "connected") && (
                <div className="py-5 flex flex-col items-center justify-center gap-3 border-b border-slate-900/60 shrink-0">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div
                      className="absolute w-16 h-16 rounded-full bg-brand-500/10 border border-brand-500/20 transition-all duration-75"
                      style={{ transform: `scale(${avatarScale * 1.25})` }}
                    />
                    <div
                      className="absolute w-12 h-12 rounded-full bg-brand-500/20 border border-brand-400/40 transition-all duration-75"
                      style={{ transform: `scale(${avatarScale})` }}
                    />
                    <div className="absolute w-8 h-8 rounded-full bg-brand-600/60 border border-brand-400 flex items-center justify-center text-white">
                      {statusText.includes("Speaking") ? (
                        <Volume2 className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Phone className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-mono text-slate-300 tracking-widest uppercase flex items-center gap-1.5">
                      {isMuted ? (
                        "Mic Muted"
                      ) : (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-ping" />
                          {statusText}
                        </>
                      )}
                    </span>
                    {activeVoiceName && sessionState === "connected" && (
                      <span className="text-[9px] font-mono text-brand-400/80 truncate max-w-[220px]">
                        Voice: {activeVoiceName}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="space-y-3 flex-1 mt-3">
                {transcript.map((msg, i) => {
                  if (msg.speaker === "sam") return (
                    <div key={i} className="flex gap-2 items-start">
                      <div className="w-5 h-5 rounded bg-brand-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">S</div>
                      <div className="bg-slate-800/80 border border-slate-700 text-slate-100 px-3 py-2 rounded-xl rounded-tl-none text-xs leading-relaxed max-w-[85%]">
                        {msg.text}
                      </div>
                    </div>
                  );
                  if (msg.speaker === "caller") return (
                    <div key={i} className="flex gap-2 items-start justify-end">
                      <div className="bg-brand-950/40 border border-brand-900/50 text-slate-100 px-3 py-2 rounded-xl rounded-tr-none text-xs leading-relaxed max-w-[85%]">
                        {msg.text}
                      </div>
                      <div className="w-5 h-5 rounded bg-slate-800 text-slate-300 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">Y</div>
                    </div>
                  );
                  return (
                    <div key={i} className="bg-slate-900/65 border border-slate-800 p-2.5 rounded-lg text-center">
                      <p className="text-[10px] font-mono text-slate-400 leading-normal">{msg.text}</p>
                    </div>
                  );
                })}

                {/* Interim live transcript as user speaks */}
                {interimUserText && (
                  <div className="flex gap-2 items-start justify-end opacity-75">
                    <div className="bg-brand-950/30 border border-brand-800/40 text-brand-200 px-3 py-2 rounded-xl rounded-tr-none text-xs leading-relaxed max-w-[85%] font-mono italic">
                      {interimUserText}...
                    </div>
                    <div className="w-5 h-5 rounded bg-slate-800 text-slate-400 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">Y</div>
                  </div>
                )}

                {/* Thinking indicator */}
                {statusText === "Thinking..." && (
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded bg-brand-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">S</div>
                    <div className="bg-slate-800/80 border border-slate-700 px-3 py-2 rounded-xl rounded-tl-none text-xs leading-relaxed">
                      <span className="text-brand-300 font-mono text-[11px] animate-pulse">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col items-center gap-3 shrink-0">
              {!isUnlocked ? (
                <div className="w-full flex flex-col items-center gap-2.5 text-center p-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                    <Lock className="w-4 h-4 animate-pulse" /><span>Inquiry Form Required</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed max-w-[270px]">
                    To test Sam AI Voice Receptionist live, please fill out the inquiry form. Details will be sent to{" "}
                    <strong className="text-brand-300 font-mono">kuldeepbopche0@gmail.com</strong> and activate your test call!
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white font-semibold text-xs rounded-xl shadow-lg font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Lock className="w-4 h-4" /> Complete Form to Unlock Test →
                  </button>
                </div>
              ) : (
                <>
                  {(sessionState === "idle" || sessionState === "ended" || sessionState === "trial_used") && (
                    <div className="w-full flex flex-col items-center gap-2 text-center">
                      <p className="text-xs text-slate-400 max-w-[280px]">
                        Ring Sam now — powered by Gemini 2.5 Flash Engine.
                      </p>
                      <button
                        onClick={startCall}
                        className="w-full py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold text-xs rounded-xl shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-mono"
                      >
                        <Phone className="w-4 h-4 fill-current" /> Call Sam (Start Voice Call)
                      </button>
                    </div>
                  )}

                  {(sessionState === "connecting" || sessionState === "connected") && (
                    <div className="w-full flex flex-col items-center gap-2.5">
                      <div className="flex items-center justify-between w-full px-1">
                        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          <span>{formatTime(timeLeft)} / 02:00 limit</span>
                        </div>
                        {sessionState === "connected" && (
                          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Call Active
                          </span>
                        )}
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          sendTextMessage(textInput);
                        }}
                        className="flex items-center gap-2 w-full"
                      >
                        <button
                          type="button"
                          onClick={toggleMute}
                          className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                            isMuted
                              ? "bg-red-600/80 hover:bg-red-600 text-white"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                          }`}
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                        <input
                          type="text"
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Speak into mic or type here..."
                          className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-500 font-mono"
                        />
                        <button
                          type="submit"
                          className="bg-brand-600 hover:bg-brand-500 text-white text-xs px-3 py-2.5 rounded-xl font-mono flex items-center gap-1 cursor-pointer transition-all shrink-0"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>

                      <button
                        onClick={endCall}
                        className="w-full py-2.5 bg-red-600/90 hover:bg-red-600 text-white font-semibold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer font-mono"
                      >
                        <PhoneOff className="w-4 h-4 fill-current" /> End Call
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
