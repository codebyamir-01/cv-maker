"use client";

import dynamic from "next/dynamic";

// This wrapper is a Client Component, which allows us to use ssr:false.
// ssr:false means the TemplatesSection JS is completely excluded from the
// initial HTML/JS bundle — mobile devices skip parsing it until it's needed.
const TemplatesSection = dynamic(() => import("@/components/home/TemplatesSection"), {
  ssr: false,
  loading: () => (
    <div className="py-32 bg-[#1e293b] flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
    </div>
  ),
});

export default function TemplatesSectionLoader() {
  return <TemplatesSection />;
}
