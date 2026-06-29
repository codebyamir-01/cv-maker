"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { BlogPost } from "@/lib/blog-types";

interface BlogGridProps {
  categories: string[];
  posts: BlogPost[];
  featuredPost: BlogPost;
}

export default function BlogGrid({ categories, posts, featuredPost }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All"
    ? posts
    : [featuredPost, ...posts].filter(p => p.category === activeCategory);

  return (
    <>
      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition border
              ${activeCategory === cat
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED POST (Only show on "All" tab) */}
      {activeCategory === "All" && (
        <div className="mb-10">
          <Link href={`/blog/${featuredPost.slug}`} className="group relative block rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto bg-slate-100 overflow-hidden">
                <Image 
                  src={featuredPost.bannerImage}
                  alt={featuredPost.bannerAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-slate-900 border border-white/30 shadow-sm">
                  <Sparkles className="h-3 w-3 text-yellow-500" /> Must Read
                </span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${featuredPost.categoryColor}`}>
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                    <Clock className="h-3 w-3" /> {featuredPost.readTime}
                  </span>
                  <span className="text-xs text-slate-400">{featuredPost.date}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm lg:text-base">
                  {featuredPost.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all">
                  Read Full Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* POSTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md hover:-translate-y-0.5">
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
              <Image 
                src={post.bannerImage}
                alt={post.bannerAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col flex-1 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${post.categoryColor}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors flex-1">
                {post.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
