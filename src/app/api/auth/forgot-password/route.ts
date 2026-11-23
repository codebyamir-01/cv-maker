import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  hashResetValue, newResetToken, resetMailConfigured, RESET_REQUEST_WINDOW_MS,
  RESET_TOKEN_LIFETIME_MS, sendPasswordResetEmail,
} from "@/lib/password-reset";
import { z } from "zod";

const requestSchema = z.object({ email: z.email().max(254).transform(value => value.trim().toLowerCase()) });
const genericMessage = "If this email has a password account, a reset link will arrive shortly.";

export async function POST(req: Request) {
  if (!resetMailConfigured()) {
    return NextResponse.json({ error: "Password reset email is not configured yet." }, { status: 503 });
  }
  const parsed = requestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  const { email } = parsed.data;
  const bucket = Math.floor(Date.now() / RESET_REQUEST_WINDOW_MS);
  const rateToken = hashResetValue(`password-reset-rate:${email}:${bucket}`);
  try {
    // The same response is returned for missing, Google-only, and password accounts.
    // The unique rate token also limits repeated requests for missing addresses.
    await prisma.verificationToken.create({
      data: { identifier: "password-reset-rate", token: rateToken, expires: new Date((bucket + 1) * RESET_REQUEST_WINDOW_MS) },
    });
  } catch (error) {
    if ((error as { code?: unknown })?.code === "P2002") {
      return NextResponse.json({ message: genericMessage });
    }
    console.error("Password reset rate limit store failed");
    return NextResponse.json({ error: "Password reset is temporarily unavailable." }, { status: 503 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, role: true, passwordHash: true } });
    if (user?.role === "USER" && user.passwordHash) {
      const identifier = `password-reset:${user.id}`;
      const token = newResetToken();
      const hashedToken = hashResetValue(token);
      await prisma.$transaction(async tx => {
        await tx.verificationToken.deleteMany({ where: { identifier } });
        await tx.verificationToken.create({
          data: { identifier, token: hashedToken, expires: new Date(Date.now() + RESET_TOKEN_LIFETIME_MS) },
        });
      });
      try {
        await sendPasswordResetEmail(email, token);
      } catch (error) {
        await prisma.verificationToken.deleteMany({ where: { token: hashedToken } });
        throw error;
      }
    }
  } catch (error) {
    const detail = error instanceof Error && error.message.startsWith("Password reset email delivery failed (")
      ? error.message
      : error instanceof Error ? error.name : "unknown";
    console.error("Password reset request failed:", detail);
  }
  return NextResponse.json({ message: genericMessage });
}
