import { NextResponse } from "next/server";
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(prompt: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.1-8b-instant",
  });
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const prompt = `Enhance the following text to make it more engaging and suitable for social media ${text}.`;

    const res = await getGroqChatCompletion(prompt);
    const enhancedText = res.choices[0].message.content;

    return NextResponse.json(enhancedText);
  } catch (error) {
    console.error("Error generating enhancedText:", error);
    return NextResponse.json(
      { error: "Failed to generate enhancedText", message: error },
      { status: 500 }
    );
  }
}
