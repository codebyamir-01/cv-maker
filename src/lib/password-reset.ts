import "server-only";
import { createHash, randomBytes } from "node:crypto";

export const RESET_TOKEN_LIFETIME_MS = 30 * 60 * 1000;
export const RESET_REQUEST_WINDOW_MS = 5 * 60 * 1000;

export function hashResetValue(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function newResetToken(): string {
  return randomBytes(32).toString("base64url");
}

export function resetMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.PASSWORD_RESET_FROM_EMAIL && process.env.NEXTAUTH_URL);
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const origin = new URL(process.env.NEXTAUTH_URL!).origin;
  // A fragment keeps the raw token out of HTTP request logs and Referer headers.
  const resetUrl = `${origin}/forgot-password#token=${encodeURIComponent(token)}`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.PASSWORD_RESET_FROM_EMAIL,
      to: [email],
      subject: "Reset your Smart Resume Maker password",
      text: `Use this link to reset your password: ${resetUrl}\n\nThe link expires in 30 minutes. If you did not request this, you can ignore this email.`,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const failure = await response.json().catch(() => null) as { name?: unknown } | null;
    const code = typeof failure?.name === "string" ? failure.name.replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 40) : "unknown";
    throw new Error(`Password reset email delivery failed (${response.status}; ${code})`);
  }
}
