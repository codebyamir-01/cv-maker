"use client";

import { useState, useRef, useEffect, memo, useCallback, lazy, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, ChevronLeft, ChevronRight,
  Download, CheckCircle2, FileText, ZoomIn, ZoomOut,
  RotateCcw, Sparkles, Lightbulb, Eye, Loader2
} from "lucide-react";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import { useResumeStore } from "@/store/useResumeStore";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";

/* ─── Lazy-load ALL heavy form components ─────────────────────────
   This is the main mobile win. Without this, all 6 form components
   and all 6 template files were bundled into ONE chunk (~600KB+).
   Now each component is a separate chunk loaded on demand.
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
// LivePreview is the heaviest: it pulls in template CSS + fonts
const LivePreview = dynamic(() => import("@/components/builder/LivePreview"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-slate-100 rounded-xl" style={{ minHeight: 400 }}>
      <div className="w-8 h-8 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
    </div>
  ),
});

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

/* ─── Summary inline form (kept here — no separate import needed) ── */
const SummaryForm = memo(function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    "Results-driven professional with 5+ years of experience delivering high-quality solutions and driving business growth.",
    "Detail-oriented specialist with a proven track record of managing complex projects and exceeding performance metrics.",
    "Innovative thinker with strong leadership skills, dedicated to optimizing workflows and fostering team collaboration."
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Professional Summary</h2>
        <button 
          type="button" 
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full font-bold tracking-wide transition-colors flex items-center gap-1.5 shadow-sm border border-blue-200"
        >
          <Sparkles className="w-3.5 h-3.5" /> SMART SUGGESTIONS
        </button>
      </div>
      
      {showSuggestions && (
        <div className="mb-4 p-4 bg-slate-50 border border-blue-100 rounded-xl">
          <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Click a template to use it</p>
          <div className="space-y-2">
            {suggestions.map((text, i) => (
              <div 
                key={i}
                onClick={() => {
                  updateSummary(text);
                  setShowSuggestions(false);
                }}
                className="text-sm text-slate-700 bg-white border border-slate-200 p-3 rounded-lg hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      )}

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
});

/* ─── DataLoader and AutoSaver ───────────────────────────────────── */
function DataLoader() {
  const searchParams = useSearchParams();
  const { updateTemplateId, setDatabaseId, setResumeData, databaseId } = useResumeStore();
  
  useEffect(() => {
    const t = searchParams.get("t");
    if (t) updateTemplateId(t);
  }, [searchParams, updateTemplateId]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id && id !== databaseId) {
      setDatabaseId(id);
      // Fetch directly by ID — no need to load all resumes
      fetch(`/api/resumes/${id}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          const resume = data.resume;
          if (resume) {
            setResumeData({
              personalInfo: resume.personalInfo || {},
              summary: resume.summary || "",
              experience: resume.experience || [],
              education: resume.education || [],
              skills: resume.skills || [],
              optionalSections: {
                projects: resume.projects || [],
                certifications: resume.certifications || [],
                languages: resume.languages || [],
                awards: resume.customSections?.awards || [],
                volunteer: resume.customSections?.volunteer || [],
                publications: resume.customSections?.publications || [],
              },
              templateId: resume.templateId || "ats-classic",
              accentColor: resume.accentColor || "#0d9488"
            });
          }
        })
        .catch(() => {
          // Silently fall back to locally stored data
        });
    }
  }, [searchParams, setDatabaseId, setResumeData, databaseId]);

  return null;
}

function AutoSaver() {
  const { resumeData, databaseId } = useResumeStore();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pendingPayload, setPendingPayload] = useState<string | null>(null);
  const prevDataRef = useRef(JSON.stringify(resumeData));

  const doSave = useCallback(async (payload: any) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!databaseId) {
        const result = await res.json();
        if (result.resume?.id) {
          useResumeStore.getState().setDatabaseId(result.resume.id);
          window.history.replaceState(null, "", `/builder?id=${result.resume.id}`);
        }
      }
      setSaveStatus("saved");
      setPendingPayload(null);
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  }, [databaseId]);

  useEffect(() => {
    const currentDataStr = JSON.stringify(resumeData);
    if (currentDataStr === prevDataRef.current) return;
    prevDataRef.current = currentDataStr;
    const payload: any = { ...resumeData };
    if (databaseId) payload.id = databaseId;
    setPendingPayload(JSON.stringify(payload));
    const handler = setTimeout(() => doSave(payload), 2000);
    return () => clearTimeout(handler);
  }, [resumeData, databaseId, doSave]);

  if (saveStatus === "error") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
        <span>Save failed</span>
        <button
          onClick={() => { if (pendingPayload) doSave(JSON.parse(pendingPayload)); }}
          className="underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }
  if (saveStatus === "saving") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
        <Loader2 className="h-3 w-3 animate-spin text-emerald-500" />
        Saving...
      </div>
    );
  }
  if (saveStatus === "saved") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
        Saved
      </div>
    );
  }
  return null;
}


/* ─── Page ───────────────────────────────────────────────────────── */
export default function BuilderPage() {
  const { resumeData, updateTemplateId, updateAccentColor, databaseId } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const handleExit = () => {
    if (resumeData && Object.keys(resumeData).length > 0) {
      const payload: any = { ...resumeData };
      if (databaseId) payload.id = databaseId;
      
      // Save in background without blocking navigation
      fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(e => console.error("Save on exit failed", e));
    }
  };

  const [stepIdx, setStepIdx] = useState(0);
  const [zoom, setZoom] = useState(60);
  // On mobile, preview panel is hidden by default to boost FCP/LCP
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    
    // Restore step
    const savedStep = sessionStorage.getItem("builderCurrentStep");
    if (savedStep !== null) {
      const parsed = parseInt(savedStep, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < STEPS.length) {
        setStepIdx(parsed);
      }
    }
    
    const w = window.innerWidth;
    const mobile = w < 1024;
    setIsMobile(mobile);
    if (w < 640) setZoom(40);
    else if (w < 1024) setZoom(50);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      sessionStorage.setItem("builderCurrentStep", stepIdx.toString());
    }
  }, [stepIdx, hasMounted]);


  const accentColor = resumeData.accentColor ?? "#0d9488";

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    if (!printRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = printRef.current;
      await new Promise(r => setTimeout(r, 500));
      
      const domtoimage = (await import("dom-to-image-more")).default;
      const jsPDF = (await import("jspdf")).default;
      
      const scale = 2;
      const imgData = await domtoimage.toJpeg(element, {
        quality: 1.0,
        bgcolor: "#ffffff",
        width: element.clientWidth * scale,
        height: element.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${element.clientWidth}px`,
          height: `${element.clientHeight}px`
        }
      });
      
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (element.clientHeight * pdfWidth) / element.clientWidth;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const filename = resumeData.personalInfo?.fullName 
          ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
          : 'Resume.pdf';
          
      pdf.save(filename);
    } catch (error: any) {
      console.error("PDF generation error:", error);
      alert(`Download failed: ${error.message || 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const templatesList = [
    "monochrome", "ats-classic", "aether", "modern", "developer", "executive",
    "ats-minimal", "corporate", "creative-clean", "academic", "two-column",
    "graduate", "finance", "marketing", "simple-bw", "startup-leader", "elegant-serif"
  ];
  const cycleTemplate = useCallback((dir: 1 | -1) => {
    const i = templatesList.indexOf(resumeData.templateId);
    let n = i + dir;
    if (n >= templatesList.length) n = 0;
    if (n < 0) n = templatesList.length - 1;
    updateTemplateId(templatesList[n]);
  }, [resumeData.templateId, updateTemplateId]);

  const scaledW = Math.round(A4_W * zoom / 100);
  const scaledH = Math.round(1056 * zoom / 100);

  const goNext = useCallback(() => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(s => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stepIdx]);
  const goPrev = useCallback(() => {
    if (stepIdx > 0) {
      setStepIdx(s => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stepIdx]);

  const isStepValid = useCallback((index: number) => {
    if (!resumeData) return false;
    switch(index) {
      case 0: return Object.values(resumeData.personalInfo || {}).some(v => v && String(v).trim() !== "");
      case 1: return !!resumeData.summary?.trim();
      case 2: return resumeData.experience && resumeData.experience.length > 0;
      case 3: return resumeData.education && resumeData.education.length > 0;
      case 4: return resumeData.skills && resumeData.skills.length > 0;
      case 5: {
        const opt = resumeData.optionalSections as any;
        if (!opt) return false;
        return (opt.projects?.length > 0 || opt.certifications?.length > 0 || opt.custom?.length > 0 || opt.languages?.length > 0);
      }
      case 6: return true; // Finalize is always "valid" if they reach it
      default: return false;
    }
  }, [resumeData]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

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

  const validStepsCount = STEPS.filter((_, idx) => isStepValid(idx)).length;
  const pct = Math.round((validStepsCount / STEPS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]" style={{ fontFamily: "Inter, Arial, system-ui, sans-serif" }}>
      <Suspense fallback={null}>
        <DataLoader />
      </Suspense>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/" onClick={handleExit} prefetch={true} className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Exit
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-extrabold tracking-tight sm:text-lg text-slate-900">Resume Builder</h1>
            <p className="text-xs text-slate-400 font-medium">Step {stepIdx + 1} of {STEPS.length} • My Resume</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {/* Preview toggle moved to tabs below stepper */}
            <AutoSaver />
          </div>
        </div>
      </header>

      {/* ── STEPPER ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <div className="relative pb-2 overflow-x-auto scrollbar-hide">
            <ol className="flex w-full items-center justify-between min-w-[600px] lg:min-w-0">
              {STEPS.map((step, idx) => {
                const done   = idx < stepIdx && isStepValid(idx);
                const active = idx === stepIdx;
                return (
                  <li key={step.id} className="relative flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                      <button
                        onClick={() => done && setStepIdx(idx)}
                        className={`relative grid h-8 w-8 lg:h-11 lg:w-11 place-items-center rounded-full text-xs lg:text-base font-bold transition-all
                          ${active ? "bg-[#0b132b] text-white shadow-md cursor-default" :
                            done   ? "bg-emerald-500 text-white shadow-sm cursor-pointer hover:bg-emerald-600" :
                                     "border-2 border-slate-100 bg-white text-slate-700 cursor-default"}`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4 lg:h-5 lg:w-5" /> : (idx + 1)}
                        {active && (
                          <div className="absolute -bottom-1 lg:-bottom-1.5 left-1/2 h-2 w-2 lg:h-3 lg:w-3 -translate-x-1/2 rotate-45 bg-[#0b132b] rounded-sm" />
                        )}
                      </button>

                      <div className="hidden lg:flex flex-col justify-center">
                        <p className={`text-sm font-bold ${active ? "text-[#0b132b]" : "text-slate-600"}`}>
                          {step.title}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">{step.subtitle}</p>
                      </div>
                    </div>

                    {idx < STEPS.length - 1 && (
                      <div className="mx-1.5 lg:mx-4 flex-1 flex items-center gap-1 lg:gap-1.5">
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
      {isMobile && (
        <div className="flex border-b border-slate-200 bg-white sticky top-[68px] z-30">
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
      )}

      {/* ── MAIN ── */}
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 pb-32">
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Left column – Form */}
          <div className={`flex-col gap-6 ${isMobile && showPreviewOnMobile ? "hidden" : "flex"}`}>
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
                    {stepIdx === 5 ? "Skip All" : "Skip for now"}
                  </button>
                )}
                {stepIdx < STEPS.length - 1 && (
                  <button onClick={goNext} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 sm:px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-black active:scale-[0.98]">
                    {stepIdx === 5 ? "Next: Finalize & Download" : `Next: ${STEPS[stepIdx + 1].title}`} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right column – Live Preview
              On mobile: hidden by default, shown when user taps "Preview"
              On desktop: always visible and sticky             */}
          <div className={`lg:sticky lg:top-24 lg:h-fit ${isMobile && !showPreviewOnMobile ? "hidden" : ""}`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              {/* Title + template pagination */}
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight text-slate-900">Live Preview</h2>
                <div className="flex items-center gap-1">
                  <button onClick={() => cycleTemplate(-1)} className="grid h-7 w-7 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="px-1 text-xs font-semibold text-slate-500">
                    {templatesList.indexOf(resumeData.templateId) + 1} / {templatesList.length}
                  </span>
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
                      {hasMounted && (!isMobile || showPreviewOnMobile) && (
                        <LivePreview accentColor={accentColor} />
                      )}
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
    </div>
  );
}
