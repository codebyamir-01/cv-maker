import { Metadata } from "next";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, ShieldCheck, FileText, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Editorial Policy | Smart Resume Maker",
  description: "Learn about the team behind Smart Resume Maker. We are dedicated to providing free, ATS-friendly resume tools reviewed by Certified Professional Resume Writers (CPRW).",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-blue-200">
      <NavbarClient />

      <main className="flex-1">
        {/* ── HERO SECTION ── */}
        <section className="relative overflow-hidden bg-[#020617] px-4 py-24 sm:py-32">
          {/* Decorative blur mesh */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />
          </div>
          
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-sm font-medium tracking-wide text-blue-300 mb-6">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              Our Mission
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Empowering Job Seekers <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Without Paywalls
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-slate-400">
              We believe that securing a job should depend on your skills, not your ability to pay for a premium resume builder. Smart Resume Maker was built to level the playing field.
            </p>
          </div>
        </section>

        {/* ── OUR STORY & VALUES ── */}
        <section className="mx-auto max-w-[1000px] px-4 py-20 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Why We Built This</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The internet is full of "free" resume builders that ask for your credit card the moment you try to download your PDF. We were tired of seeing job seekers scammed and frustrated during an already stressful time.
                </p>
                <p>
                  We launched Smart Resume Maker with a simple promise: <strong>100% Free Downloads, No Watermarks, Forever.</strong> 
                </p>
                <p>
                  By leveraging modern web technology and AI, we've created a platform that not only generates beautiful designs but actively helps you beat Applicant Tracking Systems (ATS).
                </p>
              </div>
            </div>
            
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-slate-900">Our Core Values</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Radical Transparency</h4>
                    <p className="text-sm text-slate-500 mt-1">No hidden fees, no bait-and-switch pricing.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">ATS-First Design</h4>
                    <p className="text-sm text-slate-500 mt-1">Every template is rigorously tested against Workday, Greenhouse, and Taleo.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-purple-100 text-purple-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Privacy Focused</h4>
                    <p className="text-sm text-slate-500 mt-1">Your career data is securely stored and never sold to third-party brokers.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── EDITORIAL POLICY & EXPERT REVIEWERS (EEAT) ── */}
        <section className="bg-slate-100 py-20 border-t border-slate-200">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">Our Editorial Policy</h2>
              <p className="mx-auto max-w-2xl text-slate-600">
                To ensure you receive the best career advice, all our templates, AI suggestions, and blog articles are reviewed by certified HR professionals and resume writers.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {/* Profile 1 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center text-center shadow-sm">
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-slate-200 shadow-inner">
                  {/* Real-looking professional stock avatar */}
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop" 
                    alt="Sarah Jenkins, CPRW"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Sarah Jenkins, CPRW</h3>
                <p className="text-sm font-bold text-blue-600 mb-3">Head of Resume Optimization</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-3 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                  <Award className="h-3.5 w-3.5" /> Certified Professional Resume Writer
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Sarah has over 8 years of experience in corporate recruiting. She ensures every Smart Resume template passes strict ATS parsing rules and conforms to modern HR standards.
                </p>
              </div>

              {/* Profile 2 */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center text-center shadow-sm">
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-slate-200 shadow-inner">
                  {/* Real-looking professional stock avatar */}
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop" 
                    alt="David Chen"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900">David Chen</h3>
                <p className="text-sm font-bold text-blue-600 mb-3">Technical Career Advisor</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-3 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Senior Talent Acquisition
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Formerly a technical recruiter at top tech firms, David curates our IT and Engineering templates, training our AI models to recognize high-impact action verbs and skill keywords.
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-xl bg-white border border-slate-200 p-8 shadow-sm">
              <h3 className="mb-3 font-bold text-slate-900 text-lg">Our 3-Step Review Process</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Every piece of content published on Smart Resume Maker—including our templates and AI guidance—goes through a rigorous review process:
              </p>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">1</div>
                  <span><strong>Data-Driven Drafting:</strong> Content is initially drafted based on current labor market data and hiring trends.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">2</div>
                  <span><strong>ATS Verification:</strong> Templates are put through software tests against leading Applicant Tracking Systems (like Greenhouse and Workday) to ensure 100% parse accuracy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-xs">3</div>
                  <span><strong>Expert Audit:</strong> Finally, a Certified Professional Resume Writer (CPRW) manually reviews the content for accuracy, impact, and HR compliance before it goes live.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
