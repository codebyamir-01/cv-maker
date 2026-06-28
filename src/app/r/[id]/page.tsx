import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PublicPreview from "@/components/builder/PublicPreview";
import PublicDownloadButton from "@/components/builder/PublicDownloadButton";
import { ResumeData } from "@/store/useResumeStore";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Resume | CV Maker",
    description: "View this resume created with CV Maker.",
  };
}

export default async function PublicResumePage({ params }: Props) {
  const { id } = await params;
  const resume = await prisma.resume.findUnique({
    where: { id },
  });

  if (!resume) {
    notFound();
  }

  // Safely parse JSON fields or provide defaults
  const parsedResumeData: ResumeData = {
    personalInfo: (resume.personalInfo as any) || {
      firstName: "", lastName: "", fullName: "", jobTitle: "", email: "", phone: "", city: "", country: "", location: "", linkedIn: "", github: "", portfolio: ""
    },
    summary: resume.summary || "",
    experience: (resume.experience as any) || [],
    education: (resume.education as any) || [],
    skills: (resume.skills as any) || [],
    optionalSections: {
      projects: (resume.projects as any) || [],
      certifications: (resume.certifications as any) || [],
      languages: (resume.languages as any) || [],
      awards: (resume.customSections as any)?.awards || [],
      volunteer: (resume.customSections as any)?.volunteer || [],
      publications: (resume.customSections as any)?.publications || [],
    },
    templateId: resume.templateId || "ats-classic",
    accentColor: "#0f172a", // Default
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      {/* Sticky Header - hidden on print */}
      <header className="w-full bg-white border-b border-slate-200 p-4 flex justify-between items-center shadow-sm sticky top-0 z-50 print:hidden">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="font-bold text-slate-800 text-lg hidden sm:block">CV Maker</span>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition hidden sm:block">
            Build your own resume
          </a>
          <PublicDownloadButton />
        </div>
      </header>

      {/* Resume Container */}
      <main className="py-8 print:py-0 w-full overflow-x-auto flex justify-center print:block print:w-auto print:overflow-visible">
        <div className="bg-white shadow-xl print:shadow-none print:m-0 mx-auto transform origin-top sm:scale-100 scale-[0.6] sm:mb-0 -mb-[400px]">
          <PublicPreview resumeData={parsedResumeData} />
        </div>
      </main>
    </div>
  );
}
