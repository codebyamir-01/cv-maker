import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, PenTool, XCircle, HelpCircle, FileText } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { RESUME_EXAMPLES } from "@/lib/resume-examples-data";

// Generate static params for all slugs to ensure they are statically built for SEO
export function generateStaticParams() {
  return RESUME_EXAMPLES.map((example) => ({
    slug: example.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const example = RESUME_EXAMPLES.find((e) => e.slug === slug);
  
  if (!example) return { title: "Not Found" };

  return {
    title: example.title,
    description: example.description,
    alternates: {
      canonical: `https://www.smartresumemaker.com/resume-examples/${slug}`,
    }
  };
}

export default async function ResumeExampleDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const example = RESUME_EXAMPLES.find((e) => e.slug === slug);

  if (!example) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100 pt-24 pb-4 px-4">
          <div className="max-w-4xl mx-auto flex items-center text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/resume-examples" className="hover:text-blue-600">Resume Examples</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900 font-medium">{example.role}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="pt-12 pb-16 px-4 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {example.role} Resume Example & Guide
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {example.description}
            </p>
            <Link href={`/builder?t=${example.recommendedTemplate}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-12 text-base font-semibold shadow-md transition-transform hover:scale-105">
                Build this Resume Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            
            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 space-y-12">
              
              {/* Sample Structure */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <PenTool className="w-6 h-6 text-blue-600" /> 
                  Sample {example.role} Resume Structure
                </h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 border-b pb-2">Professional Summary</h3>
                  <p className="text-slate-600 italic">"{example.sampleStructure.summary}"</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Work Experience Highlights</h3>
                  <ul className="space-y-3">
                    {example.sampleStructure.experience.map((exp, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span className="text-slate-700">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Verbs */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Action Verbs for {example.role}s</h2>
                <p className="text-slate-600 mb-6">Instead of using passive words like "responsible for," use these powerful action verbs to start your experience bullet points:</p>
                <div className="flex flex-wrap gap-3">
                  {example.actionVerbs.map((verb) => (
                    <span key={verb} className="px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg border border-emerald-100">
                      {verb}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formatting Tips & Mistakes */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Formatting Tips & Common Mistakes</h2>
                
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Do's (Best Practices)
                  </h3>
                  <ul className="space-y-3">
                    {example.formattingTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-rose-600" /> Don'ts (Common Mistakes)
                  </h3>
                  <ul className="space-y-3">
                    {example.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-2 shrink-0" />
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              {example.faqs && example.faqs.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {example.faqs.map((faq, i) => (
                      <div key={i}>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{faq.question}</h3>
                        <p className="text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              
              {/* Recommended Skills */}
              <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
                <h3 className="text-xl font-bold mb-4">Recommended Skills</h3>
                <ul className="space-y-3">
                  {example.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Template Ad */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Recommended Template</h3>
                <p className="text-sm text-slate-600 mb-4">We recommend the <strong>{example.recommendedTemplateName}</strong> template for {example.role}s.</p>
                <Link href={`/builder?t=${example.recommendedTemplate}`}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Use Template
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Related Examples & Final CTA */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            {example.relatedExamples && example.relatedExamples.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Resume Examples</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {example.relatedExamples.map((rel) => (
                    <Link key={rel.slug} href={`/resume-examples/${rel.slug}`}>
                      <Button variant="outline" className="rounded-full flex items-center gap-2 text-slate-700 hover:text-blue-700 hover:border-blue-200">
                        <FileText className="w-4 h-4" /> {rel.title}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Ready to land your dream {example.role} job?</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                Use our ATS-friendly builder to create your professional resume in minutes. No design skills required.
              </p>
              <Link href={`/builder?t=${example.recommendedTemplate}`}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-14 text-lg font-bold shadow-md transition-transform hover:scale-105">
                  Build My Resume <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
