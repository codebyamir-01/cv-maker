"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const templates = [
  {
    id: "monochrome",
    name: "Monochrome",
    description: "The classic Harvard-style serif layout perfectly matched for traditional ATS tracking.",
    previewColor: "bg-slate-50 border-t-4 border-slate-800",
  },
  {
    id: "ats-classic",
    name: "ATS Classic",
    description: "A clean, single-column, highly readable template optimized for Applicant Tracking Systems.",
    previewColor: "bg-slate-100",
  },
  {
    id: "aether",
    name: "Aether Modern",
    description: "Elegant 2-column layout with a sleek dark sidebar, perfect for tech and creative roles.",
    previewColor: "bg-slate-900 text-white",
  },
  {
    id: "modern",
    name: "Modern Professional",
    description: "A sleek, two-column layout with a sidebar for contact info. Great for business roles.",
    previewColor: "bg-blue-50",
  },
  {
    id: "developer",
    name: "Developer",
    description: "A tech-focused template that highlights GitHub and emphasizes technical skills.",
    previewColor: "bg-slate-900 text-white",
  },
  {
    id: "executive",
    name: "Executive Leader",
    description: "Bold and authoritative design ideal for senior management roles.",
    previewColor: "bg-slate-200 border-t-8 border-slate-800",
  },
];

export default function TemplateSelector() {
  const { resumeData, updateTemplateId } = useResumeStore();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Choose a Template</h2>
        <p className="text-slate-500 mt-1">Select a design for your resume. You can change this at any time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const isActive = resumeData.templateId === template.id;

          return (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isActive ? "ring-2 ring-blue-600 border-transparent shadow-md" : "hover:border-blue-300"
              }`}
              onClick={() => updateTemplateId(template.id)}
            >
              <div className={`h-32 w-full rounded-t-xl ${template.previewColor} flex items-center justify-center border-b`}>
                <span className="opacity-50 font-medium">Preview</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  {template.name}
                  {isActive && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{template.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
