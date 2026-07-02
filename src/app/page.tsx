/**
 * Homepage — pure Server Component.
 * Uses NavbarStatic (no client JS / no session) to avoid blocking FCP on mobile.
 * Hero text renders immediately: no opacity-0 animations, no blur meshes on mobile.
 * Below-the-fold sections are dynamically imported.
 */
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";
import { NavbarStatic } from "@/components/layout/NavbarStatic";
import dynamic from "next/dynamic";

// Dynamically import ALL below-the-fold sections
const TemplatesSection = dynamic(() => import("@/components/home/TemplatesSection"), {
  loading: () => <div className="py-32 bg-[#1e293b]" aria-hidden="true" />,
});

const AtsSection = dynamic(() => import("@/components/home/AtsSection"), {
  loading: () => <div className="py-24 bg-slate-900" aria-hidden="true" />,
});

const TrustSection = dynamic(() => import("@/components/home/TrustSection"), {
  loading: () => <div className="py-24 bg-white" aria-hidden="true" />,
});

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-200">

      {/* Zero-JS server-rendered navbar — no useSession, no hydration cost */}
      <NavbarStatic />

      <main className="flex-1">
        {/* ─── Hero Section ─────────────────────────────────────────────────
            LCP element = <h1>  "Build Your Professional CV"
            Rules enforced:
            • No animation classes (they set opacity:0 initial state)
            • No backdrop-blur on mobile
            • No blur mesh divs on mobile (hidden md:block)
            • No min-h-[90vh] — avoids layout blocking before LCP
            • No heavy box-shadow on CTAs
        ────────────────────────────────────────────────────────────────── */}
        <section className="relative pt-36 pb-24 px-4 flex flex-col items-center justify-center bg-[#020617]">

          {/* Decorative blur mesh — DESKTOP ONLY */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" aria-hidden="true">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[100px]" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">

            {/* Pill badge — no backdrop-blur (GPU cost), no animation */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-300 text-sm font-medium mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden="true" />
              The Ultimate Resume Builder
            </div>

            {/* LCP element — <h1> — fully visible from first paint */}
            <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-extrabold tracking-tight text-white mb-5 leading-[1.08]">
              Build Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Professional CV
              </span>
            </h1>

            {/* Subheadline — visible immediately */}
            <p className="text-base sm:text-lg md:text-[1.3rem] text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Create an ATS-friendly resume in minutes. Use our premium templates
              and smart tools to build a CV that commands attention and secures interviews.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link href="/builder" prefetch={false}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-13 text-base font-semibold border border-blue-500 transition-colors"
                >
                  Start Building <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-10 h-13 text-base font-semibold transition-colors hover:text-white"
                >
                  View Templates
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="mt-12 pt-8 border-t border-slate-800/60 w-full max-w-3xl flex flex-wrap items-center justify-center gap-5 sm:gap-8">
              {["Free PDF Download", "No Watermark", "ATS-Friendly", "Auto-Save"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-slate-300 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Below the fold — lazy loaded with content-visibility ────── */}
        <div className="cv-below-fold" id="templates">
          <TemplatesSection />
        </div>

        <div className="cv-below-fold">
          <AtsSection />
        </div>

        <div className="cv-below-fold">
          <TrustSection />
        </div>

      </main>

      <Footer />
    </div>
  );
}



