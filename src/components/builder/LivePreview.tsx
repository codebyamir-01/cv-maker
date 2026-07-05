"use client";

import { memo } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import dynamic from "next/dynamic";

// ── Dynamically import every template so they are code-split into
// separate chunks. Mobile only downloads the ONE template being viewed,
// not all 6 (~200–400KB savings on initial load).
const AtsClassic = dynamic(() => import("./templates/AtsClassic"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const ModernProfessional = dynamic(() => import("./templates/ModernProfessional"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const Developer = dynamic(() => import("./templates/Developer"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const Monochrome = dynamic(() => import("./templates/Monochrome"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const Aether = dynamic(() => import("./templates/Aether"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const Executive = dynamic(() => import("./templates/Executive"), {
  ssr: false,
  loading: () => <TemplateSkeleton />,
});
const AtsMinimal = dynamic(() => import("./templates/AtsMinimal"), { ssr: false, loading: () => <TemplateSkeleton /> });
const CorporateClassic = dynamic(() => import("./templates/CorporateClassic"), { ssr: false, loading: () => <TemplateSkeleton /> });
const CreativeClean = dynamic(() => import("./templates/CreativeClean"), { ssr: false, loading: () => <TemplateSkeleton /> });
const AcademicCv = dynamic(() => import("./templates/AcademicCv"), { ssr: false, loading: () => <TemplateSkeleton /> });
const TwoColumnModern = dynamic(() => import("./templates/TwoColumnModern"), { ssr: false, loading: () => <TemplateSkeleton /> });
const GraduateStarter = dynamic(() => import("./templates/GraduateStarter"), { ssr: false, loading: () => <TemplateSkeleton /> });
const FinanceProfessional = dynamic(() => import("./templates/FinanceProfessional"), { ssr: false, loading: () => <TemplateSkeleton /> });
const MarketingCreative = dynamic(() => import("./templates/MarketingCreative"), { ssr: false, loading: () => <TemplateSkeleton /> });
const SimpleBw = dynamic(() => import("./templates/SimpleBw"), { ssr: false, loading: () => <TemplateSkeleton /> });
const StartupLeader = dynamic(() => import("./templates/StartupLeader"), { ssr: false, loading: () => <TemplateSkeleton /> });
const ElegantSerif = dynamic(() => import("./templates/ElegantSerif"), { ssr: false, loading: () => <TemplateSkeleton /> });

function TemplateSkeleton() {
  return (
    <div className="bg-white" style={{ width: "816px", minHeight: "1056px" }}>
      <div className="animate-pulse p-12">
        {/* Header skeleton */}
        <div className="h-8 bg-slate-200 rounded-full w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-slate-100 rounded-full w-1/2 mx-auto mb-12" />
        {/* Content lines */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-3 bg-slate-100 rounded-full mb-3" style={{ width: `${80 - (i % 3) * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  accentColor?: string;
}

// Memoized so it only re-renders when resumeData or accentColor changes,
// not on every parent state update (typing, zoom, etc.)
import { useDeferredValue } from "react";

const LivePreview = memo(function LivePreview({ accentColor }: Props) {
  const { resumeData } = useResumeStore();
  const deferredResumeData = useDeferredValue(resumeData);
  
  const color = accentColor ?? deferredResumeData.accentColor ?? "#0f172a"; // dark slate default

  const renderTemplate = () => {
    switch (deferredResumeData.templateId) {
      case "monochrome":
        return <Monochrome resumeData={deferredResumeData} accentColor="#000000" />;
      case "aether":
        return <Aether resumeData={deferredResumeData} accentColor={color} />;
      case "executive":
        return <Executive resumeData={deferredResumeData} accentColor={color} />;
      case "modern":
        return <ModernProfessional resumeData={deferredResumeData} />;
      case "developer":
        return <Developer resumeData={deferredResumeData} />;
      case "ats-minimal":
        return <AtsMinimal resumeData={deferredResumeData} accentColor="#000000" />;
      case "corporate":
        return <CorporateClassic resumeData={deferredResumeData} accentColor={color} />;
      case "creative-clean":
        return <CreativeClean resumeData={deferredResumeData} accentColor={color} />;
      case "academic":
        return <AcademicCv resumeData={deferredResumeData} accentColor={color} />;
      case "two-column":
        return <TwoColumnModern resumeData={deferredResumeData} accentColor={color} />;
      case "graduate":
        return <GraduateStarter resumeData={deferredResumeData} accentColor={color} />;
      case "finance":
        return <FinanceProfessional resumeData={deferredResumeData} accentColor={color} />;
      case "marketing":
        return <MarketingCreative resumeData={deferredResumeData} accentColor={color} />;
      case "simple-bw":
        return <SimpleBw resumeData={deferredResumeData} accentColor="#000000" />;
      case "startup-leader":
        return <StartupLeader resumeData={deferredResumeData} accentColor={color} />;
      case "elegant-serif":
        return <ElegantSerif resumeData={deferredResumeData} accentColor="#000000" />;
      case "ats-classic":
      default:
        // ATS Classic is strictly black for best parsing and professional look
        return <AtsClassic resumeData={deferredResumeData} accentColor="#000000" />;
    }
  };

  return (
    <div className="bg-white" style={{ width: "816px", minHeight: "1056px" }}>
      {renderTemplate()}
    </div>
  );
});

export default LivePreview;
