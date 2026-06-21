import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, LayoutTemplate, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default async function LandingPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-200">
      
      <Navbar session={session} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] bg-[#020617]">
          {/* Subtle gradient mesh background for dark theme */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/20 blur-[120px]"></div>
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-900/20 blur-[100px]"></div>
            
            {/* Grid overlay for tech feel */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CgkJPHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwaDIwdjIwSDIwdi0yMHptLTIwIDBoMjB2MjBIMHYtMjB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPgoJPC9zdmc+')] opacity-20 mask-image-linear-gradient"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl flex flex-col items-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-700 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-300 text-sm font-medium mb-10 tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="opacity-90">The Ultimate Resume Builder</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-[3.5rem] md:text-[6rem] font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Professional CV</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-[1.1rem] md:text-[1.35rem] text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Create an ATS-friendly resume in minutes. Use our premium templates and smart tools to build a CV that commands attention and secures interviews.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 h-14 text-[1rem] font-semibold shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.03] border border-blue-500 hover:border-blue-400">
                  Start Building <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-full px-10 h-14 text-[1rem] font-semibold transition-all hover:text-white">
                  View Templates
                </Button>
              </Link>
            </div>
            
            {/* Social Proof metrics */}
            <div className="mt-16 pt-10 border-t border-slate-800/60 w-full max-w-3xl flex items-center justify-between gap-4 text-slate-400">
               <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">98%</div>
                  <div className="text-xs uppercase tracking-widest font-semibold opacity-70">ATS Pass Rate</div>
               </div>
               <div className="w-px h-10 bg-slate-800/60"></div>
               <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">10k+</div>
                  <div className="text-xs uppercase tracking-widest font-semibold opacity-70">Careers Upgraded</div>
               </div>
               <div className="w-px h-10 bg-slate-800/60"></div>
               <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Free</div>
                  <div className="text-xs uppercase tracking-widest font-semibold opacity-70">Premium Access</div>
               </div>
            </div>
          </div>
        </section>

        {/* Dark Templates Section */}
        <section id="templates" className="py-32 bg-[#1e293b] relative overflow-hidden">
          {/* Subtle glow in dark mode */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-64 bg-blue-500/10 blur-[100px] pointer-events-none"></div>
          
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
              
              {/* Template 1 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative rounded-2xl bg-slate-50 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 aspect-[8.5/11]">
                  <div className="w-full h-8 bg-slate-200 border-b border-slate-300 flex items-center px-4 gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                     <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-6 md:p-8 bg-white h-full relative">
                    <h3 className="text-2xl md:text-3xl font-serif text-center text-slate-900 uppercase tracking-[0.15em] mb-1">Patricia Henderson</h3>
                    <p className="text-center text-[10px] md:text-xs text-slate-600 mb-4 pb-4 border-b border-slate-300">patricia@email.com | (312) 555-0192 | Chicago, USA | linkedin.com/in/patricia</p>
                    
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
                    
                    {/* Bottom fade out to show it's a preview */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Template 2 */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative rounded-2xl bg-white overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 aspect-[8.5/11] flex">
                  
                  {/* Sidebar */}
                  <div className="w-[35%] bg-slate-900 text-white p-5 border-r border-slate-200">
                     <div className="w-16 h-16 rounded-full bg-slate-700 mb-4 mx-auto border-2 border-blue-400/30 overflow-hidden">
                       <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex&backgroundColor=transparent" alt="Profile" className="w-full h-full object-cover" />
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
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">React</span>
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">TypeScript</span>
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">Node.js</span>
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">Next.js</span>
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">AWS</span>
                         <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-[8px] rounded">GraphQL</span>
                       </div>
                     </div>
                  </div>

                  {/* Main */}
                  <div className="w-[65%] p-6 bg-[#f8fafc] relative">
                    <h3 className="text-2xl font-bold text-slate-800 mb-0.5">Alex Morgan</h3>
                    <p className="text-xs font-bold text-blue-600 mb-4">Senior Full Stack Developer</p>
                    
                    <p className="text-[9px] text-slate-600 mb-6 leading-relaxed">
                      Passionate software engineer with 6+ years of experience building scalable web applications. Specialized in React ecosystem and cloud architecture. Dedicated to writing clean, maintainable code and mentoring junior developers.
                    </p>

                    <div className="mb-5">
                      <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-4 h-4 rounded-sm bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">💼</span> 
                        Experience
                      </h4>
                      
                      <div className="mb-3 relative pl-3 border-l-2 border-blue-200">
                        <div className="absolute w-2 h-2 bg-blue-600 rounded-full -left-[5px] top-1"></div>
                        <h5 className="text-[10px] font-bold text-slate-800">Tech Lead</h5>
                        <p className="text-[8px] text-slate-500 mb-1">Stripe | 2022 - Present</p>
                        <p className="text-[9px] text-slate-600 leading-relaxed">Led a team of 5 engineers to migrate the legacy dashboard to Next.js, improving page load speeds by 40%.</p>
                      </div>

                      <div className="relative pl-3 border-l-2 border-blue-200">
                        <div className="absolute w-2 h-2 bg-blue-400 rounded-full -left-[5px] top-1"></div>
                        <h5 className="text-[10px] font-bold text-slate-800">Frontend Engineer</h5>
                        <p className="text-[8px] text-slate-500 mb-1">Airbnb | 2019 - 2022</p>
                        <p className="text-[9px] text-slate-600 leading-relaxed">Developed reusable UI components for the core booking flow. Integrated GraphQL APIs and increased test coverage to 85%.</p>
                      </div>
                    </div>
                    
                    {/* Bottom fade out to show it's a preview */}
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
