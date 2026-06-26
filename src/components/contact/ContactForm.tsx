"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "4b768aa2-8394-4c84-a914-fb9ce4a95401");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Message sent successfully! We'll get back to you soon.");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to send message. Please check your internet connection.");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm h-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Send a Message</h2>
      <p className="text-sm text-slate-400 mb-7">Fill out the form and we&apos;ll get back to you as soon as possible.</p>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Thank you!</h3>
          <p className="text-slate-500">{message}</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="First Name"
                required
                placeholder="Amir"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-700">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Last Name"
                required
                placeholder="Khan"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-slate-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-slate-700">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              name="Subject"
              required
              defaultValue=""
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
            >
              <option value="" disabled>Select a topic...</option>
              <option>Resume Builder Help</option>
              <option>Template Question</option>
              <option>PDF Download Issue</option>
              <option>ATS / Job Match</option>
              <option>Feature Request</option>
              <option>Partnership Inquiry</option>
              <option>Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-slate-700">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              name="Message"
              required
              rows={6}
              placeholder="Describe your question or issue in detail..."
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition resize-none"
            />
          </div>

          {/* Spam Prevention Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          {/* Error Message */}
          {status === "error" && (
            <p className="text-sm font-semibold text-red-600">{message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {status === "loading" ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          <p className="text-center text-xs text-slate-400">
            We typically respond within 24 hours on business days.
          </p>
        </form>
      )}
    </div>
  );
}
