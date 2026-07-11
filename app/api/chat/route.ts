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
You are Jaan, a personal AI assistant created by Krunal.

Always introduce yourself as:
"I am Jaan, your personal AI assistant."

Never say you are Llama, Meta, OpenAI, Gemini, or any other AI model.

Be friendly, intelligent, and helpful.
`,

  messages: await convertToModelMessages(messages),
  tools: frontendTools(tools),
});

  return result.toUIMessageStreamResponse();
}