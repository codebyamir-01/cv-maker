"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Loader2, Zap, Briefcase, MapPin, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AutopilotDashboard() {
  const { data: session } = useSession();
  
  const [jobTitles, setJobTitles] = useState<string>("Software Engineer, Frontend Developer");
  const [location, setLocation] = useState<string>("Remote");
  const [remoteOnly, setRemoteOnly] = useState<boolean>(true);
  const [minSalary, setMinSalary] = useState<string>("100000");
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    async function loadPreferences() {
      if (!session?.user?.email) return;
      try {
        const res = await fetch("/api/autopilot");
        if (res.ok) {
          const data = await res.json();
          if (data.preferences) {
            setJobTitles(data.preferences.jobTitles.join(", "));
            setLocation(data.preferences.location || "");
            setRemoteOnly(data.preferences.remoteOnly);
            setMinSalary(data.preferences.minSalary?.toString() || "");
          }
        }
      } catch (err) {
        console.error("Failed to load preferences", err);
      }
    }
    loadPreferences();
  }, [session]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitles: jobTitles.split(",").map(t => t.trim()).filter(Boolean),
          location,
          remoteOnly,
          minSalary,
        })
      });

      if (!res.ok) throw new Error("Failed to connect to database");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      setSaveStatus("error");
      console.error("Failed to save preferences", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative">
        <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3 w-3 fill-current" /> Beta Access
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Job Preferences</h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Save the roles and locations you are interested in. Automatic job search and applications are not available yet.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* PREFERENCES FORM */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Target Parameters</h2>
              {saveStatus === "success" && <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" /> Saved</span>}
              {saveStatus === "error" && <span className="text-sm font-bold text-red-600 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> Error saving</span>}
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-500" /> Target Job Titles
                </label>
                <input 
                  type="text" 
                  value={jobTitles}
                  onChange={(e) => setJobTitles(e.target.value)}
                  placeholder="e.g. Software Engineer, React Developer"
                  className="w-full rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-xs text-slate-500 mt-2">Separate multiple job titles with commas.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" /> Location
                  </label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New York, USA"
                    className="w-full rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" /> Min Salary (USD)
                  </label>
                  <input 
                    type="number" 
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    placeholder="e.g. 100000"
                    className="w-full rounded-xl border border-slate-300 p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <input 
                  type="checkbox" 
                  id="remote" 
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remote" className="text-sm font-bold text-slate-700">Remote jobs only</label>
              </div>

              <Button 
                onClick={() => handleSave()}
                disabled={isSaving}
                className="w-full h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Preferences"}
              </Button>
            </div>
          </div>
        </div>

        {/* Availability notice */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 h-full">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Coming later</h2>
            <p className="text-sm text-slate-600">These preferences are saved to your account. No jobs are searched or applied to automatically.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
