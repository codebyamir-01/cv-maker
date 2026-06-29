import Link from "next/link";
import Image from "next/image";
import { FileText, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Career Blog — CV Maker",
  description: "Expert resume tips, career advice, and job search strategies from the CV Maker team.",
};

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
          <BlogGrid categories={CATEGORIES} posts={POSTS} featuredPost={FEATURED} />

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
