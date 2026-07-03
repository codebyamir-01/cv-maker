import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";
import { useEffect } from "react";

interface AiOptimizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingKeywords: string[];
  jobDescription: string;
}

export default function AiOptimizeModal({ isOpen, onClose, missingKeywords, jobDescription }: AiOptimizeModalProps) {
  const { resumeData, updateSummary, updateExperience } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [optimizedData, setOptimizedData] = useState<{ summary: string; experience: { id: string; description: string }[] } | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setOptimizedData(null);
    setError("");
    setSuccess(false);
  };

  const handleOptimize = async () => {
    setIsGenerating(true);
    setError("");
    setOptimizedData(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: resumeData.summary,
          experience: resumeData.experience.map(e => ({ id: e.id, description: e.description, jobTitle: e.jobTitle })),
          missingKeywords,
          jobDescription,
        }),
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error("Too many requests. Please try again in a minute.");
        throw new Error("Failed to optimize resume.");
      }

      const data = await res.json();
      setOptimizedData(data.optimized);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (!optimizedData) return;

    if (optimizedData.summary) {
      updateSummary(optimizedData.summary);
    }

    if (optimizedData.experience) {
      optimizedData.experience.forEach(optExp => {
        updateExperience(optExp.id, { description: optExp.description });
      });
    }

    setSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Panel */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" /> Auto-Optimize with AI
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              AI will naturally incorporate missing keywords into your Summary and Experience. It will not invent new experiences.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors ml-4 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Initial State */}
          {!optimizedData && !isGenerating && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready to Optimize?</h3>
              <p className="text-slate-600 mb-4 max-w-md mx-auto text-sm">
                We will rewrite parts of your resume to include these missing keywords:
                <strong className="block mt-2 text-indigo-700">{missingKeywords.join(", ")}</strong>
              </p>
              <Button onClick={handleOptimize} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8">
                Generate Suggestions
              </Button>
            </div>
          )}

          {/* Loading */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium animate-pulse">Analyzing and rewriting… this may take a moment.</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Results */}
          {optimizedData && (
            <div className="space-y-6">
              {/* Summary Comparison */}
              {optimizedData.summary && optimizedData.summary !== resumeData.summary && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-semibold text-sm text-slate-700">
                    Professional Summary
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                    <div className="p-4 bg-rose-50/30">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original</h4>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{resumeData.summary}</p>
                    </div>
                    <div className="p-4 bg-emerald-50/30">
                      <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Optimized
                      </h4>
                      <p className="text-sm text-slate-800 whitespace-pre-wrap">{optimizedData.summary}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Comparisons */}
              {optimizedData.experience?.map((optExp) => {
                const origExp = resumeData.experience.find(e => e.id === optExp.id);
                if (!origExp || origExp.description === optExp.description) return null;
                return (
                  <div key={optExp.id} className="border border-slate-200 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-semibold text-sm text-slate-700">
                      Experience: {origExp.jobTitle}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <div className="p-4 bg-rose-50/30">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Original</h4>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{origExp.description}</p>
                      </div>
                      <div className="p-4 bg-emerald-50/30">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> AI Optimized
                        </h4>
                        <p className="text-sm text-slate-800 whitespace-pre-wrap">{optExp.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {optimizedData && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 shrink-0 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => setOptimizedData(null)} disabled={success} className="text-slate-500 rounded-xl">
              Discard Changes
            </Button>
            <Button
              onClick={handleApply}
              disabled={success}
              className={`rounded-xl transition-all px-8 h-11 ${success ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"} text-white`}
            >
              {success ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Applied!</>
              ) : (
                <>Approve &amp; Apply <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
