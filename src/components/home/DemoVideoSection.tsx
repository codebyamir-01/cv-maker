"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Play, Pause, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="demo" className="py-24 px-4 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>See How It Works in 20 Seconds</span>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Built to beat the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
            $20 paywall trap
          </span>
        </h2>
        <p className="text-slate-400 max-w-xl text-base sm:text-lg mb-12 leading-relaxed">
          Watch how fast you can pick a template, score your resume with our AI ATS checker, and download an ATS-ready PDF completely free.
        </p>

        {/* Video Player Container */}
        <div className="relative w-full max-w-sm sm:max-w-md mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-800/80 via-slate-900/60 to-slate-950 border border-slate-800 shadow-[0_0_60px_rgba(37,99,235,0.15)] group">
          <div className="relative overflow-hidden rounded-2xl bg-black aspect-[9/16] max-h-[640px] flex items-center justify-center">
            <video
              ref={videoRef}
              src="/videos/promotion.mp4"
              playsInline
              preload="metadata"
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />

            {/* Play/Pause Overlay Button */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play demo video"
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group cursor-pointer"
              >
                <div className="w-20 h-20 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white flex items-center justify-center shadow-2xl shadow-blue-500/50 transform group-hover:scale-110 transition-all border border-blue-400/40">
                  <Play className="w-8 h-8 ml-1 fill-white" />
                </div>
              </button>
            )}

            {isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Pause demo video"
                className="absolute bottom-4 right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-850 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700/60 cursor-pointer"
              >
                <Pause className="w-4 h-4 fill-white" />
              </button>
            )}
          </div>
        </div>

        {/* Features highlight pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Under 5 Minutes</div>
              <div className="text-slate-400 text-xs">Ready-to-use professional layout</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Real ATS Score</div>
              <div className="text-slate-400 text-xs">AI checks keywords & formatting</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Zero Hidden Fees</div>
              <div className="text-slate-400 text-xs">No credit card or paywall popups</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link href="/builder" prefetch={false}>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-13 text-base font-semibold shadow-lg shadow-blue-500/25 transition-all"
            >
              Start Building Your Resume <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
