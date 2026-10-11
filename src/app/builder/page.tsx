"use client";

import { useState, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Download, CheckCircle2, ZoomIn, ZoomOut,
  RotateCcw, Lightbulb, Loader2
} from "lucide-react";

import { useResumeStore } from "@/store/useResumeStore";
import { useBuilderNavigation, STEPS, ZOOM_OPTIONS } from "@/hooks/useBuilderNavigation";
import { usePdfDownload } from "@/hooks/usePdfDownload";

import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import SummaryForm from "@/components/builder/SummaryForm";
import DataLoader from "@/components/builder/DataLoader";
import AutoSaver from "@/components/builder/AutoSaver";
import DownloadSuccessModal from "@/components/builder/DownloadSuccessModal";

/* ─── Lazy-load heavy form components ─────────────────────────
   Keeps each form step and template separate from the initial bundle.
─────────────────────────────────────────────────────────────────── */
const FormSkeleton = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
    <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-slate-100 rounded-xl" />)}
    </div>
  </div>
);

const ExperienceForm = dynamic(() => import("@/components/builder/ExperienceForm"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const EducationForm = dynamic(() => import("@/components/builder/EducationForm"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const SkillsForm = dynamic(() => import("@/components/builder/SkillsForm"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const OptionalForm = dynamic(() => import("@/components/builder/OptionalForm"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const FinalizeStep = dynamic(() => import("@/components/builder/FinalizeStep"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const AtsMatchStep = dynamic(() => import("@/components/builder/AtsMatchStep"), {
  ssr: false, loading: () => <FormSkeleton />,
});
const LivePreview = dynamic(() => import("@/components/builder/LivePreview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-slate-100 rounded-xl" style={{ minHeight: 400 }}>
      <div className="w-8 h-8 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
    </div>
  ),
});

export default function BuilderPage() {
  const { resumeData, databaseId } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);

  const {
    stepIdx,
    setStepIdx,
    zoom,
    setZoom,
    goNext,
    goPrev,
    isStepValid,
    pct,
    cycleTemplate,
    templatesList,
    scaledW,
    scaledH,
    A4_W,
  } = useBuilderNavigation();

  const {
    isDownloading,
    showSuccessModal,
    setShowSuccessModal,
    feedbackRating,
    feedbackSubmitted,
    submitFeedback,
    handleDownloadPdf,
  } = usePdfDownload({
    printRef,
    onAutoDownloadJump: () => setStepIdx(STEPS.length - 1),
  });

  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  const handleExit = useCallback(() => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      const payload: Record<string, unknown> = { ...resumeData };
      if (databaseId) payload.id = databaseId;

      // Save in background without blocking navigation
      fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(e => console.error("Save on exit failed", e));
    }
  }, [resumeData, databaseId]);

  const accentColor = resumeData.accentColor ?? "#0d9488";

  const renderForm = () => {
    switch (STEPS[stepIdx].id) {
      case "personal":
        return <PersonalInfoForm />;
      case "summary":
        return <SummaryForm />;
      case "experience":
        return (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <ExperienceForm />
          </div>
        );
      case "education":
        return <EducationForm />;
      case "skills":
        return <SkillsForm />;
      case "optional":
        return <OptionalForm />;
      case "ats-match":
        return <AtsMatchStep />;
      case "finalize":
        return <FinalizeStep onDownload={handleDownloadPdf} isDownloading={isDownloading} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]" style={{ fontFamily: "Inter, Arial, system-ui, sans-serif" }}>
      <Suspense fallback={null}>
        <DataLoader />
      </Suspense>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            onClick={handleExit}
            prefetch={true}
            className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" /> Exit
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-extrabold tracking-tight sm:text-lg text-slate-900">Resume Builder</h1>
            <p className="text-xs text-slate-400 font-medium">Step {stepIdx + 1} of {STEPS.length} • My Resume</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <AutoSaver />
          </div>
        </div>
      </header>

      {/* ── STEPPER ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <div className="relative pb-2 overflow-x-auto scrollbar-hide">
            <ol className="flex w-full items-center justify-between min-w-[600px] lg:min-w-0 px-1">
              {STEPS.map((step, idx) => {
                const done = idx < stepIdx && isStepValid(idx);
                const active = idx === stepIdx;
                return (
                  <li key={step.id} className="relative flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                      <button
                        onClick={() => done && setStepIdx(idx)}
                        className={`relative grid h-8 w-8 lg:h-9 lg:w-9 2xl:h-11 2xl:w-11 place-items-center rounded-full text-xs 2xl:text-base font-bold transition-all
                          ${active ? "bg-[#0b132b] text-white shadow-md cursor-default" :
                            done ? "bg-emerald-500 text-white shadow-sm cursor-pointer hover:bg-emerald-600" :
                              "border-2 border-slate-100 bg-white text-slate-700 cursor-default"}`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5" /> : (idx + 1)}
                        {active && (
                          <div className="absolute -bottom-1 2xl:-bottom-1.5 left-1/2 h-2 w-2 2xl:h-3 2xl:w-3 -translate-x-1/2 rotate-45 bg-[#0b132b] rounded-sm" />
                        )}
                      </button>

                      <div className="hidden lg:block">
                        <p className={`text-xs 2xl:text-sm font-bold ${active ? "text-[#0b132b]" : "text-slate-600"}`}>
                          {step.title}
                        </p>
                        <p className="hidden 2xl:block text-[11px] font-medium text-slate-400">{step.subtitle}</p>
                      </div>
                    </div>

                    {idx < STEPS.length - 1 && (
                      <div className="mx-1.5 lg:mx-2 2xl:mx-4 flex-1 flex items-center gap-1 2xl:gap-1.5 min-w-[20px] lg:min-w-[24px] 2xl:min-w-[50px]">
                        <div className="h-px w-full bg-slate-200" />
                        <div className="h-1 w-1 rounded-full bg-slate-200 shrink-0" />
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
            <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
            Click on any completed step to edit or review
          </p>
        </div>
      </section>

      {/* ── MOBILE TABS ── */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white sticky top-[68px] z-30">
        <button
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${!showPreviewOnMobile ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
          onClick={() => setShowPreviewOnMobile(false)}
        >
          Edit Form
        </button>
        <button
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${showPreviewOnMobile ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
          onClick={() => setShowPreviewOnMobile(true)}
        >
          Live Preview
        </button>
      </div>

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 pb-32">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left column – Form */}
          <div className={`flex-col gap-6 ${showPreviewOnMobile ? "hidden lg:flex" : "flex"}`}>
            {renderForm()}

            {/* Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex-1">
                {stepIdx > 0 && (
                  <button onClick={goPrev} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 sm:px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                {stepIdx < STEPS.length - 1 && (
                  <button onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-xl bg-transparent px-3 sm:px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 transition active:scale-[0.98]">
                    {stepIdx >= 5 ? "Skip All" : "Skip for now"}
                  </button>
                )}
                {stepIdx < STEPS.length - 1 && (
                  <button onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 sm:px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-black active:scale-[0.98]">
                    {stepIdx === 6 ? "Next: Finalize & Download" : `Next: ${STEPS[stepIdx + 1].title}`} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right column – Live Preview */}
          <div className={`lg:sticky lg:top-24 lg:h-fit ${showPreviewOnMobile ? "block" : "absolute opacity-0 pointer-events-none -z-50 lg:static lg:opacity-100 lg:pointer-events-auto lg:z-auto lg:block"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              {/* Title + template pagination */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Live Preview</h2>
                <div className="flex items-center gap-1">
                  <button onClick={() => cycleTemplate(-1)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100" aria-label="Previous template">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-1 text-xs font-semibold text-slate-500">
                    {templatesList.indexOf(resumeData.templateId) + 1} / {templatesList.length}
                  </span>
                  <button onClick={() => cycleTemplate(1)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100" aria-label="Next template">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-600">Resume Completion</span>
                <span className="font-bold text-emerald-500">{pct}%</span>
              </div>
              <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>

              {/* Actions */}
              <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-black active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isDownloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                  {isDownloading ? "Downloading..." : "Download"}
                </button>
              </div>

              {/* Zoom bar */}
              <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-1.5">
                <div className="flex items-center gap-1">
                  <button onClick={() => setZoom(z => Math.max(30, z - 10))} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white" aria-label="Zoom out">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <select
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                    aria-label="Zoom level"
                  >
                    {ZOOM_OPTIONS.map(v => <option key={v} value={v}>{v}%</option>)}
                  </select>
                  <button onClick={() => setZoom(z => Math.min(100, z + 10))} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white" aria-label="Zoom in">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setZoom(60)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white" aria-label="Reset zoom">
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-xs font-medium text-slate-400">8.5″ × 11″</span>
              </div>

              {/* Canvas */}
              <div className="overflow-auto rounded-xl bg-slate-100/70 p-4" style={{ maxHeight: "520px" }}>
                <div
                  className="mx-auto bg-white shadow-md ring-1 ring-slate-200"
                  style={{ width: `${scaledW}px`, minHeight: `${scaledH}px` }}
                >
                  <div style={{ width: `${A4_W}px`, transformOrigin: "top left", transform: `scale(${zoom / 100})` }}>
                    <div ref={printRef}>
                      <LivePreview accentColor={accentColor} />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                Use arrows to browse templates • Download to save as PDF
              </p>
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Smart Resume Maker. All rights reserved.
      </footer>

      {/* ── Success + Feedback Modal ── */}
      <DownloadSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onDownloadAgain={handleDownloadPdf}
        isDownloading={isDownloading}
        feedbackRating={feedbackRating}
        feedbackSubmitted={feedbackSubmitted}
        onFeedbackSubmit={submitFeedback}
      />
    </div>
  );
}
