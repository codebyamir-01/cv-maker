"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Copy, CheckCircle2, Wand2 } from "lucide-react";
import Link from "next/link";

export function CoverLetterClient() {
  const resumeData = useResumeStore((state) => state.resumeData);
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("Professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Check if they have at least some basic resume data
  const hasResumeData = resumeData?.basics?.name || (resumeData?.experience && resumeData.experience.length > 0);

  const handleGenerate = async () => {
    if (!hasResumeData) {
      setError("We couldn't find your resume data. Please build a resume first so we know your experience.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please paste a job description.");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription, tone }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a minute before generating again.");
        }
        throw new Error("Failed to generate cover letter. Please try again.");
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-5">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Letter Settings</h2>
            
            {!hasResumeData && (
              <div className="mb-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 border border-blue-100">
                <strong className="block mb-1">No Resume Found</strong>
                We need your work history to write the letter. <Link href="/builder" className="underline font-bold">Go to Builder</Link>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tone of Voice</label>
                <select 
                  value={tone} 
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm text-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                >
                  <option value="Professional">Professional (Corporate)</option>
                  <option value="Enthusiastic">Enthusiastic (Startup/Creative)</option>
                  <option value="Confident">Confident (Executive/Leadership)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Target Job Description</label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job requirements and responsibilities here..."
                  className="h-64 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !hasResumeData}
              className="mt-6 h-12 w-full rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Writing Letter...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-3">
          <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col relative overflow-hidden">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h2 className="text-sm font-bold text-slate-700">Generated Letter</h2>
              {coverLetter && (
                <Button 
                  onClick={handleCopy} 
                  variant="outline" 
                  size="sm"
                  className="h-8 text-xs font-semibold"
                >
                  {copied ? (
                    <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Copied</>
                  ) : (
                    <><Copy className="mr-1.5 h-3.5 w-3.5" /> Copy Text</>
                  )}
                </Button>
              )}
            </div>

            {/* Document Body */}
            <div className="p-8 md:p-12 min-h-[500px] text-slate-800 text-[15px] leading-relaxed whitespace-pre-wrap font-serif">
              {coverLetter ? (
                coverLetter
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4 pt-20">
                  <Wand2 className="h-12 w-12 text-slate-200" />
                  <p>Your AI-generated cover letter will appear here.<br/>It will automatically incorporate your resume experience.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
