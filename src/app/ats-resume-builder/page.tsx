import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert, CheckSquare, Settings2, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free ATS Resume Builder | Clear, Readable PDF Resume",
  description: "Create an ATS-friendly resume with clear headings and a selectable-text PDF option. Review your content against the job description before applying.",
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
              ATS Resume Builder — Make Your Resume <span className="text-blue-600">Readable</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Use clear section headings, relevant experience, and a selectable-text PDF. You can check how your document reads before applying; no builder can guarantee an employer&apos;s screening decision.
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
                  An <strong>Applicant Tracking System (ATS)</strong> helps employers receive and manage applications. Some systems extract resume text or support keyword searches, but employers use different tools and review processes.
                </p>
                
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why readability matters</h3>
                <p className="mb-6">
                  Dense tables, image-only PDFs, and unusual section labels can make a resume harder to read or copy. Clear headings and selectable text help you inspect what a recruiter or application system may receive.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">What makes a resume ATS-friendly?</h3>
                <ul className="space-y-3 mb-6 list-none pl-0">
                  <li className="flex items-start gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Standard Section Headings:</strong> Use common names such as Work Experience instead of creative labels that may be unclear.</span>
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
            <h2 className="text-3xl font-bold center text-center text-slate-900 mb-12">How our builder helps you prepare a readable resume</h2>
            
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
                  Review your exported PDF for readable text, spacing, and section order before you apply.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time ATS Checking</h3>
                <p className="text-slate-600">
                  Review missing information and common formatting issues before downloading. You can also inspect a PDF with our <Link href="/ats-resume-checker" className="font-semibold text-blue-700 underline">ATS readability checker</Link>.
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
