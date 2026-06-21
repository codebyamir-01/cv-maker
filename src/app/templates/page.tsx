import Link from "next/link";
import { FileText, Star, CheckCircle2, Sparkles, Download, Eye } from "lucide-react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import TemplateCard from "@/components/templates/TemplateCard";

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
    location: "New York, USA, 4759 Sunnydale Lane, Plano, TX 75071",
    linkedIn: "",
    github: "",
    portfolio: "",
    photo: ""
  },
  summary: "Human resources generalist with 8 years of experience in HR, including hiring and terminating, disciplining employees, and helping department managers improve employee performance. Worked with labor unions to negotiate compensation packages for workers.",
  experience: [
    {
      id: "1",
      jobTitle: "Human Resource Manager",
      company: "Jim's Widget Factory",
      location: "Plano, TX",
      startDate: "Apr 2019",
      endDate: "Current",
      currentlyWorking: true,
      description: "- Implement effective company policies to ensure that all practices comply with labor and employment regulations.\n- Increased employee retention rates by managing workplace satisfaction to an over 90% success rate by creating and maintaining a positive work environment."
    },
    {
      id: "2",
      jobTitle: "Workplace Culture & Compliance Specialist",
      company: "Acme Corp",
      location: "Dallas, TX",
      startDate: "Sep 2019",
      endDate: "Mar 2016",
      currentlyWorking: false,
      description: "- Ensured HR policies aligned with state and federal regulations, maintaining 100% compliance in audits.\n- Implemented a conflict resolution system, decreasing workplace disputes by 40%."
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
    { id: "2", name: "Platform expertise", category: "Technical" as const },
    { id: "3", name: "Analytics", category: "Technical" as const },
    { id: "4", name: "Communication", category: "Technical" as const }
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
    id: "executive", name: "Executive Leader", category: "Professional",
    accent: "#1e293b", popular: false, ats: true,
    desc: "Bold and authoritative design ideal for senior management roles.",
    tags: ["Executive", "Bold", "Leadership"]
  }
];

const CATEGORIES = ["All", "Professional", "Modern", "Tech"];

export default async function TemplatesPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">

      <Navbar session={session} />

      <main className="flex-1 pt-28 pb-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-16 text-center">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[80%] rounded-full bg-blue-100/50 blur-[120px]" />
            <div className="absolute bottom-0 right-[-5%] w-[30%] h-[60%] rounded-full bg-purple-100/40 blur-[100px]" />
          </div>
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" /> 15+ Professional Templates
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
              Resume <span className="text-blue-600">Templates</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
              Choose from 15+ professionally designed, ATS-optimised resume templates. All free, all customisable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: CheckCircle2, label: "100% Free",         color: "text-emerald-500" },
                { icon: CheckCircle2, label: "ATS Optimised",     color: "text-emerald-500" },
                { icon: CheckCircle2, label: "PDF Download",      color: "text-emerald-500" },
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
        <section className="container mx-auto px-6 max-w-7xl mt-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`rounded-full px-5 py-2 text-sm font-bold transition border
                  ${i === 0
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TEMPLATES.map(t => (
              <TemplateCard key={t.id} template={t} dummyData={DUMMY_DATA} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Ready to build your resume?</h2>
            <p className="text-slate-500 mb-7 max-w-xl mx-auto">Pick any template and start filling in your details. Your resume will be ready to download in minutes.</p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              <Sparkles className="h-5 w-5" /> Start Building — It's Free
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TemplatePreview({ template: t }: { template: any }) {
  const Component = t.component;
  const scale = 0.2; // 163px width / 816px original width

  return (
    <div className="w-[163px] h-[211px] bg-white rounded shadow-md border border-slate-200 overflow-hidden relative">
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <Component resumeData={DUMMY_DATA} accentColor={t.accent} />
      </div>
    </div>
  );
}
