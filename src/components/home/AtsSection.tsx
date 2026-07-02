import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AtsSection() {
  return (
    <section className="py-24 px-4 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">What is an ATS and why does it matter?</h2>
          <p className="text-slate-300 text-lg mb-6 leading-relaxed">
            Many modern employers use an <strong>Applicant Tracking System (ATS)</strong> to filter resumes before a human ever sees them. If your resume is not formatted correctly, the robot will reject it.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <span className="text-slate-300"><strong>Simple formatting:</strong> No confusing tables or columns that break parsers.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <span className="text-slate-300"><strong>Standard headings:</strong> Work Experience instead of My Journey.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <span className="text-slate-300"><strong>Machine-readable fonts:</strong> Clean, standard typography.</span>
            </li>
          </ul>
          <Link href="/ats-resume-builder">
            <Button variant="outline" className="text-slate-900 bg-white hover:bg-slate-100 border-none rounded-full px-8 h-12">
              Learn more about ATS Resumes
            </Button>
          </Link>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur-2xl opacity-20" />
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-3xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
              <div className="font-bold text-xl">Resume Score</div>
              <div className="text-3xl font-extrabold text-emerald-400">95%</div>
            </div>
            <div className="space-y-4">
              {["Contact Info", "Professional Summary", "Experience Formatting", "Keyword Density"].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span className="text-slate-400">{item}</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}