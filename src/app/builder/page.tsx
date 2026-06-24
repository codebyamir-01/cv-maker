"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Download, CheckCircle2, FileText, ZoomIn, ZoomOut,
  RotateCcw, Sparkles, Lightbulb
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import ExperienceForm   from "@/components/builder/ExperienceForm";
import EducationForm    from "@/components/builder/EducationForm";
import SkillsForm       from "@/components/builder/SkillsForm";
import OptionalForm     from "@/components/builder/OptionalForm";
import FinalizeStep     from "@/components/builder/FinalizeStep";
import LivePreview      from "@/components/builder/LivePreview";
import { useResumeStore } from "@/store/useResumeStore";
import { useReactToPrint } from "react-to-print";

/* ─── Steps ──────────────────────────────────────────────────────── */
const STEPS = [
  { id: "personal",   title: "Contact",    subtitle: "Personal information"    },
  { id: "summary",    title: "Summary",    subtitle: "Professional summary"    },
  { id: "experience", title: "Experience", subtitle: "Work history"            },
  { id: "education",  title: "Education",  subtitle: "Academic background"     },
  { id: "skills",     title: "Skills",     subtitle: "Your abilities"          },
  { id: "optional",   title: "Optional",   subtitle: "Additional sections"     },
  { id: "ats",        title: "Finalize",   subtitle: "Review & download"       },
];

/* ─── Colour palette ─────────────────────────────────────────────── */
const COLORS = [
  { label: "blue",    hex: "#3b82f6" },
  { label: "indigo",  hex: "#4f46e5" },
  { label: "teal",    hex: "#0d9488" },
  { label: "black",   hex: "#1e293b" },
  { label: "slate",   hex: "#64748b" },
  { label: "red",     hex: "#b91c1c" },
  { label: "green",   hex: "#16a34a" },
  { label: "purple",  hex: "#7c3aed" },
  { label: "orange",  hex: "#f97316" },
];

const ZOOM_OPTIONS = [30, 50, 60, 75, 100];
const A4_W = 816;

/* ─── Summary inline form ────────────────────────────────────────── */
function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-900">Professional Summary</h2>
      <p className="mt-0.5 mb-4 text-sm text-slate-400">Write 2–4 sentences that highlight your expertise and value.</p>
      <textarea
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
        rows={6}
        placeholder="e.g. Results-driven Senior Developer with 5+ years experience building scalable web apps..."
        value={resumeData.summary}
        onChange={e => updateSummary(e.target.value)}
      />
    </div>
  );
}

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TemplateLoader() {
  const searchParams = useSearchParams();
  const { updateTemplateId } = useResumeStore();

  useEffect(() => {
    const t = searchParams.get("t");
    if (t) updateTemplateId(t);
  }, [searchParams, updateTemplateId]);

  return null;
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function BuilderPage() {
  const { resumeData, updateTemplateId, updateAccentColor } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);

  const [stepIdx, setStepIdx] = useState(0);
  const [zoom, setZoom] = useState(60);

  const accentColor = resumeData.accentColor ?? "#0d9488";

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName}_Resume`
      : "Resume",
  });

  const templatesList = ["ats-classic", "modern", "developer", "monochrome", "aether", "executive"];
  const cycleTemplate = (dir: 1 | -1) => {
    const i = templatesList.indexOf(resumeData.templateId);
    let n = i + dir;
    if (n >= templatesList.length) n = 0;
    if (n < 0) n = templatesList.length - 1;
    updateTemplateId(templatesList[n]);
  };

  const scaledW = Math.round(A4_W * zoom / 100);
  const scaledH = Math.round(1056 * zoom / 100);

  const goNext = () => { if (stepIdx < STEPS.length - 1) { setStepIdx(s => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };
  const goPrev = () => { if (stepIdx > 0) { setStepIdx(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); } };

  const renderForm = () => {
    switch (STEPS[stepIdx].id) {
      case "personal":   return <PersonalInfoForm />;
      case "summary":    return <SummaryForm />;
      case "experience": return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ExperienceForm />
        </div>
      );
      case "education":  return <EducationForm />;
      case "skills":     return <SkillsForm />;
      case "optional":   return <OptionalForm />;
      case "ats":        return <FinalizeStep />;
      default:           return null;
    }
  };

  const pct = Math.round(((stepIdx + 1) / STEPS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]" style={{ fontFamily: "Inter, Arial, system-ui, sans-serif" }}>
      <Suspense fallback={null}>
        <TemplateLoader />
      </Suspense>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Exit
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-extrabold tracking-tight sm:text-lg text-slate-900">Resume Builder</h1>
            <p className="text-xs text-slate-400 font-medium">Step {stepIdx + 1} of {STEPS.length} • My Resume</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Auto-saved
          </div>
        </div>
      </header>

      {/* ── STEPPER ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <div className="relative overflow-x-auto pb-2">
            <ol className="flex min-w-[760px] items-start justify-between gap-2">
              {STEPS.map((step, idx) => {
                const done   = idx < stepIdx;
                const active = idx === stepIdx;
                return (
                  <li key={step.id} className="relative flex flex-1 flex-col items-center">
                    {idx < STEPS.length - 1 && (
                      <span className="absolute left-1/2 top-5 h-px w-full bg-slate-200" aria-hidden />
                    )}
                    <button
                      onClick={() => done && setStepIdx(idx)}
                      className={`relative z-10 grid h-10 w-10 place-items-center rounded-full text-sm font-bold transition
                        ${done   ? "bg-emerald-500 text-white shadow-sm cursor-pointer hover:bg-emerald-600" :
                          active ? "bg-slate-900 text-white shadow-md ring-4 ring-slate-900/10 cursor-default" :
                                   "border border-slate-200 bg-white text-slate-400 cursor-default"}`}
                    >
                      {done ? <CheckCircle2 className="h-5 w-5" /> : (idx + 1)}
                    </button>
                    <p className={`mt-2 text-sm font-semibold ${done ? "text-emerald-600" : active ? "text-slate-900" : "text-slate-400"}`}>
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-center text-xs text-slate-400">{step.subtitle}</p>
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

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left column */}
          <div className="flex flex-col gap-6">
            {renderForm()}

            {/* Navigation */}
            <div className={`flex items-center pt-2 ${stepIdx === 0 ? "justify-end" : "justify-between"}`}>
              {stepIdx > 0 && (
                <button onClick={goPrev} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              {stepIdx < STEPS.length - 1 && (
                <button onClick={goNext} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-black">
                  Next: {STEPS[stepIdx + 1].title} <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right column – Live Preview */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              {/* Title + pagination */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Live Preview</h2>
                <div className="flex items-center gap-1">
                  <button onClick={() => cycleTemplate(-1)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-1 text-xs font-semibold text-slate-500">1 / 15</span>
                  <button onClick={() => cycleTemplate(1)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100">
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

              {/* Template + actions */}
              <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
                <div className="flex items-center gap-2">
                  <button onClick={() => handlePrint()} className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-black">
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Colors:</span>
                <div className="flex flex-wrap gap-1.5">
                  {COLORS.map(c => (
                    <button
                      key={c.label}
                      aria-label={c.label}
                      title={c.label}
                      onClick={() => updateAccentColor(c.hex)}
                      className="grid h-6 w-6 place-items-center rounded-full transition hover:scale-110"
                      style={{
                        backgroundColor: c.hex,
                        outline: accentColor === c.hex ? `2px solid ${c.hex}` : "none",
                        outlineOffset: "2px",
                      }}
                    >
                      {accentColor === c.hex && (
                        <svg className="h-3 w-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom bar */}
              <div className="mb-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-1.5">
                <div className="flex items-center gap-1">
                  <button onClick={() => setZoom(z => Math.max(30, z - 10))} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white">
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <select
                    value={zoom}
                    onChange={e => setZoom(Number(e.target.value))}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    {ZOOM_OPTIONS.map(v => <option key={v} value={v}>{v}%</option>)}
                  </select>
                  <button onClick={() => setZoom(z => Math.min(100, z + 10))} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white">
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setZoom(60)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-white">
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

      <Footer />
    </div>
  );
}
