import Link from "next/link";
import { FileText, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Career Blog — CV Maker",
  description: "Expert resume tips, career advice, and job search strategies from the CV Maker team.",
};

const FEATURED = {
  id: 1,
  title: "How to Write an ATS-Friendly Resume in 2026",
  excerpt: "Applicant Tracking Systems reject over 75% of resumes before a human ever sees them. Learn exactly how ATS software scans your resume and how to format yours to pass every filter.",
  category: "ATS Tips",
  categoryColor: "bg-emerald-100 text-emerald-700",
  readTime: "8 min read",
  date: "Jun 18, 2026",
  slug: "ats-friendly-resume-2026",
};

const POSTS = [
  {
    id: 2, title: "10 Resume Action Verbs That Get You Hired", excerpt: "Replace weak filler words with powerful action verbs that immediately signal impact to recruiters.",
    category: "Writing Tips", categoryColor: "bg-blue-100 text-blue-700", readTime: "5 min read", date: "Jun 15, 2026", slug: "resume-action-verbs",
  },
  {
    id: 3, title: "One Page vs. Two Page Resume: What Recruiters Actually Want", excerpt: "The eternal debate settled. We interviewed 50 HR professionals to find out the truth.",
    category: "Resume Advice", categoryColor: "bg-purple-100 text-purple-700", readTime: "6 min read", date: "Jun 12, 2026", slug: "one-vs-two-page-resume",
  },
  {
    id: 4, title: "How to Write a Professional Summary That Gets Noticed", excerpt: "Your summary is the first thing recruiters read. Make it count with these proven templates and examples.",
    category: "Writing Tips", categoryColor: "bg-blue-100 text-blue-700", readTime: "7 min read", date: "Jun 10, 2026", slug: "professional-summary-guide",
  },
  {
    id: 5, title: "The Best Resume Format for Software Engineers in 2026", excerpt: "Tech hiring has changed. Here's how to structure your engineering resume to stand out at top companies.",
    category: "Tech Careers", categoryColor: "bg-violet-100 text-violet-700", readTime: "9 min read", date: "Jun 8, 2026", slug: "software-engineer-resume-format",
  },
  {
    id: 6, title: "How to List Skills on a Resume (With Examples)", excerpt: "Don't just dump a list of buzzwords. Learn how to strategically present skills that match job descriptions.",
    category: "Resume Advice", categoryColor: "bg-purple-100 text-purple-700", readTime: "5 min read", date: "Jun 5, 2026", slug: "how-to-list-skills-resume",
  },
  {
    id: 7, title: "Cover Letter vs. Resume: What's the Difference?", excerpt: "Many candidates confuse these two documents. Here's what each one should contain and when you need both.",
    category: "Job Search", categoryColor: "bg-orange-100 text-orange-700", readTime: "4 min read", date: "Jun 2, 2026", slug: "cover-letter-vs-resume",
  },
  {
    id: 8, title: "How to Explain Employment Gaps on Your Resume", excerpt: "Career gaps are common after COVID-19. Here's how to address them honestly without hurting your chances.",
    category: "Career Tips", categoryColor: "bg-pink-100 text-pink-700", readTime: "6 min read", date: "May 30, 2026", slug: "explain-employment-gaps",
  },
  {
    id: 9, title: "LinkedIn Profile vs. Resume: Key Differences", excerpt: "Your LinkedIn isn't just a digital copy of your resume. Learn how to optimise both for maximum impact.",
    category: "Job Search", categoryColor: "bg-orange-100 text-orange-700", readTime: "5 min read", date: "May 28, 2026", slug: "linkedin-vs-resume",
  },
  {
    id: 10, title: "Resume Tips for Fresh Graduates With No Experience", excerpt: "Everyone starts somewhere. Here's how to build a competitive resume even if you have zero work history.",
    category: "Career Tips", categoryColor: "bg-pink-100 text-pink-700", readTime: "7 min read", date: "May 25, 2026", slug: "fresh-graduate-resume-tips",
  },
];

const CATEGORIES = ["All", "ATS Tips", "Writing Tips", "Resume Advice", "Tech Careers", "Job Search", "Career Tips"];

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">

      <Navbar session={session} />

      <main className="flex-1 pt-28 pb-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-16 text-center">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-[-10%] right-[-5%] w-[35%] h-[80%] rounded-full bg-indigo-100/50 blur-[120px]" />
            <div className="absolute bottom-0 left-[-5%] w-[30%] h-[60%] rounded-full bg-blue-100/40 blur-[100px]" />
          </div>
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-sm font-semibold mb-6">
              <BookOpen className="w-4 h-4" /> Career Tips & Resume Advice
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
              Career <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Expert guides, resume writing tips, and job search strategies to help you land your dream job faster.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-7xl">

          {/* ── FILTER TABS ── */}
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

          {/* ── FEATURED POST ── */}
          <div className="mb-10">
            <div className="group relative rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: colourful illustration area */}
                <div className="relative h-56 lg:h-auto bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center p-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/60 to-teal-700/80" />
                  <div className="relative z-10 text-white text-center">
                    <TrendingUp className="h-16 w-16 mx-auto mb-4 opacity-90" />
                    <p className="text-lg font-bold opacity-80">Featured Article</p>
                  </div>
                  <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white border border-white/30">
                    <Sparkles className="h-3 w-3" /> Must Read
                  </span>
                </div>

                {/* Right: content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${FEATURED.categoryColor}`}>
                      {FEATURED.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="h-3 w-3" /> {FEATURED.readTime}
                    </span>
                    <span className="text-xs text-slate-400">{FEATURED.date}</span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {FEATURED.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 text-sm lg:text-base">
                    {FEATURED.excerpt}
                  </p>
                  <Link
                    href={`/blog/${FEATURED.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
                  >
                    Read Full Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── POSTS GRID ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map(post => (
              <article key={post.id} className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5">
                {/* Colour header strip */}
                <div
                  className="h-2 w-full"
                  style={{
                    background: post.categoryColor.includes("blue") ? "#3b82f6" :
                      post.categoryColor.includes("purple") ? "#7c3aed" :
                      post.categoryColor.includes("violet") ? "#8b5cf6" :
                      post.categoryColor.includes("orange") ? "#f97316" :
                      post.categoryColor.includes("pink") ? "#ec4899" : "#64748b"
                  }}
                />

                <div className="flex flex-col flex-1 p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${post.categoryColor}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="h-3 w-3" /> {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors flex-1">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-[11px] text-slate-400 font-medium">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ── NEWSLETTER CTA ── */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 mb-5">
              <Tag className="h-4 w-4" /> Weekly Career Tips
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Get Resume Tips in Your Inbox</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join 10,000+ job seekers who get our weekly resume tips, ATS updates, and hiring insights — free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-400 focus:bg-white/20 transition"
              />
              <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-500 transition whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">No spam. Unsubscribe anytime.</p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
