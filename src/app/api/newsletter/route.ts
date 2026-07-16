import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body?.email ?? "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }

    // Upsert — silently succeed if email is already subscribed
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email },
      update: {}, // no-op if already exists
    });

    return NextResponse.json({ message: "You're subscribed! 🎉" });
  } catch (error: any) {
    console.error("[newsletter] subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
