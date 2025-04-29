// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations/validations";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { data, error } = signupSchema.safeParse(body);

    if (error) {
      return NextResponse.json(
        { error: error.issues.map((issue) => issue.message) },
        { status: 422 }
      );
    }

    const { email, password, name } = data;

    // Check for existing user
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true, // Exclude sensitive fields like password
      },
    });

    // Return success response
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle specific Prisma errors
    if (error instanceof Error && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}