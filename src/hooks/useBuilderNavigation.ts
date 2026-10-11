"use client";

import { useState, useEffect, useCallback } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export const STEPS = [
  { id: "personal", title: "Contact", subtitle: "Personal information" },
  { id: "summary", title: "Summary", subtitle: "Professional summary" },
  { id: "experience", title: "Experience", subtitle: "Work history" },
  { id: "education", title: "Education", subtitle: "Academic background" },
  { id: "skills", title: "Skills", subtitle: "Your abilities" },
  { id: "optional", title: "Optional", subtitle: "Additional sections" },
  { id: "ats-match", title: "ATS Match", subtitle: "Score your resume" },
  { id: "finalize", title: "Finalize", subtitle: "Review & download" },
] as const;

export const ZOOM_OPTIONS = [30, 50, 60, 75, 100];
export const A4_W = 816;

export const TEMPLATES_LIST = [
  "monochrome", "ats-classic", "aether", "modern", "developer", "executive",
  "ats-minimal", "corporate", "creative-clean", "academic", "two-column",
  "graduate", "finance", "marketing", "simple-bw", "startup-leader", "elegant-serif"
];

export function useBuilderNavigation() {
  const { resumeData, updateTemplateId } = useResumeStore();

  const [stepIdx, setStepIdx] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const savedStep = sessionStorage.getItem("builderCurrentStep");
    if (savedStep !== null) {
      const parsed = parseInt(savedStep, 10);
      if (!isNaN(parsed) && parsed >= 0 && parsed < STEPS.length) {
        return parsed;
      }
    }
    return 0;
  });

  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window === "undefined") return 60;
    const w = window.innerWidth;
    if (w < 640) return 40;
    if (w < 1024) return 50;
    return 60;
  });

  useEffect(() => {
    sessionStorage.setItem("builderCurrentStep", stepIdx.toString());
  }, [stepIdx]);

  const cycleTemplate = useCallback((dir: 1 | -1) => {
    const i = TEMPLATES_LIST.indexOf(resumeData.templateId);
    let n = i + dir;
    if (n >= TEMPLATES_LIST.length) n = 0;
    if (n < 0) n = TEMPLATES_LIST.length - 1;
    updateTemplateId(TEMPLATES_LIST[n]);
  }, [resumeData.templateId, updateTemplateId]);

  const goNext = useCallback(() => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stepIdx]);

  const goPrev = useCallback(() => {
    if (stepIdx > 0) {
      setStepIdx((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [stepIdx]);

  const isStepValid = useCallback((index: number) => {
    if (!resumeData) return false;
    switch (index) {
      case 0: return Object.values(resumeData.personalInfo || {}).some(v => v && String(v).trim() !== "");
      case 1: return !!resumeData.summary?.trim();
      case 2: return Boolean(resumeData.experience && resumeData.experience.length > 0);
      case 3: return Boolean(resumeData.education && resumeData.education.length > 0);
      case 4: return Boolean(resumeData.skills && resumeData.skills.length > 0);
      case 5: {
        const opt = resumeData.optionalSections;
        if (!opt) return false;
        return (
          (opt.projects?.length ?? 0) > 0 ||
          (opt.certifications?.length ?? 0) > 0 ||
          (opt.languages?.length ?? 0) > 0 ||
          (opt.awards?.length ?? 0) > 0 ||
          (opt.volunteer?.length ?? 0) > 0 ||
          (opt.publications?.length ?? 0) > 0
        );
      }
      case 6: return true; // ATS Match is optional
      case 7: return true; // Finalize is always "valid" if they reach it
      default: return false;
    }
  }, [resumeData]);

  const validStepsCount = STEPS.filter((_, idx) => isStepValid(idx)).length;
  const pct = Math.round((validStepsCount / STEPS.length) * 100);

  const scaledW = Math.round((A4_W * zoom) / 100);
  const scaledH = Math.round((1056 * zoom) / 100);

  return {
    stepIdx,
    setStepIdx,
    zoom,
    setZoom,
    goNext,
    goPrev,
    isStepValid,
    validStepsCount,
    pct,
    cycleTemplate,
    templatesList: TEMPLATES_LIST,
    scaledW,
    scaledH,
    A4_W,
  };
}

export default useBuilderNavigation;
