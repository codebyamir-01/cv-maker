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
const LivePreview = memo(function LivePreview({ accentColor }: Props) {
  const { resumeData } = useResumeStore();
  const color = accentColor ?? resumeData.accentColor ?? "#0f172a"; // dark slate default

  const renderTemplate = () => {
    switch (resumeData.templateId) {
      case "monochrome":
        return <Monochrome resumeData={resumeData} accentColor="#000000" />;
      case "aether":
        return <Aether resumeData={resumeData} accentColor={color} />;
      case "executive":
        return <Executive resumeData={resumeData} accentColor={color} />;
      case "modern":
        return <ModernProfessional resumeData={resumeData} />;
      case "developer":
        return <Developer resumeData={resumeData} />;
      case "ats-minimal":
        return <AtsMinimal resumeData={resumeData} accentColor="#000000" />;
      case "corporate":
        return <CorporateClassic resumeData={resumeData} accentColor={color} />;
      case "creative-clean":
        return <CreativeClean resumeData={resumeData} accentColor={color} />;
      case "academic":
        return <AcademicCv resumeData={resumeData} accentColor={color} />;
      case "two-column":
        return <TwoColumnModern resumeData={resumeData} accentColor={color} />;
      case "graduate":
        return <GraduateStarter resumeData={resumeData} accentColor={color} />;
      case "finance":
        return <FinanceProfessional resumeData={resumeData} accentColor={color} />;
      case "marketing":
        return <MarketingCreative resumeData={resumeData} accentColor={color} />;
      case "simple-bw":
        return <SimpleBw resumeData={resumeData} accentColor="#000000" />;
      case "startup-leader":
        return <StartupLeader resumeData={resumeData} accentColor={color} />;
      case "elegant-serif":
        return <ElegantSerif resumeData={resumeData} accentColor="#000000" />;
      case "ats-classic":
      default:
        // ATS Classic is strictly black for best parsing and professional look
        return <AtsClassic resumeData={resumeData} accentColor="#000000" />;
    }
  };

  return (
    <div className="bg-white" style={{ width: "816px", minHeight: "1056px" }}>
      {renderTemplate()}
    </div>
  );
});

export default LivePreview;
