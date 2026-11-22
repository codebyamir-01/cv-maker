"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function SupportForm() {
  const [openedEmail, setOpenedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = `${formData.get("FirstName") ?? ""} ${formData.get("LastName") ?? ""}`.trim();
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("Message") ?? "");
    const subject = encodeURIComponent(`CV Maker support request from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply to: ${email}`);
    window.location.href = `mailto:jerryjoe9199@gmail.com?subject=${subject}&body=${body}`;
    setOpenedEmail(true);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm h-full">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Send a Message</h2>
      <p className="text-sm text-slate-400 mb-7">Fill out the form and we&apos;ll get back to you as soon as possible.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="FirstName"
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
                name="LastName"
                required
                placeholder="Khan"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
          </div>

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

          {openedEmail && <p role="status" className="text-sm text-slate-600">Your email app should open with a draft. Please send it there. If it did not open, email <a className="underline" href="mailto:jerryjoe9199@gmail.com">jerryjoe9199@gmail.com</a> directly.</p>}

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            <Send className="h-4 w-4" />
            Open Email Draft
          </button>
        </form>
    </div>
  );
}
