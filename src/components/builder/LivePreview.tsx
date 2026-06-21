"use client";

import { useResumeStore } from "@/store/useResumeStore";
import AtsClassic from "./templates/AtsClassic";
import ModernProfessional from "./templates/ModernProfessional";
import Developer from "./templates/Developer";
import Monochrome from "./templates/Monochrome";
import Aether from "./templates/Aether";
import Executive from "./templates/Executive";

interface Props {
  accentColor?: string;
}

export default function LivePreview({ accentColor }: Props) {
  const { resumeData } = useResumeStore();

  // Use prop if provided, otherwise use store value
  const color = accentColor ?? resumeData.accentColor ?? "#0d9488";

  const renderTemplate = () => {
    switch (resumeData.templateId) {
      case "monochrome":
        return <Monochrome resumeData={resumeData} accentColor={color} />;
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
        return <AtsClassic resumeData={resumeData} accentColor={color} />;
    }
  };

  return (
    <div className="bg-white" style={{ width: "816px", minHeight: "1056px" }}>
      {renderTemplate()}
    </div>
  );
}
