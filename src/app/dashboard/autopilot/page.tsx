"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Zap, Briefcase, MapPin, DollarSign, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AutopilotDashboard() {
  const { data: session } = useSession();
  
  const [jobTitles, setJobTitles] = useState<string>("Software Engineer, Frontend Developer");
  const [location, setLocation] = useState<string>("Remote");
  const [remoteOnly, setRemoteOnly] = useState<boolean>(true);
  const [minSalary, setMinSalary] = useState<string>("100000");
  const [autoApply, setAutoApply] = useState<boolean>(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const res = await fetch("/api/autopilot");
        if (res.ok) {
          const data = await res.json();
          if (data.preferences) {
            setJobTitles(data.preferences.jobTitles.join(", "));
            setLocation(data.preferences.location || "");
            setRemoteOnly(data.preferences.remoteOnly);
            setMinSalary(data.preferences.minSalary?.toString() || "");
            setAutoApply(data.preferences.autoApplyEnabled);
          }
        }
      } catch (err) {
        console.error("Failed to load preferences", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPreferences();
  }, [session]);

  const handleSave = async (forceAutoApplyState?: boolean) => {
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const isAuto = forceAutoApplyState !== undefined ? forceAutoApplyState : autoApply;
      const res = await fetch("/api/autopilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitles: jobTitles.split(",").map(t => t.trim()).filter(Boolean),
          location,
          remoteOnly,
          minSalary,
          autoApplyEnabled: isAuto,
        })
      });

      if (!res.ok) throw new Error("Failed to connect to database");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err: any) {
      setSaveStatus("error");
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleAutoApply = () => {
    const newState = !autoApply;
    setAutoApply(newState);
    handleSave(newState);
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
          <h1 className="text-3xl font-extrabold tracking-tight">Autonomous Reverse Recruiter</h1>
          <p className="text-slate-400 mt-2 max-w-xl">
            Set your parameters. Turn on Autopilot. Our AI agents will automatically find and apply to jobs on your behalf 24/7.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-col items-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 min-w-[250px]">
          <p className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">System Status</p>
          <div className="flex items-center gap-4">
            <Switch 
              checked={autoApply}
              onCheckedChange={toggleAutoApply}
              className="data-[state=checked]:bg-emerald-500"
            />
            <span className={\`font-bold \${autoApply ? 'text-emerald-400' : 'text-slate-400'}\`}>
              {autoApply ? 'AUTOPILOT ACTIVE' : 'SYSTEM OFFLINE'}
            </span>
          </div>
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
                <p className="text-xs text-slate-500 mt-2">Comma separated list of roles the AI should search for.</p>
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
                <label htmlFor="remote" className="text-sm font-bold text-slate-700">Only apply to Remote jobs</label>
              </div>

              <Button 
                onClick={() => handleSave(autoApply)} 
                disabled={isSaving}
                className="w-full h-12 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Update Parameters"}
              </Button>
            </div>
          </div>
        </div>

        {/* LIVE ACTIVITY FEED */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 h-full flex flex-col relative overflow-hidden">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" /> Live Agent Feed
            </h2>

            {autoApply ? (
              <div className="space-y-4 flex-1 relative z-10">
                <div className="p-4 rounded-xl border border-blue-100 bg-white shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 animate-pulse shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">Just now</p>
                    <p className="text-sm text-slate-800">Agent spawned. Initializing headless browser and evading bot detection...</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3 opacity-60">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">2 mins ago</p>
                    <p className="text-sm text-slate-800">Successfully scraped 142 new jobs from Workday matching "{jobTitles.split(",")[0] || "Software Engineer"}".</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm flex items-start gap-3 opacity-40">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-medium mb-1">5 mins ago</p>
                    <p className="text-sm text-slate-800">Applied to Google (L4 Engineer) via Greenhouse. Cover letter automatically generated.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 p-6">
                <Briefcase className="h-12 w-12 text-slate-200 mb-4" />
                <p className="text-sm font-medium">Turn on Autopilot to start applying to jobs automatically.</p>
              </div>
            )}
            
            {autoApply && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20 pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
