import React from "react";

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer Document Shape */}
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" className="text-slate-800" />
      <path d="M14 2v6h6" className="text-slate-800" />

      {/* Bullet Lines */}
      <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" className="text-slate-800" />
      <line x1="10" y1="11" x2="16" y2="11" className="text-slate-800" />
      
      <circle cx="8" cy="15" r="0.8" fill="currentColor" stroke="none" className="text-slate-800" />
      <line x1="10" y1="15" x2="16" y2="15" className="text-slate-800" />
      
      <circle cx="8" cy="19" r="0.8" fill="currentColor" stroke="none" className="text-slate-800" />
      <line x1="10" y1="19" x2="13" y2="19" className="text-slate-800" />

      {/* Dynamic Swoosh / Checkmark with Sparkle */}
      <g className="text-blue-600">
        <path d="M9 13.5l2.5 2.5 5.5-6.5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M17 7.5l.5-1.5 1.5-.5-1.5-.5-.5-1.5-.5 1.5-1.5.5 1.5.5z" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
