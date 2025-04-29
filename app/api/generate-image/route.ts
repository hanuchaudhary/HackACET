import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: `Generate an image based on the following description:  + "${text}"`,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    return NextResponse.json(
      {
        images: result.data,
        status: "success",
        message: "Image generated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
