"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { ResumeData } from "@/store/useResumeStore";

const AtsClassic = dynamic(() => import("./templates/AtsClassic"), { ssr: false, loading: () => <TemplateSkeleton /> });
const ModernProfessional = dynamic(() => import("./templates/ModernProfessional"), { ssr: false, loading: () => <TemplateSkeleton /> });
const Developer = dynamic(() => import("./templates/Developer"), { ssr: false, loading: () => <TemplateSkeleton /> });
const Monochrome = dynamic(() => import("./templates/Monochrome"), { ssr: false, loading: () => <TemplateSkeleton /> });
const Aether = dynamic(() => import("./templates/Aether"), { ssr: false, loading: () => <TemplateSkeleton /> });
const Executive = dynamic(() => import("./templates/Executive"), { ssr: false, loading: () => <TemplateSkeleton /> });

function TemplateSkeleton() {
  return (
    <div className="bg-white shadow-xl" style={{ width: "816px", minHeight: "1056px" }}>
      <div className="animate-pulse p-12">
        <div className="h-8 bg-slate-200 rounded-full w-2/3 mx-auto mb-4" />
        <div className="h-4 bg-slate-100 rounded-full w-1/2 mx-auto mb-12" />
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-3 bg-slate-100 rounded-full mb-3" style={{ width: `${80 - (i % 3) * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  resumeData: ResumeData;
  accentColor?: string;
}

const PublicPreview = memo(function PublicPreview({ resumeData, accentColor }: Props) {
  const color = accentColor ?? resumeData.accentColor ?? "#0f172a";

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
      case "ats-classic":
      default:
        return <AtsClassic resumeData={resumeData} accentColor="#000000" />;
    }
  };

  return (
    <div className="bg-white shadow-xl" style={{ width: "816px", minHeight: "1056px" }}>
      {renderTemplate()}
    </div>
  );
});

export default PublicPreview;
