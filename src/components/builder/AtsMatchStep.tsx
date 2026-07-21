"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Sparkles, ScanLine, AlertCircle, CheckCircle2, ChevronRight, Target, Loader2 } from "lucide-react";

export default function AtsMatchStep() {
  const { resumeData, jobDescription, setJobDescription, atsResult, setAtsResult } = useResumeStore();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!jobDescription || jobDescription.trim().length < 50) {
      setError("Please paste a valid, complete job description (at least 50 characters).");
      return;
    }

    setError(null);
    setIsScanning(true);

    try {
      const res = await fetch("/api/ai/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to scan resume.");
      }

      setAtsResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during scanning.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50">
            <Target className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Live ATS Matcher</h2>
            <p className="text-sm text-slate-400">Compare your resume against a specific job description</p>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="jd" className="block text-sm font-semibold text-slate-700 mb-2">
            Paste Job Description Here
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description from LinkedIn, Indeed, etc..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition resize-none min-h-[160px]"
          />
          {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning || !jobDescription.trim()}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-black hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none"
        >
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Scanning ATS Match...
            </>
          ) : (
            <>
              <ScanLine className="h-4 w-4" />
              Analyze Match Score
            </>
          )}
        </button>
      </div>

      {/* Results Section */}
      {atsResult && !isScanning && (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-6 flex flex-col md:flex-row items-center gap-6">
            
            {/* Score Circle */}
            <div className="relative flex shrink-0 items-center justify-center">
              <svg className="h-32 w-32 -rotate-90 transform">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={351.858}
                  strokeDashoffset={351.858 - (351.858 * atsResult.score) / 100}
                  className={`transition-all duration-1000 ease-out ${
                    atsResult.score >= 80 ? "text-emerald-500" : atsResult.score >= 50 ? "text-amber-500" : "text-red-500"
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{atsResult.score}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Match</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {atsResult.score >= 80 ? "Great Match! 🎉" : atsResult.score >= 50 ? "Good Start, Needs Tweaks 👍" : "Needs Significant Updates ⚠️"}
              </h3>
              <p className="text-sm text-slate-600">
                {atsResult.score >= 80 
                  ? "Your resume is well-tailored for this role. You can download and apply now, or add a few final keywords."
                  : "To get past the ATS (Applicant Tracking System), you should add the missing keywords below naturally into your experience."}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Missing Keywords */}
            <div className="rounded-xl border border-red-100 bg-red-50/50 p-5">
              <h4 className="flex items-center gap-2 font-bold text-red-800 mb-3 text-sm">
                <AlertCircle className="h-4 w-4" /> Missing Critical Keywords
              </h4>
              {atsResult.missingKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {atsResult.missingKeywords.map((kw, i) => (
                    <span key={i} className="inline-flex items-center rounded-lg bg-white border border-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 shadow-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-emerald-600 font-medium">No critical keywords missing! Great job.</p>
              )}
            </div>

            {/* Suggestions */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
              <h4 className="flex items-center gap-2 font-bold text-blue-800 mb-3 text-sm">
                <Sparkles className="h-4 w-4" /> AI Suggestions
              </h4>
              <ul className="space-y-3">
                {atsResult.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-700">
                    <ChevronRight className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
