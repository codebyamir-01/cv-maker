"use client";

import { useState, memo } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export const SummaryForm = memo(function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleFetchSuggestions = async () => {
    setShowSuggestions(true);
    if (suggestions.length > 0) return; // already loaded

    setIsLoading(true);
    const title = resumeData.personalInfo?.jobTitle || "Professional";
    try {
      const res = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type: "summary" })
      });
      const data = await res.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error(e);
      setSuggestions(["Failed to load suggestions. Please try again later."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Professional Summary</h2>
        <button
          type="button"
          onClick={showSuggestions ? () => setShowSuggestions(false) : handleFetchSuggestions}
          disabled={isLoading}
          className="text-[11px] text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full font-bold tracking-wide transition-colors flex items-center gap-1.5 shadow-sm border border-blue-200 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          SMART SUGGESTIONS
        </button>
      </div>

      {showSuggestions && (
        <div className="mb-4 p-4 bg-slate-50 border border-blue-100 rounded-xl">
          <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
            {isLoading ? "Generating AI suggestions..." : "Click a template to use it"}
          </p>
          <div className="space-y-2">
            {!isLoading && suggestions.map((text, i) => (
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

export default SummaryForm;
