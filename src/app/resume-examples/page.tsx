import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RESUME_EXAMPLES } from "@/lib/resume-examples-data";

export const metadata: Metadata = {
  title: "Resume Examples & Samples for All Jobs in 2024",
  description: "Browse our collection of professional resume examples for all industries. Get role-specific tips, action verbs, and recommended ATS templates to land your dream job.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/resume-examples",
  }
};

export default function ResumeExamplesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Resume Examples for <span className="text-blue-600">Every Profession</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't stare at a blank page. Get inspired by our hand-crafted resume examples. We've compiled the best skills, action verbs, and templates for dozens of roles.
            </p>
          </div>
        </section>

        {/* Examples Grid */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {RESUME_EXAMPLES.map((example) => (
                <Link 
                  key={example.slug} 
                  href={`/resume-examples/${example.slug}`}
                  className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {example.role} Resume
                  </h2>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {example.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-blue-600">
                    View Example <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-slate-600 mb-6">Ready to create your own professional resume?</p>
              <Link href="/builder">
                <button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 text-base font-semibold shadow-md transition-transform hover:scale-105">
                  Start Building Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
