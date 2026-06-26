"use client";

import { useRef, useState } from "react";
import { Download, CheckCircle2, AlertCircle, Star, Share2, FileDown } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import LivePreview from "@/components/builder/LivePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function FinalizeStep() {
  const { resumeData } = useResumeStore();
  const printRef = useRef<HTMLDivElement>(null);
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const [shareMessage, setShareMessage] = useState("");

  const handleDownloadPdf = async () => {
    if (isDownloading) return; // Prevent multiple clicks freezing the UI
    if (!printRef.current) return;
    
    setIsDownloading(true);
    setDownloadStatus("loading");
    setDownloadMessage("Preparing PDF...");
    
    try {
      const element = printRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      
      const filename = resumeData.personalInfo.fullName 
          ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
          : 'Resume.pdf'; // Fallback if name missing
          
      pdf.save(filename);
      
      setDownloadStatus("success");
      setDownloadMessage("PDF downloaded successfully");
    } catch (error) {
      console.error("PDF generation error:", error);
      setDownloadStatus("error");
      setDownloadMessage("PDF download failed. Please try again.");
    } finally {
      setIsDownloading(false);
      setTimeout(() => {
        setDownloadMessage("");
        setDownloadStatus("idle");
      }, 4000);
    }
  };

  const handleShareLink = () => {
    setShareMessage("Coming soon");
    setTimeout(() => setShareMessage(""), 3000);
  };

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

      {/* Redesigned Download Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col items-center text-center">
        {/* Background Accent */}
        <div className="absolute top-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        {/* Icon Header */}
        <div className="mb-4 mt-2 grid h-14 w-14 place-items-center rounded-full bg-blue-50 border border-blue-100 text-blue-600">
          <FileDown className="h-6 w-6" />
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2">Download Your Resume</h3>
        <p className="text-sm text-slate-500 mb-8 max-w-sm">Save as a PDF — ready to send to employers!</p>

        {/* Visually hidden but accessible printable resume */}
        <div className="absolute top-[-9999px] left-[-9999px] w-[210mm] min-h-[297mm] opacity-0 pointer-events-none">
          <div ref={printRef} className="w-full h-full bg-white">
            <LivePreview accentColor={resumeData.accentColor} />
          </div>
        </div>

        <div className="flex flex-col w-full max-w-sm gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-80 disabled:pointer-events-none"
          >
            <Download className="h-5 w-5" /> 
            {isDownloading ? "Preparing PDF..." : "Download PDF"}
          </button>
          
          <button 
            onClick={handleShareLink}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-[15px] font-bold text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
          >
            <Share2 className="h-4 w-4 text-slate-500" /> Share Resume Link
          </button>
        </div>

        {/* Download Status Messages */}
        <div className="min-h-[24px] mt-4">
          {downloadMessage && (
            <p className={`text-sm font-semibold transition-all ${
              downloadStatus === "success" ? "text-emerald-600" : 
              downloadStatus === "error" ? "text-red-600" : 
              "text-blue-600 animate-pulse"
            }`}>
              {downloadMessage}
            </p>
          )}
          {shareMessage && !downloadMessage && (
            <p className="text-sm font-semibold text-slate-600">
              {shareMessage}
            </p>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 w-full">
          <p className="text-[13px] text-slate-400 font-medium">
            <CheckCircle2 className="inline h-3.5 w-3.5 text-emerald-500 mr-1" />
            Your resume is automatically saved in this browser session.
          </p>
        </div>
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
