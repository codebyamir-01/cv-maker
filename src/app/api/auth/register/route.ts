import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.email().max(254).transform((value) => value.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});

export async function POST(req: Request) {
  try {
    const parsed = registrationSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Enter a valid email and a password of 8 to 128 characters." },
        { status: 400 }
      );
    }
    const { name, email, password } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser.id, name: newUser.name, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
