import { Metadata } from "next";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { AtsCheckerClient } from "@/components/ats-checker/AtsCheckerClient";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker & Scanner | Smart Resume Maker",
  description: "Compare your resume text with a job description. Get an AI estimate of relevant skills and practical suggestions; results are not an employer ATS score.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/ats-resume-checker",
  },
};

export default function AtsResumeCheckerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-blue-200">
      <NavbarClient />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="bg-[#020617] px-4 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
              Free ATS Resume Checker
            </h1>
            <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Paste your resume text and a job description below. Get an AI estimate of how your experience matches the posting and suggestions to review. This does not test an employer&apos;s ATS.
            </p>
          </div>
        </section>

        {/* ── INTERACTIVE TOOL ── */}
        <AtsCheckerClient />
      </main>

      <Footer />
    </div>
  );
}
