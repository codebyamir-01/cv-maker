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
  {
    id: "ats-minimal",
    name: "ATS Minimal",
    description: "Ultra-clean, single-column layout strictly optimized for ATS parsing.",
    previewColor: "bg-white border-2 border-slate-100",
  },
  {
    id: "corporate",
    name: "Corporate Classic",
    description: "A formal, traditional serif template with a classic structure.",
    previewColor: "bg-slate-50 border-t-4 border-slate-800",
  },
  {
    id: "creative-clean",
    name: "Creative Clean",
    description: "Generous whitespace, unique modern typography for creative roles.",
    previewColor: "bg-pink-50 border-l-8 border-pink-500",
  },
  {
    id: "academic",
    name: "Academic CV",
    description: "A traditional academic CV prioritizing Education and Publications.",
    previewColor: "bg-slate-50",
  },
  {
    id: "two-column",
    name: "Two Column Modern",
    description: "A clean 30/70 split layout separating contact/skills and experience.",
    previewColor: "bg-blue-600 text-white",
  },
  {
    id: "graduate",
    name: "Graduate Starter",
    description: "Designed for entry-level candidates, highlighting Education and Projects.",
    previewColor: "bg-emerald-50 border-l-4 border-emerald-500",
  },
  {
    id: "finance",
    name: "Finance Professional",
    description: "Strict, data-focused layout with neat columns.",
    previewColor: "bg-white border-t-2 border-blue-900",
  },
  {
    id: "marketing",
    name: "Marketing Creative",
    description: "Bold accents and a layout that highlights portfolio links.",
    previewColor: "bg-rose-500 text-white",
  },
  {
    id: "simple-bw",
    name: "Simple B&W",
    description: "High-contrast black and white template focusing purely on readability.",
    previewColor: "bg-white border-4 border-black",
  },
  {
    id: "startup-leader",
    name: "Startup Leader",
    description: "Modern Enhancv-style executive template with dotted timeline features.",
    previewColor: "bg-gray-50 border-t-8 border-gray-900",
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
