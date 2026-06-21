"use client";

import { useRef, useState } from "react";
import { Download, CheckCircle2, FileText, AlertCircle, Star, Cloud } from "lucide-react";
import { useSession } from "next-auth/react";
import { useResumeStore } from "@/store/useResumeStore";
import { useReactToPrint } from "react-to-print";
import LivePreview from "@/components/builder/LivePreview";

const A4_W = 816;

export default function FinalizeStep() {
  const { resumeData } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSaveToCloud = async () => {
    if (!session) {
      setSaveMessage("Please log in to save your resume to the cloud.");
      return;
    }
    
    setIsSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });
      if (res.ok) {
        setSaveMessage("Resume successfully saved to cloud!");
      } else {
        setSaveMessage("Failed to save resume. Please try again.");
      }
    } catch (e) {
      setSaveMessage("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: resumeData.personalInfo.fullName
      ? `${resumeData.personalInfo.fullName}_Resume`
      : "My_Resume",
  });

  /* Completion checklist */
  const checks = [
    { label: "Name added",          done: !!resumeData.personalInfo.fullName   },
    { label: "Email added",         done: !!resumeData.personalInfo.email      },
    { label: "Phone added",         done: !!resumeData.personalInfo.phone      },
    { label: "Professional title",  done: !!resumeData.personalInfo.jobTitle   },
    { label: "Summary written",     done: !!resumeData.summary                 },
    { label: "1+ experience entry", done: resumeData.experience.length > 0     },
    { label: "1+ education entry",  done: resumeData.education.length > 0      },
    { label: "1+ skill added",      done: resumeData.skills.length > 0         },
  ];

  const completedCount = checks.filter(c => c.done).length;
  const pct = Math.round((completedCount / checks.length) * 100);
  const isStrong = pct >= 75;

  return (
    <div className="flex flex-col gap-6">
      {/* Score card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className={`grid h-12 w-12 place-items-center rounded-xl ${isStrong ? "bg-emerald-50" : "bg-amber-50"}`}>
            {isStrong ? <Star className="h-6 w-6 text-emerald-500" /> : <AlertCircle className="h-6 w-6 text-amber-500" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Resume Review</h2>
            <p className="text-sm text-slate-400">Check your resume is complete before downloading</p>
          </div>
        </div>

        {/* Completion bar */}
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-600">Overall Completion</span>
          <span className={`font-bold ${isStrong ? "text-emerald-500" : "text-amber-500"}`}>{pct}%</span>
        </div>
        <div className="mb-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isStrong ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gradient-to-r from-amber-400 to-amber-300"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checks.map(c => (
            <div key={c.label} className={`flex items-center gap-2.5 rounded-lg border p-3 text-sm font-medium transition
              ${c.done ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-amber-100 bg-amber-50 text-amber-700"}`}>
              {c.done
                ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                : <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />}
              {c.label}
            </div>
          ))}
        </div>

        {!isStrong && (
          <p className="mt-4 text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3">
            💡 Complete more sections to reach 75%+ for a stronger resume that stands out to recruiters.
          </p>
        )}
      </div>

      {/* Download card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">Download Your Resume</h3>
        <p className="text-sm text-slate-400 mb-5">Save as a PDF — ready to send to employers!</p>

        {/* Hidden printable resume */}
        <div className="hidden print:block">
          <div ref={printRef}>
            <LivePreview accentColor={resumeData.accentColor} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handlePrint()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-black"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
          <button 
            onClick={handleSaveToCloud}
            disabled={isSaving}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-70"
          >
            <Cloud className="h-4 w-4" /> {isSaving ? "Saving..." : "Save to Cloud"}
          </button>
        </div>

        {saveMessage && (
          <p className={`mt-4 text-xs font-bold text-center ${saveMessage.includes("success") ? "text-emerald-600" : "text-amber-600"}`}>
            {saveMessage}
          </p>
        )}

        <p className="mt-4 text-xs text-slate-400 text-center">
          Your resume is automatically saved in this browser session.
        </p>
      </div>

      {/* ATS tips */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-3">
          <Star className="h-4 w-4" /> ATS Pro Tips
        </h3>
        <ul className="space-y-2 text-xs text-emerald-700 font-medium">
          <li className="flex gap-2"><span>•</span> Use standard section headings like "Work Experience" and "Education"</li>
          <li className="flex gap-2"><span>•</span> Avoid tables, columns, and text boxes — ATS scanners may miss them</li>
          <li className="flex gap-2"><span>•</span> Include keywords from the job description naturally in your text</li>
          <li className="flex gap-2"><span>•</span> Submit as PDF unless the employer specifically requests .docx</li>
          <li className="flex gap-2"><span>•</span> Keep your resume to 1–2 pages maximum</li>
        </ul>
      </div>
    </div>
  );
}
