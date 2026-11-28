import { Metadata } from "next";
import Link from "next/link";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { CoverLetterClient } from "@/components/cover-letter/CoverLetterClient";

export const metadata: Metadata = {
  title: "Cover Letter Generator From Your Resume | Free Tool",
  description: "Use details from a resume you built here and a job description to draft a cover letter. Review and edit the letter before sending an application.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/cover-letter",
  },
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
              Use the resume you built here and a job description to draft a cover letter for a specific role. Review the result for accuracy and adjust it to sound like you.
            </p>
          </div>
        </section>

        {/* ── INTERACTIVE TOOL ── */}
        <CoverLetterClient />
        <section className="mx-auto max-w-5xl px-4 pb-20 text-slate-700 sm:px-6" aria-labelledby="cover-letter-steps">
          <h2 id="cover-letter-steps" className="text-2xl font-bold text-slate-900">How to create a cover letter from your resume</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7">
            <li><Link href="/builder" className="font-semibold text-blue-700 underline">Build your resume</Link> with the experience and skills you want to use. This tool reads the resume data saved in this browser.</li>
            <li>Paste the job description above and choose a tone. Compare the role requirements with your actual experience.</li>
            <li>Generate a draft, then verify every claim, add a specific reason you want the role, and copy the final text into your application.</li>
          </ol>
          <p className="mt-5 text-sm text-slate-600">If your resume was created on another device, open it in the builder here first. A cover letter does not replace a tailored resume.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
