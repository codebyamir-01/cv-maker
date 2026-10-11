"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

export function AutoSaver() {
  const { resumeData, databaseId } = useResumeStore();
  const { status } = useSession();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pendingPayload, setPendingPayload] = useState<string | null>(null);
  const prevDataRef = useRef(JSON.stringify(resumeData));

  const doSave = useCallback(async (payload: Record<string, unknown>) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!databaseId) {
        const result = await res.json();
        if (result.resume?.id) {
          useResumeStore.getState().setDatabaseId(result.resume.id);
          window.history.replaceState(null, "", `/builder?id=${result.resume.id}`);
        }
      }
      setSaveStatus("saved");
      setPendingPayload(null);
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    }
  }, [databaseId]);

  useEffect(() => {
    if (status !== "authenticated") return; // Do not auto-save for guests
    const currentDataStr = JSON.stringify(resumeData);
    if (currentDataStr === prevDataRef.current) return;
    prevDataRef.current = currentDataStr;
    const payload: Record<string, unknown> = { ...resumeData };
    if (databaseId) payload.id = databaseId;
    setPendingPayload(JSON.stringify(payload));
    const handler = setTimeout(() => doSave(payload), 2000);
    return () => clearTimeout(handler);
  }, [resumeData, databaseId, doSave, status]);

  if (saveStatus === "error") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
        <span>Save failed</span>
        <button
          onClick={() => { if (pendingPayload) doSave(JSON.parse(pendingPayload)); }}
          className="underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }
  if (saveStatus === "saving") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
        <Loader2 className="h-3 w-3 animate-spin text-emerald-500" />
        Saving...
      </div>
    );
  }
  if (saveStatus === "saved") {
    return (
      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
        Saved
      </div>
    );
  }
  return null;
}

export default AutoSaver;
