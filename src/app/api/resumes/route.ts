import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateATSScore } from "@/lib/atsScoring";

// GET all resumes for the authenticated user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Single optimized query — no extra user lookup round trip
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        resumes: {
          orderBy: { updatedAt: "desc" },
          select: {
            id: true,
            title: true,
            slug: true,
            templateId: true,
            atsScore: true,
            updatedAt: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { resumes: user.resumes },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=10, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}

// POST to create or update a resume
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();

    // Determine title
    const title = data.personalInfo?.fullName 
      ? `${data.personalInfo.fullName}'s Resume` 
      : "My Resume";

    // Generate Slug if missing
    let slug = data.slug;
    if (!slug) {
      const base = data.personalInfo?.fullName
        ? data.personalInfo.fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : 'resume';
      const randomStr = Math.random().toString(36).substring(2, 6);
      slug = `${base}-${randomStr}`;
    }

    const resumeData = {
      title,
      slug,
      targetRole: data.personalInfo?.jobTitle || null,
      templateId: data.templateId || "ats-classic",
      personalInfo: data.personalInfo || {},
      summary: data.summary || "",
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      
      // Extract optional sections and map them to Prisma fields
      projects: data.optionalSections?.projects || data.projects || [],
      certifications: data.optionalSections?.certifications || [],
      languages: data.optionalSections?.languages || [],
      
      // Store the remaining optional sections in customSections JSON
      customSections: {
        awards: data.optionalSections?.awards || [],
        volunteer: data.optionalSections?.volunteer || [],
        publications: data.optionalSections?.publications || [],
      },
      atsScore: calculateATSScore(data).score,
    };

    // If ID is provided, update existing resume. Otherwise create new.
    if (data.id) {
      const updatedResume = await prisma.resume.update({
        where: { id: data.id, userId: user.id },
        data: resumeData,
      });
      return NextResponse.json({ resume: updatedResume }, { status: 200 });
    } else {
      const newResume = await prisma.resume.create({
        data: {
          ...resumeData,
          userId: user.id,
        },
      });
      return NextResponse.json({ resume: newResume }, { status: 201 });
    }
  } catch (error) {
    console.error("Error saving resume:", error);
    return NextResponse.json({ error: "Failed to save resume" }, { status: 500 });
  }
}
