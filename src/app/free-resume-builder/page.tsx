import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, ShieldCheck, FileText, LayoutTemplate, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free Resume Builder 2026: Create & Download PDF — No Watermarks",
  description: "Build a professional resume for free in under 5 minutes. Download as PDF instantly with no watermarks, no hidden fees. ATS-optimized templates. No credit card needed.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/free-resume-builder",
  },
};

// JSON-LD schemas injected via Next.js script tag below
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is this resume builder really free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! You can create, edit, and download your resume in PDF format completely for free. We do not place watermarks on your document or force you to pay before downloading."
      }
    },
    {
      "@type": "Question",
      "name": "What is an ATS-friendly resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Applicant Tracking Systems (ATS) are software used by employers to scan resumes before a human sees them. Our templates are specifically designed to be easily readable by these systems so your resume reaches a human recruiter."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download my resume as a PDF for free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, PDF is the best format for sending resumes because it preserves your formatting perfectly across all devices. We offer instant, high-quality PDF downloads with no watermarks."
      }
    },
    {
      "@type": "Question",
      "name": "Can I edit my resume later?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Your progress is auto-saved. You can log into your dashboard at any time to make updates, change templates, or create multiple versions of your resume."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to create an account to build a resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No account is required to start building your resume. Simply go to the builder and start adding your information right away. Create a free account to save and manage multiple resumes."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create a Free Resume in 3 Steps",
  "description": "Build a professional, ATS-friendly resume for free using Smart Resume Maker and download it as a PDF instantly.",
  "totalTime": "PT5M",
  "supply": [
    { "@type": "HowToSupply", "name": "A web browser" },
    { "@type": "HowToSupply", "name": "Your work history and contact information" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Pick a Template",
      "text": "Browse our collection of ATS-friendly resume templates and pick the one that matches your industry and style. You can always change it later with a single click.",
      "url": "https://www.smartresumemaker.com/templates"
    },
    {
      "@type": "HowToStep",
      "name": "Fill in your Details",
      "text": "Use our smart AI suggestions to quickly add your experience, skills, and education. The builder auto-saves your progress as you type.",
      "url": "https://www.smartresumemaker.com/builder"
    },
    {
      "@type": "HowToStep",
      "name": "Download Free PDF",
      "text": "Once you are happy with how your resume looks, hit the download button to instantly export a clean, watermark-free PDF ready for job applications.",
      "url": "https://www.smartresumemaker.com/builder"
    }
  ]
};

export default function FreeResumeBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      {/* JSON-LD: FAQ rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* JSON-LD: HowTo rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Free Resume Builder — Create & Download <span className="text-blue-600">Instantly</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop paying for simple PDF downloads. Our resume builder is completely free to use. Build your ATS-friendly resume and download it without any hidden fees or watermarks.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-md transition-transform hover:scale-105">
                  Start Building for Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free PDF Download
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Watermarks
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card Required
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why use our free resume maker?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center transition-shadow hover:shadow-md">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Truly Free Downloads</h3>
                <p className="text-slate-600">
                  Many builders ask for payment at the very end. We let you download your finished PDF instantly without hitting a paywall.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center transition-shadow hover:shadow-md">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LayoutTemplate className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Professional Templates</h3>
                <p className="text-slate-600">
                  Access dozens of premium, ATS-optimized templates designed by recruiters to help you pass automated screening software.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center transition-shadow hover:shadow-md">
                <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Privacy</h3>
                <p className="text-slate-600">
                  Your personal information is secure. We don't sell your data, and your resume remains completely private to you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 px-4 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Create your resume in 3 simple steps</h2>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Pick a Template</h3>
                  <p className="text-slate-600 text-lg">Browse our collection of ATS-friendly templates and pick the one that matches your industry and style. You can always change it later with a single click.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Fill in your Details</h3>
                  <p className="text-slate-600 text-lg">Use our smart suggestions to quickly add your experience, skills, and education. The builder auto-saves your progress as you type.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Download Free PDF</h3>
                  <p className="text-slate-600 text-lg">Once you're happy with how your resume looks, hit the download button to instantly export a clean, watermark-free PDF ready for job applications.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Link href="/builder">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 text-base font-semibold">
                  Start Your Free Resume
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Is this resume builder really free?</h3>
                <p className="text-slate-600">Yes! You can create, edit, and download your resume in PDF format completely for free. We do not place watermarks on your document or force you to pay before downloading.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">What is an ATS-friendly resume?</h3>
                <p className="text-slate-600">Applicant Tracking Systems (ATS) are software used by employers to scan resumes. Our templates are specifically designed to be easily readable by these systems so your resume actually reaches a human recruiter.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I download my resume as a PDF?</h3>
                <p className="text-slate-600">Yes, PDF is the best format for sending resumes because it preserves your formatting perfectly across all devices. We offer instant, high-quality PDF downloads.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I edit my resume later?</h3>
                <p className="text-slate-600">Absolutely. Your progress is auto-saved. You can log into your dashboard at any time to make updates, change templates, or create multiple versions of your resume.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
