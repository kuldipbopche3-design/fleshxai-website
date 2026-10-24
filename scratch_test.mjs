import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const apiKeyMatch = env.match(/VITE_GEMINI_API_KEY=["']?([^"'\s\r\n]+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1] : "";

async function testFullFlow() {
  const systemInstructionContent = `You are Sam, a warm, polite, and professional AI voice assistant at Flow AI Voice Agency, embedded on our website as a live demonstration.
Your role is to answer questions, explain our agency services (Professional Websites and AI Voice Agents), and introduce our pricing and features to website visitors.

Key rules & behavior:
1. Language: Speak ONLY in English.
2. Greeting: Greet ONLY once at the very beginning of the conversation.
3. Demo Mode Only — No Booking: If asked to book an appointment, state politely: "This demo is designed to answer questions and demonstrate our AI Voice Agent. To book a call, please use the booking form on our website."
4. Tone: Respond in 1 to 2 short, natural conversational sentences. Do NOT use bullet points, asterisks, or markdown.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const testPrompts = [
    "hey I want to book an appointment",
    "what are your prices?",
    "how does the voice agent work?"
  ];

  for (const prompt of testPrompts) {
    const body = {
      system_instruction: {
        parts: [{ text: systemInstructionContent }]
      },
      contents: [
        { role: "user", parts: [{ text: "Hello Sam" }] },
        { role: "model", parts: [{ text: "Hello! Welcome to Flow AI Voice Agency. I'm Sam, your 24/7 AI Desk Receptionist. How can I help you today?" }] },
        { role: "user", parts: [{ text: prompt }] }
      ],
      generationConfig: { maxOutputTokens: 500, temperature: 0.7 }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    console.log(`\n--- Prompt: "${prompt}" ---`);
    console.log("Status:", res.status);
    console.log("Gemini Output:", data.candidates?.[0]?.content?.parts?.[0]?.text);
  }
}

testFullFlow();
