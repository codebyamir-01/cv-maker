"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";

export function DataLoader() {
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

export default DataLoader;
