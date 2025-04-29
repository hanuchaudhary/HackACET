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
    const { keyword } = await request.json();

    console.log(keyword);
    

    if (!keyword) {
      return NextResponse.json(
        { error: "Keyword is required" },
        { status: 400 }
      );
    }

    const prompt = `Generate 5 creative Twitter post ideas about "${keyword}". 
    Each idea should be engaging, include relevant hashtags, and be under 280 characters.
    Format your response as a valid JSON array of objects with ONLY "id" and "text" properties.
    Do not include any explanations, introductions, or additional text outside of the JSON array.`;

    const res = await getGroqChatCompletion(prompt);
    const ideas = res.choices[0].message.content;

    return NextResponse.json(ideas);
  } catch (error) {
    console.error("Error generating ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" ,message : error},
      { status: 500 }
    );
  }
}
