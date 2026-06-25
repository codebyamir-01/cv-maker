import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | CV Maker",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: ["CV Maker Team"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  if (!post) {
    notFound();
  }

  // Get related articles (just the next two, or wrap around)
  const related1 = BLOG_POSTS[(postIndex + 1) % BLOG_POSTS.length];
  const related2 = BLOG_POSTS[(postIndex + 2) % BLOG_POSTS.length];
  const relatedPosts = [related1, related2];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <Navbar session={session} />

      <main className="flex-1 pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          
          {/* Back button */}
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          {/* Hero Section */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${post.categoryColor}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
              <span className="text-sm text-slate-500">•</span>
              <span className="text-sm text-slate-500">{post.date}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <hr className="border-slate-200 mb-12" />

          {/* Main Content */}
          <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl">
            {post.fullContent}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 md:p-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to build your ATS-friendly resume?
            </h3>
            <p className="text-slate-500 mb-8 max-w-xl mx-auto">
              Join thousands of job seekers who use CV Maker to create professional, ATS-optimized resumes in minutes.
            </p>
            <Link 
              href="/builder" 
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-500 transition-colors shadow-sm hover:shadow-md"
            >
              Start Building Now
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <section className="container mx-auto px-6 max-w-7xl mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Keep Reading</h2>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition">
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden transition hover:shadow-md h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${relatedPost.categoryColor}`}>
                      {relatedPost.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {relatedPost.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
