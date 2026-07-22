import { Metadata } from "next";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { CoverLetterClient } from "@/components/cover-letter/CoverLetterClient";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator | 1-Click Builder | Smart Resume Maker",
  description: "Instantly generate a highly personalized, ATS-friendly cover letter using your resume and a job description. Powered by advanced AI.",
};

export default function CoverLetterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-blue-200">
      <NavbarClient />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="bg-[#020617] px-4 py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl mb-6">
              AI Cover Letter Generator
            </h1>
            <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
              Stop writing cover letters from scratch. Paste a job description below, and our AI will cross-reference it with your existing resume to write a perfect, customized letter in seconds.
            </p>
          </div>
        </section>

        {/* ── INTERACTIVE TOOL ── */}
        <CoverLetterClient />
      </main>

      <Footer />
    </div>
  );
}
