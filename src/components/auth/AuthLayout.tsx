"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, FileText, Download, Save, Sparkles } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-slate-50 font-sans">
      {/* ── LEFT PANEL (Hidden on mobile, split on desktop) ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 lg:flex h-full">
        {/* Gradients and shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

        {/* Content Top */}
        <div className="relative z-10 flex flex-col p-[clamp(1.5rem,4vh,3rem)]">
          <Link href="/" className="flex items-center gap-2 text-[clamp(1.25rem,2.5vh,1.5rem)] font-black tracking-tighter text-white">
            <div className="grid h-[clamp(1.75rem,3.5vh,2rem)] w-[clamp(1.75rem,3.5vh,2rem)] place-items-center rounded-lg bg-emerald-500 text-slate-900">
              <FileText className="h-[clamp(1rem,2vh,1.25rem)] w-[clamp(1rem,2vh,1.25rem)]" />
            </div>
            CV Maker
          </Link>
          <div className="mt-[clamp(1.5rem,4vh,3rem)] max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-[clamp(1.75rem,4.5vh,2.5rem)] font-extrabold leading-tight tracking-tight text-white xl:text-[clamp(2rem,5vh,3rem)]">
                Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">ATS-Ready</span> CV in minutes.
              </h1>
              <p className="mt-[clamp(0.5rem,1.5vh,1rem)] text-[clamp(0.875rem,2vh,1.125rem)] text-slate-300">
                Join thousands of professionals landing their dream jobs with our premium, ATS-optimized resume builder.
              </p>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-[clamp(1rem,3vh,2.5rem)] grid grid-cols-2 gap-x-4 gap-y-[clamp(0.5rem,1.5vh,1rem)]"
            >
              {[
                { icon: CheckCircle2, text: "ATS-friendly templates" },
                { icon: FileText, text: "Live resume preview" },
                { icon: Download, text: "Download in PDF" },
                { icon: Save, text: "Auto-save progress" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <div className="grid h-[clamp(1.5rem,3vh,2rem)] w-[clamp(1.5rem,3vh,2rem)] shrink-0 place-items-center rounded-full bg-white/5 text-emerald-400 backdrop-blur-sm">
                    <item.icon className="h-[clamp(0.75rem,1.5vh,1rem)] w-[clamp(0.75rem,1.5vh,1rem)]" />
                  </div>
                  <span className="text-[clamp(0.75rem,1.5vh,0.875rem)] font-medium leading-tight">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Mockup Area */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-[clamp(1rem,2vh,2rem)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[clamp(240px,38vh,320px)] w-[clamp(180px,30vh,260px)]"
          >
            {/* The Resume Card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl bg-white p-[clamp(1rem,2.5vh,1.5rem)] shadow-2xl shadow-black/50 ring-1 ring-white/10"
            >
              <div className="mb-[clamp(0.5rem,1.5vh,1rem)] flex items-center gap-[clamp(0.5rem,1vh,0.75rem)]">
                <div className="h-[clamp(1.5rem,4vh,2.5rem)] w-[clamp(1.5rem,4vh,2.5rem)] shrink-0 rounded-full bg-slate-100" />
                <div className="space-y-[clamp(0.2rem,0.5vh,0.375rem)] flex-1">
                  <div className="h-[clamp(0.375rem,1vh,0.625rem)] w-3/4 rounded-full bg-slate-200" />
                  <div className="h-[clamp(0.25rem,0.7vh,0.5rem)] w-1/2 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="space-y-[clamp(0.25rem,0.8vh,0.5rem)] mb-[clamp(0.75rem,2vh,1.5rem)]">
                <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-full rounded-full bg-slate-100" />
                <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-full rounded-full bg-slate-100" />
                <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-4/5 rounded-full bg-slate-100" />
              </div>
              <div className="h-[clamp(0.375rem,1vh,0.5rem)] w-1/3 rounded-full bg-slate-200 mb-[clamp(0.375rem,1vh,0.75rem)]" />
              <div className="space-y-[clamp(0.375rem,1vh,0.75rem)]">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-[clamp(0.25rem,0.6vh,0.5rem)]">
                    <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-[clamp(0.25rem,0.7vh,0.375rem)] shrink-0 rounded-full bg-slate-200 mt-0.5" />
                    <div className="space-y-[clamp(0.2rem,0.5vh,0.375rem)] flex-1">
                      <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-full rounded-full bg-slate-100" />
                      <div className="h-[clamp(0.25rem,0.7vh,0.375rem)] w-5/6 rounded-full bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 top-8 flex items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-xl sm:-right-8 sm:top-12 sm:gap-2 sm:px-3 sm:py-2"
            >
              <div className="grid h-[clamp(1rem,2.5vh,1.5rem)] w-[clamp(1rem,2.5vh,1.5rem)] shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Sparkles className="h-[clamp(0.5rem,1.2vh,0.75rem)] w-[clamp(0.5rem,1.2vh,0.75rem)]" />
              </div>
              <span className="text-[clamp(0.6rem,1.4vh,0.75rem)] font-bold text-slate-800">14% Completed</span>
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-4 bottom-12 flex items-center gap-1.5 rounded-xl bg-white px-2 py-1.5 shadow-xl sm:-left-6 sm:bottom-16 sm:gap-2 sm:px-3 sm:py-2"
            >
              <div className="grid h-[clamp(1rem,2.5vh,1.5rem)] w-[clamp(1rem,2.5vh,1.5rem)] shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Save className="h-[clamp(0.5rem,1.2vh,0.75rem)] w-[clamp(0.5rem,1.2vh,0.75rem)]" />
              </div>
              <span className="text-[clamp(0.6rem,1.4vh,0.75rem)] font-bold text-slate-800">Auto-saved</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Forms) ── */}
      <div className="flex h-[100dvh] w-full flex-col overflow-y-auto px-4 py-[clamp(1.5rem,3vh,3rem)] sm:px-6 lg:w-1/2 lg:px-12 xl:px-24">
        {/* Mobile branding (only shows on small screens) */}
        <div className="mb-6 flex justify-center lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-slate-900">
              <FileText className="h-5 w-5" />
            </div>
            CV Maker
          </Link>
        </div>
        
        <div className="mx-auto my-auto w-full max-w-md shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
}
