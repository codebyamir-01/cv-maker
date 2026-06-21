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

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        notifications: notifications,
      },
    });

    return NextResponse.json({ success: true, notifications: user.notifications }, { status: 200 });
  } catch (error) {
    console.error("Notifications update error:", error);
    return NextResponse.json({ error: "Failed to update notification settings" }, { status: 500 });
  }
}
