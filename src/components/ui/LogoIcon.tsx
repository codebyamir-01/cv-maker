import React from "react";

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Document Shape */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" className="text-slate-800" />
      <path d="M14 2v6h6" className="text-slate-800" />
      {/* Spark / Sparkle inside */}
      <path d="M10 11.5l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" className="text-blue-600 fill-blue-600" strokeWidth="1.5" />
    </svg>
  );
}
