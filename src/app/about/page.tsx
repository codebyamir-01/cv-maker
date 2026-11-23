import { Metadata } from "next";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, FileText, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Editorial Policy | Smart Resume Maker",
  description: "Learn how Smart Resume Maker creates free resume tools and career guides, and how to contact us with corrections or feedback.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/about",
  },
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
                  The internet is full of &quot;free&quot; resume builders that ask for your credit card the moment you try to download your PDF. We were tired of seeing job seekers scammed and frustrated during an already stressful time.
                </p>
                <p>
                  We launched Smart Resume Maker to offer free resume downloads without watermarks.
                </p>
                <p>
                  Using modern web technology and AI, we&apos;ve created tools that help you prepare a clear resume for online applications.
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
                    <p className="text-sm text-slate-500 mt-1">Templates use clear sections and readable formatting. Always review the exported file before applying.</p>
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

        <section className="border-t border-slate-200 bg-slate-100 py-20">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">How we create our guides</h2>
            <p className="max-w-3xl text-slate-600 leading-relaxed">
              Our articles offer practical resume examples and explain common application questions. Some drafts use AI assistance. Advice about applicant tracking systems varies by employer and software, so follow each job posting&apos;s instructions and check your exported resume before submitting it.
            </p>
            <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
              We update guides when we identify errors or outdated advice. If you spot a problem, please <a href="/contact" className="font-semibold text-blue-700 underline">contact us</a> with the article URL and a short description.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
