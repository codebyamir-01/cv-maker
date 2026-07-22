"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import Link from "next/link";

interface AtsResult {
  score: number;
  missingKeywords: string[];
  suggestions: string[];
}

export function AtsCheckerClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AtsResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError("Please paste both your resume and the job description.");
      return;
    }

    setError(null);
    setIsScanning(true);

    try {
      const response = await fetch("/api/ai/free-ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait a minute before scanning again.");
        }
        throw new Error("Failed to scan resume. Please try again.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsScanning(false);
    }
  };

  const resetScanner = () => {
    setResult(null);
    setError(null);
  };

  // Circular progress math
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };
  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-50";
    if (score >= 50) return "bg-amber-50";
    return "bg-red-50";
  };
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {!result ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Left Panel: Resume */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-900">
                1. Paste Your Resume
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the plain text of your resume here..."
                className="h-96 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                Copy text from your PDF or Word document and paste it above. Don't worry about formatting.
              </p>
            </div>

            {/* Right Panel: Job Description */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-900">
                2. Paste Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here..."
                className="h-96 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-2 text-xs text-slate-500">
                Paste the requirements and responsibilities from the job posting.
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600 border border-red-100">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="mt-8 flex justify-center border-t border-slate-100 pt-8">
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="h-14 w-full max-w-sm rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Scanning ATS Rules...
                </>
              ) : (
                "Scan My Resume"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="mb-10 flex flex-col items-center border-b border-slate-100 pb-10 text-center">
            <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-slate-900">Your ATS Match Results</h2>
            
            <div className="relative mb-6 flex h-48 w-48 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="stroke-slate-100"
                  strokeWidth="8"
                  fill="transparent"
                  r={radius}
                  cx="50"
                  cy="50"
                />
                <circle
                  className={`transition-all duration-1000 ease-out ${getScoreColor(result.score)}`}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference - (result.score / 100) * circumference}
                  strokeLinecap="round"
                  fill="transparent"
                  r={radius}
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-5xl font-black tracking-tighter ${getScoreColor(result.score)}`}>
                  {result.score}%
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-1">Match</span>
              </div>
            </div>

            {result.score >= 80 ? (
              <p className="max-w-lg text-emerald-700 font-medium bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                Great job! Your resume is highly optimized for this role.
              </p>
            ) : result.score >= 50 ? (
              <p className="max-w-lg text-amber-700 font-medium bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                You're on the right track, but missing some key requirements. Add the missing keywords below.
              </p>
            ) : (
              <p className="max-w-lg text-red-700 font-medium bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                Your resume is likely to be rejected by an ATS. It lacks critical keywords from the job description.
              </p>
            )}
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <XCircle className="h-5 w-5 text-red-500" /> Critical Missing Keywords
              </h3>
              <p className="mb-4 text-sm text-slate-600 leading-relaxed">
                We couldn't find these hard skills in your resume. If you have this experience, you must add these exact words to pass the ATS filter.
              </p>
              <div className="flex flex-wrap gap-2">
                {result.missingKeywords.length > 0 ? (
                  result.missingKeywords.map((kw, i) => (
                    <span key={i} className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 border border-red-100 shadow-sm">
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-100">No critical keywords missing!</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" /> AI Improvement Suggestions
              </h3>
              <ul className="space-y-4">
                {result.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs mt-0.5">
                      {i + 1}
                    </div>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 p-8 text-center sm:p-10 shadow-xl">
            <h3 className="mb-3 text-2xl font-bold text-white">Want to fix these errors instantly?</h3>
            <p className="mb-8 text-blue-200">
              Our AI Resume Builder auto-formats your resume to be 100% ATS compliant and helps you write keyword-rich bullet points.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button className="h-12 w-full rounded-full bg-white text-blue-900 font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-black/20 px-8">
                  Build ATS Resume Now <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button onClick={resetScanner} variant="outline" className="h-12 w-full sm:w-auto rounded-full border-blue-800 bg-transparent text-blue-100 hover:bg-blue-800 hover:text-white transition-colors px-8">
                Scan Another Resume
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
