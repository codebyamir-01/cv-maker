import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await req.json();
    if (!notifications || typeof notifications !== "object" || Array.isArray(notifications)) {
      return NextResponse.json({ error: "Invalid notification settings" }, { status: 400 });
    }

    const current = await prisma.user.findUnique({ where: { email: session.user.email }, select: { notifications: true } });
    if (!current) return NextResponse.json({ error: "User not found" }, { status: 404 });
    const existing = current.notifications && typeof current.notifications === "object" && !Array.isArray(current.notifications)
      ? current.notifications as Record<string, unknown> : {};
    // Preserve account job preferences when notification settings are changed.
    const safeNotifications = { ...notifications };
    delete safeNotifications.jobSearchPreferences;

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        notifications: { ...existing, ...safeNotifications },
      },
    });

    return NextResponse.json({ success: true, notifications: user.notifications }, { status: 200 });
  } catch (error) {
    console.error("Notifications update error:", error);
    return NextResponse.json({ error: "Failed to update notification settings" }, { status: 500 });
  }
}
