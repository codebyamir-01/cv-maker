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
    <div className="flex min-h-screen w-full bg-slate-50 font-sans">
      {/* ── LEFT PANEL (Hidden on mobile, split on desktop) ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 lg:flex">
        {/* Gradients and shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>

        {/* Content Top */}
        <div className="relative z-10 flex flex-col p-12 xl:p-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-white">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-slate-900">
              <FileText className="h-5 w-5" />
            </div>
            CV Maker
          </Link>
          <div className="mt-16 max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-white xl:text-5xl">
                Build an <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">ATS-Ready</span> CV in minutes.
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                Join thousands of professionals landing their dream jobs with our premium, ATS-optimized resume builder.
              </p>
            </motion.div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4"
            >
              {[
                { icon: CheckCircle2, text: "ATS-friendly templates" },
                { icon: FileText, text: "Live resume preview" },
                { icon: Download, text: "Download in PDF" },
                { icon: Save, text: "Auto-save progress" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 text-emerald-400 backdrop-blur-sm">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating Mockup Area */}
        <div className="relative z-10 flex flex-1 items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[320px] w-[260px]"
          >
            {/* The Resume Card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-2xl bg-white p-6 shadow-2xl shadow-black/50 ring-1 ring-white/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-100" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
                  <div className="h-2 w-1/2 rounded-full bg-slate-100" />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="h-1.5 w-full rounded-full bg-slate-100" />
                <div className="h-1.5 w-full rounded-full bg-slate-100" />
                <div className="h-1.5 w-4/5 rounded-full bg-slate-100" />
              </div>
              <div className="h-2 w-1/3 rounded-full bg-slate-200 mb-3" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2">
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-slate-200 mt-0.5" />
                    <div className="space-y-1.5 flex-1">
                      <div className="h-1.5 w-full rounded-full bg-slate-100" />
                      <div className="h-1.5 w-5/6 rounded-full bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 top-12 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl"
            >
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Sparkles className="h-3 w-3" />
              </div>
              <span className="text-xs font-bold text-slate-800">14% Completed</span>
            </motion.div>

            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-6 bottom-16 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl"
            >
              <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                <Save className="h-3 w-3" />
              </div>
              <span className="text-xs font-bold text-slate-800">Auto-saved</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Forms) ── */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-12 xl:px-24">
        {/* Mobile branding (only shows on small screens) */}
        <div className="mb-8 flex justify-center lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-slate-900">
              <FileText className="h-5 w-5" />
            </div>
            CV Maker
          </Link>
        </div>
        
        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
