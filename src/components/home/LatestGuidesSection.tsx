import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";

const guides = [...BLOG_POSTS]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function LatestGuidesSection() {
  return (
    <section className="bg-white px-4 py-20" aria-labelledby="latest-guides-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-blue-700">From the career blog</p>
            <h2 id="latest-guides-heading" className="text-3xl font-bold text-slate-900">Latest resume guides</h2>
            <p className="mt-2 max-w-2xl text-slate-600">Practical examples and checks to help you write, format, and review your resume.</p>
          </div>
          <Link href="/blog" className="font-semibold text-blue-700 hover:underline">View all guides →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <Image src={post.bannerImage} alt={post.bannerAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold text-blue-700">{post.category} · {post.date}</p>
                  <h3 className="text-lg font-bold leading-snug text-slate-900 group-hover:text-blue-700">{post.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
