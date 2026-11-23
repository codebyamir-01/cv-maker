import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashResetValue } from "@/lib/password-reset";
import bcrypt from "bcryptjs";
import { z } from "zod";

const resetSchema = z.object({
  token: z.string().min(20).max(512),
  password: z.string().min(8).max(128),
});

export async function POST(req: Request) {
  const parsed = resetSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid reset link and password of 8 to 128 characters." }, { status: 400 });

  const tokenHash = hashResetValue(parsed.data.token);
  const saved = await prisma.verificationToken.findUnique({ where: { token: tokenHash } });
  if (!saved?.identifier.startsWith("password-reset:") || saved.expires <= new Date()) {
    return NextResponse.json({ error: "This reset link is invalid or expired. Request a new one." }, { status: 400 });
  }

  const userId = saved.identifier.slice("password-reset:".length);
  const newHash = await bcrypt.hash(parsed.data.password, 10);
  const changed = await prisma.$transaction(async tx => {
    const consumed = await tx.verificationToken.deleteMany({
      where: { token: tokenHash, identifier: saved.identifier, expires: { gt: new Date() } },
    });
    if (consumed.count !== 1) return false;
    const updated = await tx.user.updateMany({
      where: { id: userId, role: "USER", passwordHash: { not: null } },
      data: { passwordHash: newHash },
    });
    if (updated.count !== 1) return false;
    await tx.verificationToken.deleteMany({ where: { identifier: saved.identifier } });
    return true;
  });

  if (!changed) return NextResponse.json({ error: "This reset link is invalid or expired. Request a new one." }, { status: 400 });
  return NextResponse.json({ message: "Password updated. You can now sign in." });
}
