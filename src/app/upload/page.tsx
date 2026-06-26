"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { resumeData } = useResumeStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Overwrite Zustand store with full extracted AI data
        useResumeStore.setState((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...data.data.personalInfo },
            summary: data.data.summary || "",
            experience: data.data.experience || [],
            education: data.data.education || [],
            skills: data.data.skills || [],
            projects: data.data.projects || [],
            optionalSections: {
              ...state.resumeData.optionalSections,
              certifications: data.data.certifications || []
            }
          }
        }));
        
        // Redirect to builder
        router.push("/builder");
      } else {
        setError(data.error || "Failed to parse resume.");
      }
    } catch (err) {
      setError("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link href="/dashboard" className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex flex-1 items-center justify-end gap-2">
             <span className="text-sm font-bold text-slate-900">Import Resume</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <UploadCloud className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Upload your existing resume</h1>
          <p className="text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
            We will parse your existing PDF file, extract your details, and automatically fill them into our ATS-friendly templates.
          </p>

          {error && <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100">{error}</div>}

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed ${isUploading ? 'border-slate-200 bg-slate-50' : 'border-slate-300 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-400 cursor-pointer'} rounded-2xl p-10 transition-colors group relative`}
          >
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
              disabled={isUploading}
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                <h3 className="font-bold text-slate-700 mb-1">Parsing Document...</h3>
                <p className="text-sm text-slate-400">Our AI is extracting your details</p>
              </div>
            ) : (
              <>
                <FileText className="w-12 h-12 text-slate-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                <h3 className="font-bold text-slate-700 mb-1 group-hover:text-blue-700 transition-colors">Click to browse your file</h3>
                <p className="text-sm text-slate-400 mb-6">Supported formats: PDF (Max 5MB)</p>
                <button className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold py-2.5 px-6 rounded-xl shadow-sm transition">
                  Browse Files
                </button>
              </>
            )}
          </div>

          <div className="mt-8 text-left max-w-md mx-auto">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">What happens next?</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">AI automatically extracts your contact details, experience, and education.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">Review and edit the parsed information in the Resume Builder.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-sm text-slate-600">Choose a new premium template and download your upgraded CV!</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
