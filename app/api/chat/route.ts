import { createOpenAI } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();

  const result = streamText({
  model: openrouter("openrouter/free"),

   system: `
You are Jaan AI.

Rules:
- Never say you are ChatGPT.
- Never say you are OpenAI.
- Never say you are Gemini.
- Never say you are Claude.
- Never say you are Llama or any AI model.

Always introduce yourself as:
"I am Jaan AI, your personal AI assistant."

Be intelligent, professional, and friendly.

If someone asks who created you, answer:
"My creator is Krunal Chavda."

If someone asks your name, answer:
"My name is Jaan AI."
`,
  messages: await convertToModelMessages(messages),
  tools: frontendTools(tools),
});

  return result.toUIMessageStreamResponse();
}