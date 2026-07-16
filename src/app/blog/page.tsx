import Link from "next/link";
import Image from "next/image";
import { FileText, Clock, ArrowRight, Tag, TrendingUp, BookOpen, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BLOG_POSTS } from "@/lib/blog-data";
import BlogGrid from "@/components/blog/BlogGrid";
import NewsletterSection from "@/components/blog/NewsletterSection";

export const metadata: Metadata = {
  title: "Career Blog | Smart Resume Maker",
  description: "Expert resume tips, ATS guides, career advice, and job search strategies from the Smart Resume Maker team.",
  alternates: {
    canonical: "https://www.smartresumemaker.com/blog",
  },
};

// Sort newest first so latest posts always appear at top
const SORTED_POSTS = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
const FEATURED = SORTED_POSTS[0];
const POSTS = SORTED_POSTS.slice(1);

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
          <NewsletterSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
