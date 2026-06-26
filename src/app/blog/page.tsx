import Link from "next/link";
import { FileText, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Career Blog — CV Maker",
  description: "Expert resume tips, career advice, and job search strategies from the CV Maker team.",
};

import { BLOG_POSTS } from "@/lib/blog-data";

const FEATURED = BLOG_POSTS[0];
const POSTS = BLOG_POSTS.slice(1);

const CATEGORIES = ["All", "ATS Tips", "Writing Tips", "Resume Advice", "Tech Careers", "Job Search", "Career Tips"];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">

      <Navbar />

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
