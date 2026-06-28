"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Download, Star, X } from "lucide-react";

import dynamic from "next/dynamic";

const AtsClassic = dynamic(() => import("@/components/builder/templates/AtsClassic"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const ModernProfessional = dynamic(() => import("@/components/builder/templates/ModernProfessional"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const Developer = dynamic(() => import("@/components/builder/templates/Developer"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const Executive = dynamic(() => import("@/components/builder/templates/Executive"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const Aether = dynamic(() => import("@/components/builder/templates/Aether"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const Monochrome = dynamic(() => import("@/components/builder/templates/Monochrome"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const AtsMinimal = dynamic(() => import("@/components/builder/templates/AtsMinimal"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const CorporateClassic = dynamic(() => import("@/components/builder/templates/CorporateClassic"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const CreativeClean = dynamic(() => import("@/components/builder/templates/CreativeClean"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const AcademicCv = dynamic(() => import("@/components/builder/templates/AcademicCv"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const TwoColumnModern = dynamic(() => import("@/components/builder/templates/TwoColumnModern"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const GraduateStarter = dynamic(() => import("@/components/builder/templates/GraduateStarter"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const FinanceProfessional = dynamic(() => import("@/components/builder/templates/FinanceProfessional"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const MarketingCreative = dynamic(() => import("@/components/builder/templates/MarketingCreative"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const SimpleBw = dynamic(() => import("@/components/builder/templates/SimpleBw"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const StartupLeader = dynamic(() => import("@/components/builder/templates/StartupLeader"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });
const ElegantSerif = dynamic(() => import("@/components/builder/templates/ElegantSerif"), { ssr: false, loading: () => <div className="animate-pulse bg-slate-100 w-full h-full rounded" /> });

export default function TemplateCard({ template, dummyData }: { template: any, dummyData: any }) {
  const [showPreview, setShowPreview] = useState(false);

  const getComponent = (id: string) => {
    switch (id) {
      case "monochrome": return Monochrome;
      case "ats-classic": return AtsClassic;
      case "aether": return Aether;
      case "modern": return ModernProfessional;
      case "developer": return Developer;
      case "executive": return Executive;
      case "ats-minimal": return AtsMinimal;
      case "corporate": return CorporateClassic;
      case "creative-clean": return CreativeClean;
      case "academic": return AcademicCv;
      case "two-column": return TwoColumnModern;
      case "graduate": return GraduateStarter;
      case "finance": return FinanceProfessional;
      case "marketing": return MarketingCreative;
      case "simple-bw": return SimpleBw;
      case "startup-leader": return StartupLeader;
      case "elegant-serif": return ElegantSerif;
      default: return AtsClassic;
    }
  };

  const Component = getComponent(template.id);
  const scale = 0.2;

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5">
        {/* Template preview area */}
        <div className="relative h-52 bg-slate-50 flex items-center justify-center overflow-hidden">
          <div className="w-[163px] h-[211px] bg-white rounded shadow-md border border-slate-200 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              <Component resumeData={dummyData} accentColor={template.accent} />
            </div>
          </div>

          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 shadow-md hover:bg-slate-50 transition"
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            <Link
              href={`/builder?t=${template.id}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              <Download className="h-3.5 w-3.5" /> Use This
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {template.popular && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                <Star className="h-2.5 w-2.5 fill-white" /> Popular
              </span>
            )}
            {template.ats && (
              <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                ATS ✓
              </span>
            )}
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{template.name}</h3>
            <span className="shrink-0 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{template.category}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed mb-3 flex-1">{template.desc}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.map((tag: string) => (
              <span key={tag} className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                {tag}
              </span>
            ))}
          </div>
          <Link
            href={`/builder?t=${template.id}`}
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-900 hover:text-white hover:border-slate-900"
          >
            Use Template →
          </Link>
        </div>
      </div>

      {/* Modal Preview */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-10" onClick={() => setShowPreview(false)}>
          <div 
            className="relative bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-full" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b bg-slate-50">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{template.name}</h3>
                <p className="text-xs text-slate-500">Template Preview</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/builder?t=${template.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
                >
                  <Download className="h-4 w-4" /> Use This Template
                </Link>
                <button onClick={() => setShowPreview(false)} className="p-2 text-slate-400 hover:text-slate-900 bg-white rounded-full hover:bg-slate-200 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="overflow-auto p-6 bg-slate-100 flex items-start justify-center flex-1">
              <div className="bg-white shadow-xl">
                <div style={{ transform: "scale(0.8)", transformOrigin: "top center", width: "816px", height: "1056px" }}>
                   <Component resumeData={dummyData} accentColor={template.accent} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
