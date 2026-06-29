import Link from "next/link";
import { FileText, Star, CheckCircle2, Sparkles, Download, Eye } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import TemplateCard from "@/components/templates/TemplateCard";
import TemplatesGrid from "@/components/templates/TemplatesGrid";

export const metadata: Metadata = {
  title: "Resume Templates — CV Maker",
  description: "Browse professional, ATS-friendly resume templates.",
};

const DUMMY_DATA = {
  personalInfo: {
    fullName: "Jessie Smith",
    jobTitle: "Human Resource Manager",
    email: "email@youremail.com",
    phone: "(465) 385-2948",
    location: "New York, USA",
    linkedIn: "",
    github: "",
    portfolio: "",
    photo: "/images/user-profile.jpg"
  },
  summary: "Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees, and helping department managers improve employee performance.",
  experience: [
    {
      id: "1",
      jobTitle: "Human Resource Manager",
      company: "Jim's Widget Factory",
      location: "Plano, TX",
      startDate: "Apr 2019",
      endDate: "Current",
      currentlyWorking: true,
      description: "- Implement effective company policies\n- Increased employee retention rates"
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master, Human Resources",
      institution: "The University of Texas",
      location: "Dallas",
      startYear: "Sep 2007",
      endYear: "May 2011",
      grade: ""
    }
  ],
  skills: [
    { id: "1", name: "Detail-oriented", category: "Technical" as const },
    { id: "2", name: "Platform expertise", category: "Technical" as const }
  ],
  projects: [],
  templateId: "monochrome",
  accentColor: "#000000"
};

const TEMPLATES = [
  {
    id: "monochrome", name: "Monochrome", category: "Professional",
    accent: "#1f2937", popular: true, ats: true,
    desc: "The classic Harvard-style serif layout perfectly matched for traditional ATS tracking.",
    tags: ["Classic", "Serif", "Single-column"]
  },
  {
    id: "ats-classic", name: "Classic ATS-Friendly", category: "Professional",
    accent: "#0d9488", popular: false, ats: true,
    desc: "Clean, single-column layout optimised for Applicant Tracking Systems.",
    tags: ["ATS", "Clean", "Single-column"]
  },
  {
    id: "aether", name: "Aether Modern", category: "Modern",
    accent: "#0f172a", popular: true, ats: true,
    desc: "Elegant 2-column layout with a sleek dark sidebar, perfect for tech and creative roles.",
    tags: ["Modern", "Dark Sidebar", "Clean"]
  },
  {
    id: "modern", name: "Modern Professional", category: "Modern",
    accent: "#3b82f6", popular: false, ats: true,
    desc: "Contemporary two-tone design with subtle accent colours and icons.",
    tags: ["Modern", "Icons", "Two-column"]
  },
  {
    id: "developer", name: "Developer Portfolio", category: "Tech",
    accent: "#7c3aed", popular: false, ats: true,
    desc: "Built for software engineers — highlights tech stack and GitHub links.",
    tags: ["Tech", "GitHub", "Skills-first"]
  },
  {
    id: "executive", name: "Executive Leader", category: "Executive",
    accent: "#1e293b", popular: false, ats: true,
    desc: "Bold and authoritative design ideal for senior management roles.",
    tags: ["Executive", "Bold", "Leadership"]
  },
  {
    id: "ats-minimal", name: "ATS Minimal", category: "Professional",
    accent: "#000000", popular: false, ats: true,
    desc: "Ultra-clean, single-column layout strictly optimized for ATS parsing.",
    tags: ["ATS", "Minimal", "Text-only"]
  },
  {
    id: "corporate", name: "Corporate Classic", category: "Professional",
    accent: "#1e293b", popular: false, ats: true,
    desc: "A formal, traditional serif template with a classic structure.",
    tags: ["Corporate", "Serif", "Formal"]
  },
  {
    id: "creative-clean", name: "Creative Clean", category: "Creative",
    accent: "#ec4899", popular: true, ats: false,
    desc: "Generous whitespace, unique modern typography for creative roles.",
    tags: ["Creative", "Modern", "Colorful"]
  },
  {
    id: "academic", name: "Academic CV", category: "Professional",
    accent: "#0f172a", popular: false, ats: true,
    desc: "A traditional academic CV prioritizing Education and Publications.",
    tags: ["Academic", "CV", "Research"]
  },
  {
    id: "two-column", name: "Two Column Modern", category: "Modern",
    accent: "#2563eb", popular: false, ats: false,
    desc: "A clean 30/70 split layout separating contact/skills and experience.",
    tags: ["Two-column", "Clean", "Professional"]
  },
  {
    id: "graduate", name: "Graduate Starter", category: "Student",
    accent: "#10b981", popular: true, ats: true,
    desc: "Designed for entry-level candidates, highlighting Education and Projects.",
    tags: ["Student", "Entry-level", "Education-first"]
  },
  {
    id: "finance", name: "Finance Professional", category: "Professional",
    accent: "#1e3a8a", popular: false, ats: true,
    desc: "Strict, data-focused layout with neat columns.",
    tags: ["Finance", "Banking", "Conservative"]
  },
  {
    id: "marketing", name: "Marketing Creative", category: "Creative",
    accent: "#f43f5e", popular: false, ats: false,
    desc: "Bold accents and a layout that highlights portfolio links.",
    tags: ["Marketing", "Bold", "Portfolio"]
  },
  {
    id: "simple-bw", name: "Simple B&W", category: "Professional",
    accent: "#000000", popular: false, ats: true,
    desc: "High-contrast black and white template focusing purely on readability.",
    tags: ["Minimal", "B&W", "Clean"]
  },
  {
    id: "startup-leader", name: "Startup Leader", category: "Modern",
    accent: "#111827", popular: true, ats: true,
    desc: "Modern Enhancv-style executive template with dotted timeline features.",
    tags: ["Startup", "Executive", "Timeline"]
  },
  {
    id: "elegant-serif", name: "Elegant Serif", category: "Professional",
    accent: "#000000", popular: false, ats: true,
    desc: "A clean, pure serif layout with bold headings and classic structural lines.",
    tags: ["Serif", "Classic", "Clean"]
  }
];

const CATEGORIES = ["All", "Professional", "Modern", "Tech", "Creative", "Student", "Executive"];

export default function DashboardTemplatesPage() {
  return (
    <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
      <main className="p-8">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-8 mb-8 bg-white rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[80%] rounded-full bg-blue-100/50 blur-[120px]" />
            <div className="absolute bottom-0 right-[-5%] w-[30%] h-[60%] rounded-full bg-purple-100/40 blur-[100px]" />
          </div>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> 15+ Professional Templates
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
              Resume <span className="text-blue-600">Templates</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
              Choose from professionally designed, ATS-optimised resume templates.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: CheckCircle2, label: "100% Free",         color: "text-emerald-500" },
                { icon: CheckCircle2, label: "ATS Optimised",     color: "text-emerald-500" },
                { icon: CheckCircle2, label: "Instant Preview",   color: "text-emerald-500" },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                    <Icon className={`h-4 w-4 ${item.color}`} /> {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FILTER TABS ── */}
        <section className="container mx-auto max-w-7xl">
          <TemplatesGrid categories={CATEGORIES} templates={TEMPLATES} dummyData={DUMMY_DATA} />

          {/* CTA */}
          <div className="mt-16 text-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Ready to build your resume?</h2>
            <p className="text-slate-500 mb-7 max-w-xl mx-auto">Pick any template and start filling in your details. Your resume will be ready to download in minutes.</p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              <Sparkles className="h-5 w-5" /> Start Building
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
