"use client";

import { useState, useRef } from "react";
import { Tag, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const trimmed = email.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      } else {
        setStatus("success");
        setMessage(data.message ?? "You're subscribed! 🎉");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <div className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 mb-5">
        <Tag className="h-4 w-4" /> Weekly Career Tips
      </div>

      <h2 className="text-3xl font-extrabold text-white mb-3">
        Get Resume Tips in Your Inbox
      </h2>
      <p className="text-slate-400 mb-8 max-w-xl mx-auto">
        Join 10,000+ job seekers who get our weekly resume tips, ATS updates,
        and hiring insights — free.
      </p>

      {status === "success" ? (
        <div className="flex items-center justify-center gap-3 rounded-xl bg-green-500/20 border border-green-500/30 px-6 py-4 max-w-md mx-auto">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
          <p className="text-green-300 font-semibold text-sm">{message}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          noValidate
        >
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={status === "loading"}
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 active:bg-blue-700 transition whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Subscribing…
              </>
            ) : (
              "Subscribe Free"
            )}
          </button>
        </form>
      )}

      {status === "error" && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{message}</p>
        </div>
      )}

      {status !== "success" && (
        <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
      )}
    </div>
  );
}
