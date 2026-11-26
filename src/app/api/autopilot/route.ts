import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CURRENCIES, WORK_MODES, currencyForCountry } from "@/lib/job-preferences";

export async function GET(req: Request) {
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

    const extra = user.notifications && typeof user.notifications === "object" && !Array.isArray(user.notifications)
      ? (user.notifications as Record<string, unknown>).jobSearchPreferences : null;
    const jobSearch = extra && typeof extra === "object" && !Array.isArray(extra) ? extra as Record<string, unknown> : {};
    return NextResponse.json({
      preferences: user.jobPreferences ? { ...user.jobPreferences, currency: jobSearch.currency, workModes: jobSearch.workModes } : null,
      suggestedCurrency: currencyForCountry(req.headers.get("x-vercel-ip-country")),
    });
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

    const data: unknown = await req.json();
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ error: "Invalid preferences" }, { status: 400 });
    }
    const { jobTitles, location, workModes, currency, minSalary } = data as Record<string, unknown>;

    if (!Array.isArray(jobTitles) || jobTitles.length < 1 || jobTitles.length > 5 || jobTitles.some((title) => typeof title !== "string" || !title.trim() || title.length > 80) ||
      typeof location !== "string" || location.length > 100 || !Array.isArray(workModes) || workModes.length < 1 || workModes.length > 4 || new Set(workModes).size !== workModes.length || workModes.some((mode) => typeof mode !== "string" || !WORK_MODES.includes(mode as typeof WORK_MODES[number])) ||
      typeof currency !== "string" || !CURRENCIES.includes(currency as typeof CURRENCIES[number]) || (minSalary !== "" && (typeof minSalary !== "string" || !/^\d+$/.test(minSalary) || !Number.isSafeInteger(Number(minSalary)) || Number(minSalary) > 1000000000))) {
      return NextResponse.json({ error: "Check job titles, location, work modes, currency, and salary." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, notifications: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const existing = user.notifications && typeof user.notifications === "object" && !Array.isArray(user.notifications)
      ? user.notifications as Record<string, unknown> : {};
    const fields = {
      jobTitles, location,
      remoteOnly: workModes.length === 1 && workModes[0] === "remote",
      minSalary: minSalary !== "" ? Number(minSalary) : null,
      autoApplyEnabled: false,
    };
    const preferences = await prisma.$transaction(async (tx) => {
      const saved = await tx.jobPreferences.upsert({
        where: { userId: user.id }, update: fields, create: { userId: user.id, ...fields },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { notifications: { ...existing, jobSearchPreferences: { currency, workModes } } },
      });
      return saved;
    });

    return NextResponse.json({ preferences: { ...preferences, currency, workModes } });
  } catch (error) {
    console.error("Failed to save autopilot preferences:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
