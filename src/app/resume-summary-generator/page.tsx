"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function ResumeSummaryGenerator() {
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [summaries, setSummaries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    setIsLoading(true);
    setError("");
    setSummaries([]);
    setCopiedIndex(null);

    try {
      const res = await fetch("/api/ai/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle, experience }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSummaries(data.summaries || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <title>Free AI Resume Summary Generator 2026 | Smart Resume Maker</title>
      <meta name="description" content="Generate professional, ATS-friendly resume summaries in seconds with our free AI tool. No signup required." />
      
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20">
        <section className="px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-6">
                <Sparkles className="w-3.5 h-3.5" /> 100% Free AI Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                AI Resume <span className="text-blue-600">Summary Generator</span>
              </h1>
              <p className="text-lg text-slate-600">
                Type your job title and skills below. Our AI will instantly write 3 professional resume summaries tailored for Applicant Tracking Systems (ATS).
              </p>
            </div>

            <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-200 shadow-xl mb-12">
              <form onSubmit={handleGenerate} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Target Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">
                    Key Skills or Experience (Optional)
                  </label>
                  <textarea
                    placeholder="e.g. 5 years experience, React, Node.js, team leadership, increased sales by 20%"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-24 resize-none"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isLoading || !jobTitle}
                  className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md transition-transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating Summaries...</>
                  ) : (
                    <><Sparkles className="mr-2 h-5 w-5" /> Generate My Summaries</>
                  )}
                </Button>
              </form>
            </div>

            {/* Results Section */}
            {summaries.length > 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">Here are your AI-generated summaries:</h2>
                
                {summaries.map((summary, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative group hover:border-blue-300 transition-colors">
                    <p className="text-slate-700 leading-relaxed pr-12">
                      {summary}
                    </p>
                    <button
                      onClick={() => copyToClipboard(summary, index)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}

                <div className="mt-12 bg-slate-900 text-white rounded-3xl p-8 text-center shadow-lg">
                  <h3 className="text-2xl font-bold mb-3">Want to put this summary on a beautiful resume?</h3>
                  <p className="text-slate-300 mb-6 max-w-lg mx-auto">
                    Use our completely free ATS resume builder. Paste your summary into our builder, pick a template, and download your PDF instantly.
                  </p>
                  <Link href="/builder">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 font-bold shadow-md">
                      Go to Free Resume Builder <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
