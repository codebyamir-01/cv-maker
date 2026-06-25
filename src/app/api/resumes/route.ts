import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all resumes for the authenticated user
export async function GET() {
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

    const resumes = await prisma.resume.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ resumes }, { status: 200 });
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

    const resumeData = {
      title,
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
