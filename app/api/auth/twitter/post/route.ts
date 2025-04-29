import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Client } from "@upstash/qstash";

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch logged-in user
    const loggedUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { accounts: true },
    });
    if (!loggedUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await request.formData();
    const postText = formData.get("postText") as string;
    const scheduleAt = formData.get("scheduleAt") as string;
    const mediaURLS = formData.getAll("mediaURLS") as string[];

    if (!postText && mediaURLS.length === 0) {
      return NextResponse.json(
        { error: "Please enter some text or upload an image" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        userId: loggedUser.id,
        text: postText,
        status: "PENDING",
        scheduledAt: scheduleAt ? new Date(scheduleAt) : null,
        isScheduled: !!scheduleAt,
        imageUrls: mediaURLS.toString(),
      },
    });

    // Initialize QStash client
    const qstashClient = new Client({
      token: process.env.QSTASH_TOKEN!,
    });

    // Use ngrok URL for local development
    const URL = process.env.NEXTAUTH_URL;
    if (!URL) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 500 });
    }

    // Add jobs to QStash for each provider
    try {
      const jobData = {
        postText,
        mediaURLS,
        userId: loggedUser.id,
        scheduledFor: scheduleAt || null,
        postId: post.id,
      };

      // Publish the message to QStash
      const publishResponse = await qstashClient.publishJSON({
        url: `${URL}/api/post/process`,
        body: jobData,
        retries: 3,
        delay: scheduleAt
          ? Math.floor((new Date(scheduleAt).getTime() - Date.now()) / 1000) // Delay in seconds
          : undefined,
      });

      return {
        jobId: publishResponse.messageId,
        status: "queued",
        scheduledFor: scheduleAt || null,
      };
    } catch (error: any) {
      console.error(`Failed to add job for provider:`, error);
      return { error: error.message, status: "failed" };
    }
  } catch (error) {
    console.error("CreatePost Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
