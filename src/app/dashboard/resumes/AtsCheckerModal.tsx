"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, CheckCircle2, AlertCircle, AlertTriangle, X, FileX, Info, Edit2 } from "lucide-react";
import { calculateATSScore } from "@/lib/atsScoring";
import { ResumeData } from "@/store/useResumeStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AtsCheckerModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string | null;
}

export default function AtsCheckerModal({ isOpen, onClose, resumeId }: AtsCheckerModalProps) {
  const router = useRouter();

  const { data, error: fetchError, isLoading } = useSWR(
    isOpen && resumeId ? `/api/resumes/${resumeId}` : null,
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const error = fetchError
    ? "Failed to load resume for ATS check."
    : !data?.resume && !isLoading && isOpen && data
    ? "Resume data is missing."
    : null;

  const loading = isLoading;

  let score = 0;
  let missingFields: string[] = [];
  let completionIssues: string[] = [];
  let formattingTips: string[] = [];
  let sectionQuality: string[] = [];
  let resumeTitle = "";

  if (data?.resume) {
    resumeTitle = data.resume.title || "Your Resume";

    const normalizedData: ResumeData = {
      personalInfo: data.resume.personalInfo || {
        firstName: "", lastName: "", fullName: "", jobTitle: "", email: "", phone: "",
        city: "", country: "", location: "", linkedIn: "", github: "", portfolio: ""
      },
      summary: data.resume.summary || "",
      experience: data.resume.experience || [],
      education: data.resume.education || [],
      skills: data.resume.skills || [],
      optionalSections: {
        projects: data.resume.projects || [],
        certifications: data.resume.certifications || [],
        languages: data.resume.languages || [],
        awards: data.resume.customSections?.awards || [],
        volunteer: data.resume.customSections?.volunteer || [],
        publications: data.resume.customSections?.publications || [],
      },
      templateId: data.resume.templateId,
      accentColor: "#000000"
    };

    const result = calculateATSScore(normalizedData);
    score = result.score;
    missingFields = result.missingFields || [];
    completionIssues = result.completionIssues || [];
    formattingTips = result.formattingTips || [];
    sectionQuality = result.sectionQuality || [];
  }

  const isExcellent = score >= 85;
  const isGood = score >= 70 && score < 85;

  const scoreColor = isExcellent ? "text-emerald-500" : isGood ? "text-amber-500" : "text-rose-500";
  const bgColor = isExcellent ? "bg-emerald-50" : isGood ? "bg-amber-50" : "bg-rose-50";
  const strokeColor = isExcellent ? "stroke-emerald-500" : isGood ? "stroke-amber-500" : "stroke-rose-500";

  const statusMessage = isExcellent
    ? "Excellent! Your resume is highly ATS-friendly."
    : isGood
    ? "Good start, but there's room for improvement."
    : "Needs Work. Critical fields are missing.";

  const hasIssues = missingFields.length > 0 || completionIssues.length > 0;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Panel */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

        {/* ── Loading ── */}
        {loading && (
          <div className="p-16 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-500 font-medium text-lg animate-pulse">Scanning your resume…</p>
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="p-10 text-center space-y-4">
            <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">Oops!</h3>
            <p className="text-slate-600">{error}</p>
            <Button onClick={onClose} className="mt-4 rounded-xl">Close</Button>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && !error && (
          <>
            {/* Header / Score */}
            <div className={`p-8 pb-10 flex flex-col items-center text-center relative shrink-0 ${bgColor}`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" /> ATS Results for {resumeTitle}
              </h2>

              {/* Circular Score */}
              <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="stroke-white/60"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={strokeColor}
                    strokeWidth="3"
                    strokeDasharray={`${score}, 100`}
                    fill="none"
                    strokeLinecap="round"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${scoreColor}`}>{score}</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{statusMessage}</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                A score above 80% is recommended for passing most Applicant Tracking Systems.
              </p>
            </div>

            {/* Feedback Body — native scroll */}
            <div className="p-8 bg-white flex-1 overflow-y-auto">
              <div className="space-y-8">

                {/* Missing Fields */}
                {missingFields.length > 0 && (
                  <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FileX className="w-5 h-5 text-rose-500" /> Missing Critical Fields
                    </h4>
                    <ul className="space-y-2">
                      {missingFields.map((field, idx) => (
                        <li key={idx} className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 text-rose-700 text-sm flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> Missing {field}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Completion Issues */}
                {completionIssues.length > 0 && (
                  <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" /> Completion Issues
                    </h4>
                    <ul className="space-y-2">
                      {completionIssues.map((issue, idx) => (
                        <li key={idx} className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-amber-800 text-sm flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> {issue}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Section Quality */}
                {sectionQuality.length > 0 && (
                  <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Section Quality
                    </h4>
                    <ul className="space-y-2">
                      {sectionQuality.map((quality, idx) => (
                        <li key={idx} className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 text-emerald-800 text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> {quality}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Formatting Tips */}
                {formattingTips.length > 0 && (
                  <section>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" /> Formatting Tips
                    </h4>
                    <ul className="space-y-2">
                      {formattingTips.map((tip, idx) => (
                        <li key={idx} className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-blue-800 text-sm flex items-start gap-2">
                          <Info className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> {tip}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {!hasIssues && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-emerald-900 mb-1">Perfect Score!</h4>
                    <p className="text-emerald-700 text-sm">
                      Your resume has all the necessary fields and formatting. It's fully optimized and ready to go!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between gap-3 rounded-b-3xl">
              <Button variant="ghost" onClick={onClose} className="text-slate-500 font-medium hover:bg-slate-200/50 rounded-xl px-6">
                Maybe Later
              </Button>
              <Button
                onClick={() => router.push(`/builder?id=${resumeId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 shadow-md hover:shadow-lg transition-all h-11"
              >
                <Edit2 className="w-4 h-4 mr-2" /> Improve Resume
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
