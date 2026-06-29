import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, CheckSquare, Settings2, FileCheck, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ATS Resume Builder — Beat Applicant Tracking Systems",
  description: "Create an ATS-friendly resume that passes automated screening software. Our ATS resume builder ensures your resume gets read by human recruiters.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/ats-resume-builder",
  }
};

export default function AtsResumeBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              ATS Resume Builder — Get Past the <span className="text-blue-600">Robots</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't let software reject your application before a human even sees it. Build a resume specifically designed to pass Applicant Tracking Systems (ATS).
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-md transition-transform hover:scale-105">
                  Build ATS Resume <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Machine-Readable Fonts
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standard Headings
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Resume formatting checklist
              </div>
            </div>
          </div>
        </section>

        {/* ATS Education Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">What is an ATS and why does it matter?</h2>
              
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="text-lg mb-6">
                  An <strong>Applicant Tracking System (ATS)</strong> is a software application commonly used by employers to manage their recruitment process. Before a human recruiter ever sees your resume, the ATS scans it, extracts your text, and ranks you based on keywords.
                </p>
                
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why good resumes get rejected</h3>
                <p className="mb-6">
                  Many highly qualified candidates get automatically rejected because their resume formatting confuses the software. Things like complex tables, columns, graphics, and non-standard fonts prevent the ATS from reading your skills and experience correctly.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What makes a resume ATS-friendly?</h3>
                <ul className="space-y-3 mb-6 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Standard Section Headings:</strong> Using common names like "Work Experience" instead of "My Professional Journey".</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Clean Formatting:</strong> No complex tables, text boxes, or graphics that hide text from the scanner.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Standard Fonts:</strong> Using readable fonts like Arial, Calibri, or Roboto.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Keyword Optimization:</strong> Including exact phrases from the job description in your skills and experience.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-white border-y border-slate-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold center text-center text-slate-900 mb-12">How our builder helps you beat the ATS</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">ATS-Friendly Templates</h3>
                <p className="text-slate-600">
                  Every template in our library has been designed with common ATS best practices in mind to support reliable text parsing.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Formatting</h3>
                <p className="text-slate-600">
                  You don't need to worry about invisible characters or broken margins. We handle the technical formatting automatically.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time ATS Checking</h3>
                <p className="text-slate-600">
                  Our builder constantly checks your resume for missing information and common mistakes that could trigger an ATS rejection.
                </p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/builder">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 text-base font-semibold">
                  Start Your ATS Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
