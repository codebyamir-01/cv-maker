import Link from "next/link";
import { LayoutTemplate, ArrowRight } from "lucide-react";

// This is a pure server component — no JS sent to client for static content
export default function TemplatesSection() {
  return (
    <section id="templates" className="py-32 bg-[#1e293b] relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold tracking-widest uppercase mb-8">
            <LayoutTemplate className="w-3.5 h-3.5" />
            Curated Designs
          </div>
          <h2 className="text-4xl md:text-[3.5rem] font-bold text-white mb-6 leading-tight tracking-tight">
            Templates That <span className="text-blue-300">Get You Hired</span>
          </h2>
          <p className="text-xl text-slate-400 font-medium">
            Professionally designed, ATS-friendly resume and CV templates trusted by thousands of job seekers.
          </p>
        </div>

        {/* Template Mockups Grid */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          {/* Template 1 – Classic */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative rounded-2xl bg-slate-50 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 aspect-[8.5/11]">
              <div className="w-full h-8 bg-slate-200 border-b border-slate-300 flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="p-6 md:p-8 bg-white h-full relative">
                <h3 className="text-2xl md:text-3xl font-serif text-center text-slate-900 uppercase tracking-[0.15em] mb-1">Patricia Henderson</h3>
                <p className="text-center text-[10px] md:text-xs text-slate-600 mb-4 pb-4 border-b border-slate-300">
                  patricia@email.com | (312) 555-0192 | Chicago, USA | linkedin.com/in/patricia
                </p>

                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">Professional Summary</h4>
                  <p className="text-[9px] md:text-[10px] text-slate-700 leading-relaxed">
                    Results-driven Senior Financial Analyst with over 8 years of experience in corporate finance, financial modeling, and strategic planning. Proven track record of improving operational efficiency by 15% and managing $50M+ budgets.
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">Experience</h4>
                  <div className="mb-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[10px] md:text-xs font-bold text-slate-900">Senior Financial Analyst</span>
                      <span className="text-[9px] text-slate-500">2021 - Present</span>
                    </div>
                    <div className="text-[9px] font-medium text-slate-600 italic mb-1.5">Goldman Sachs | Chicago, IL</div>
                    <ul className="list-disc list-inside text-[9px] md:text-[10px] text-slate-700 space-y-1 ml-1">
                      <li>Developed dynamic financial models to forecast quarterly revenue, reducing variance by 12%.</li>
                      <li>Partnered with executive leadership to identify $2.5M in cost-saving opportunities.</li>
                      <li>Automated monthly reporting dashboards using Python and Tableau.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="text-[10px] md:text-xs font-bold text-slate-900">Financial Analyst</span>
                      <span className="text-[9px] text-slate-500">2018 - 2021</span>
                    </div>
                    <div className="text-[9px] font-medium text-slate-600 italic mb-1.5">Deloitte | New York, NY</div>
                    <ul className="list-disc list-inside text-[9px] md:text-[10px] text-slate-700 space-y-1 ml-1">
                      <li>Conducted variance analysis and reconciled multi-million dollar accounts.</li>
                      <li>Assisted in M&A due diligence for a $150M tech acquisition.</li>
                    </ul>
                  </div>
                </div>
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>
          </div>

          {/* Template 2 – Modern Sidebar */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
            <div className="relative rounded-2xl bg-white overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 aspect-[8.5/11] flex">

              {/* Sidebar */}
              <div className="w-[35%] bg-slate-900 text-white p-5 border-r border-slate-200">
                {/* Avatar placeholder – no external request */}
                <div className="w-16 h-16 rounded-full bg-slate-700 mb-4 mx-auto border-2 border-blue-400/30 flex items-center justify-center text-slate-500 text-2xl font-bold">
                  AM
                </div>

                <div className="mb-6 text-center">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">Contact</h4>
                  <p className="text-[9px] text-slate-300 mb-1">hello@alex.dev</p>
                  <p className="text-[9px] text-slate-300 mb-1">+1 (555) 123-4567</p>
                  <p className="text-[9px] text-slate-300">San Francisco, CA</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {["React", "TypeScript", "Node.js", "Next.js", "AWS", "GraphQL"].map((s) => (
                      <span key={s} className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main */}
              <div className="w-[65%] p-6 bg-[#f8fafc] relative">
                <h3 className="text-2xl font-bold text-slate-800 mb-0.5">Alex Morgan</h3>
                <p className="text-xs font-bold text-blue-600 mb-4">Senior Full Stack Developer</p>

                <p className="text-[9px] text-slate-600 mb-6 leading-relaxed">
                  Passionate software engineer with 6+ years of experience building scalable web applications. Specialized in React ecosystem and cloud architecture.
                </p>

                <div className="mb-5">
                  <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-3">Experience</h4>

                  <div className="mb-3 relative pl-3 border-l-2 border-blue-200">
                    <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-[5px] top-1" />
                    <h5 className="text-[10px] font-bold text-slate-800">Tech Lead</h5>
                    <p className="text-[8px] text-slate-500 mb-1">Stripe | 2022 - Present</p>
                    <p className="text-[9px] text-slate-600 leading-relaxed">Led a team of 5 engineers to migrate the legacy dashboard to Next.js, improving page load speeds by 40%.</p>
                  </div>

                  <div className="relative pl-3 border-l-2 border-blue-200">
                    <div className="absolute w-2 h-2 bg-blue-400 rounded-full -left-[5px] top-1" />
                    <h5 className="text-[10px] font-bold text-slate-800">Frontend Engineer</h5>
                    <p className="text-[8px] text-slate-500 mb-1">Airbnb | 2019 - 2022</p>
                    <p className="text-[9px] text-slate-600 leading-relaxed">Developed reusable UI components for the core booking flow and increased test coverage to 85%.</p>
                  </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#f8fafc] to-transparent" />
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 text-white px-8 py-4 text-sm font-bold backdrop-blur-sm hover:bg-white/20 transition-all hover:scale-[1.03]"
          >
            Browse All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
