import { NextRequest, NextResponse } from "next/server";
import { Client } from "@upstash/qstash";
import { prisma } from "@/lib/prisma";
import { twitterPostPublish } from "@/lib/TwitterUtils/TwitterUtils";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

async function handler(request: NextRequest) {
  const jobData = await request.json();

  if (!jobData) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }

  const { postText, mediaURLS, userId, scheduledFor, postId } = jobData;

  let loggedUser: any;
  try {
    // Fetch the post to check its status
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Post not found.");
    }

    loggedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true },
    });

    if (!loggedUser) {
      throw new Error("User not found.");
    }

    let postResponse;
    const twitterAccount = loggedUser.accounts.find(
      (acc: { provider: string }) => acc.provider === "twitter"
    );
    if (!twitterAccount) {
      throw new Error("Twitter account not found.");
    }

    if (!twitterAccount.access_token || !twitterAccount.access_token_secret) {
      throw new Error("Twitter access token not found.");
    }

    postResponse = await twitterPostPublish(
      postText,
      twitterAccount.access_token,
      twitterAccount.access_token_secret,
      mediaURLS
    );

    if (postResponse.error) {
      throw new Error(postResponse.error);
    }

    // Update post status to SUCCESS
    await prisma.post.update({
      where: { id: postId },
      data: { status: "PUBLISHED" },
    });


    return NextResponse.json({
      response: postResponse,
    });
  } catch (error: any) {

    // Update post status to FAILED with the error message
    await prisma.post.update({
      where: { id: postId },
      data: {
        status: "FAILED",
        text: error.message,
      },
    });

    // If this is the last retry, schedule media deletion
    const retryCount = request.headers.get("x-qstash-retry-count") || "0";
    const maxRetries = process.env.QSTASH_MAX_RETRIES || "3"; // Set max retries in your env
    if (parseInt(retryCount) >= parseInt(maxRetries)) {
      console.log("Max retries reached, scheduling media deletion...");
      await qstashClient.publishJSON({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/delete`,
        body: {
          mediaURLS,
        },
        delay: 60,
      });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const POST = verifySignatureAppRouter(handler, {
  currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY,
  nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY,
});
