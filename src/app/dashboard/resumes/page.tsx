import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ResumesContent from "./ResumesContent";

export default async function MyResumesPage() {
  const session = await getServerSession(authOptions);
  let resumes: any[] = [];
  
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        resumes: {
          orderBy: { updatedAt: "desc" },
          select: { id: true, title: true, templateId: true, atsScore: true, updatedAt: true, createdAt: true },
        },
      },
    });
    resumes = user?.resumes || [];
  }

  return <ResumesContent initialResumes={resumes} />;
}
