import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, LayoutTemplate, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import TemplatesSection from "@/components/home/TemplatesSection";

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
            <div className="animate-fade-in inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-300 text-sm font-medium mb-10 tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="opacity-90">The Ultimate Resume Builder</span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up text-[3.5rem] md:text-[6rem] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Professional CV</span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up-delay-1 text-[1.1rem] md:text-[1.35rem] text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Create an ATS-friendly resume in minutes. Use our premium templates and smart tools to build a CV that commands attention and secures interviews.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
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

            {/* Social Proof metrics */}
            <div className="animate-fade-in-up-delay-3 mt-16 pt-10 border-t border-slate-800/60 w-full max-w-3xl flex items-center justify-between gap-4 text-slate-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-70">ATS Pass Rate</div>
              </div>
              <div className="w-px h-10 bg-slate-800/60" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-70">Careers Upgraded</div>
              </div>
              <div className="w-px h-10 bg-slate-800/60" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Free</div>
                <div className="text-xs uppercase tracking-widest font-semibold opacity-70">Premium Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Section – Server Rendered */}
        <div className="cv-below-fold">
          <TemplatesSection />
        </div>

      </main>

      <Footer />
    </div>
  );
}
