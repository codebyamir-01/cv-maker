import React from "react";

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      {/* Document Outline */}
      <rect x="15" y="15" width="60" height="75" rx="8" stroke="#3b82f6" strokeWidth="6" />
      
      {/* Bullet Lines */}
      <circle cx="28" cy="40" r="4" fill="#3b82f6" />
      <line x1="38" y1="40" x2="60" y2="40" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
      
      <circle cx="28" cy="55" r="4" fill="#3b82f6" />
      <line x1="38" y1="55" x2="60" y2="55" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />
      
      <circle cx="28" cy="70" r="4" fill="#3b82f6" />
      <line x1="38" y1="70" x2="60" y2="70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

      {/* Swoosh Checkmark / Spark */}
      <path d="M45 35 L60 50 L95 10" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Tiny Sparkles */}
      <path d="M80 30 L85 20 L90 30 L100 35 L90 40 L85 50 L80 40 L70 35 Z" fill="#3b82f6" />
    </svg>
  );
}
