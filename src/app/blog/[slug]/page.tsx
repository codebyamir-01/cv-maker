import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Tag, ArrowRight, User } from "lucide-react";
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
      canonical: `https://www.smartresumemaker.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `https://www.smartresumemaker.com/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.bannerImage,
          width: 1200,
          height: 630,
          alt: post.bannerAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.bannerImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  if (!post) {
    notFound();
  }

  // Related posts by specific slugs or fallback to next posts
  let relatedPosts = post.relatedSlugs 
    ? post.relatedSlugs.map(slug => BLOG_POSTS.find(p => p.slug === slug)).filter(Boolean) as typeof BLOG_POSTS
    : [];

  if (relatedPosts.length < 2) {
    relatedPosts = [
      BLOG_POSTS[(postIndex + 1) % BLOG_POSTS.length],
      BLOG_POSTS[(postIndex + 2) % BLOG_POSTS.length]
    ];
  }

  // Schema.org structured data
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.smartresumemaker.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://www.smartresumemaker.com${post.bannerImage}`,  
    "author": {
      "@type": "Person",
      "name": post.author
    },  
    "publisher": {
      "@type": "Organization",
      "name": "Smart Resume Maker",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.smartresumemaker.com/icon.svg"
      }
    },
    "datePublished": new Date(post.date).toISOString()
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <Navbar />

      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="flex-1 pt-28 pb-20">
        <article className="container mx-auto px-6 max-w-4xl">
          
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

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
              <span className="text-sm text-slate-500">•</span>
              <span className="flex items-center gap-1 text-sm text-slate-500 font-medium">
                <User className="h-4 w-4" /> {post.author}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              {post.excerpt}
            </p>

            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <Image 
                src={post.bannerImage}
                alt={post.bannerAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </header>

          <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-img:rounded-xl">
            {post.fullContent}
            
            {post.faqs && post.faqs.length > 0 && (
              <>
                <h2 className="mt-12">Frequently Asked Questions</h2>
                {post.faqs.map((faq, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                    <p className="mt-0">{faq.answer}</p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Internal Links & CTA */}
          <div className="mt-16 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 text-center shadow-sm">
            <h3 className="text-2xl font-extrabold text-slate-900 mb-4">
              Ready to land your dream job?
            </h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Put these tips into practice immediately. Use our free, ATS-friendly resume builder and professionally designed templates to stand out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/builder" 
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
              >
                Build Your Resume Now
              </Link>
              <Link 
                href="/templates" 
                className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-8 py-4 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm w-full sm:w-auto"
              >
                Explore Templates
              </Link>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group block">
                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition hover:shadow-md h-full flex flex-col">
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                    <Image 
                      src={relatedPost.bannerImage}
                      alt={relatedPost.bannerAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
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
