import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, LayoutTemplate, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import dynamic from "next/dynamic";

const TemplatesSection = dynamic(() => import("@/components/home/TemplatesSection"));

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-200">

      <Navbar />
      <main className="flex-1">
        {/* Hero Section – Above the fold, no lazy-load */}
        <section className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] bg-[#020617]">
          {/* Gradient mesh background – CSS only, no JS */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[100px]" />
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20v-20zm-20 0h20v20H0v-20z' fill='%23fff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl flex flex-col items-center">

            {/* Pill Badge */}
            <div className="md:animate-fade-in inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-300 text-sm font-medium mb-10 tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="opacity-90">The Ultimate Resume Builder</span>
            </div>

            {/* Main Headline */}
            <h1 className="md:animate-fade-in-up text-[3.5rem] md:text-[6rem] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Professional CV</span>
            </h1>

            {/* Subheadline */}
            <p className="md:animate-fade-in-up-delay-1 text-[1.1rem] md:text-[1.35rem] text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Create an ATS-friendly resume in minutes. Use our premium templates and smart tools to build a CV that commands attention and secures interviews.
            </p>

            {/* CTA Buttons */}
            <div className="md:animate-fade-in-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-14 text-[1rem] font-semibold shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.03] border border-blue-500 hover:border-blue-400">
                  Start Building <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-10 h-14 text-[1rem] font-semibold transition-all hover:text-white">
                  View Templates
                </Button>
              </Link>
            </div>

            {/* Trust claims */}
            <div className="md:animate-fade-in-up-delay-3 mt-16 pt-10 border-t border-slate-800/60 w-full max-w-4xl flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-300">Free PDF Download</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-300">No Watermark</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-300">ATS-Friendly</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-slate-300">Auto-Save</span>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <div className="cv-below-fold" id="templates">
          <TemplatesSection />
        </div>

        {/* ATS Education Section */}
        <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What is an ATS and why does it matter?</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Many modern employers use an <strong>Applicant Tracking System (ATS)</strong> to filter resumes before a human ever sees them. If your resume isn't formatted correctly, the robot will reject it.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span className="text-slate-300"><strong>Simple formatting:</strong> No confusing tables or columns that break parsers.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span className="text-slate-300"><strong>Standard headings:</strong> "Work Experience" instead of "My Journey".</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <span className="text-slate-300"><strong>Machine-readable fonts:</strong> Clean, standard typography.</span>
                </li>
              </ul>
              <Link href="/ats-resume-builder">
                <Button variant="outline" className="text-slate-900 bg-white hover:bg-slate-100 border-none rounded-full px-8 h-12">
                  Learn more about ATS Resumes
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl relative">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
                  <div className="font-bold text-xl">Resume Score</div>
                  <div className="text-3xl font-extrabold text-emerald-400">95%</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Contact Info</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Professional Summary</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience Formatting</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Keyword Density</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Privacy Section */}
        <section className="py-24 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <ShieldCheck className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Your data is safe with us</h2>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              We believe your career information belongs to you. We've built Smart Resume Maker with privacy and security at its core.
            </p>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" /> Private by default
                </h3>
                <p className="text-sm text-slate-600">Your resume is never shared publicly unless you explicitly choose to share a link.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" /> Auto-saved securely
                </h3>
                <p className="text-sm text-slate-600">Your progress is automatically saved to your account so you never lose your work.</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" /> Free PDF Download
                </h3>
                <p className="text-sm text-slate-600">Download your resume as a clean PDF instantly. No hidden fees or watermarks.</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
