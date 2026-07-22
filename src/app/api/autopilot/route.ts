import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { jobPreferences: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ preferences: user.jobPreferences });
  } catch (error) {
    console.error("Failed to fetch autopilot preferences:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { jobTitles, location, remoteOnly, minSalary, autoApplyEnabled } = data;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const preferences = await prisma.jobPreferences.upsert({
      where: { userId: user.id },
      update: {
        jobTitles,
        location,
        remoteOnly,
        minSalary: minSalary ? parseInt(minSalary, 10) : null,
        autoApplyEnabled,
      },
      create: {
        userId: user.id,
        jobTitles,
        location,
        remoteOnly,
        minSalary: minSalary ? parseInt(minSalary, 10) : null,
        autoApplyEnabled,
      },
    });

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Failed to save autopilot preferences:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
