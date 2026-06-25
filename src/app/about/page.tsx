import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About Us | CV Maker",
  description: "Learn more about CV Maker and our mission to help job seekers land their dream jobs.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto p-8 lg:p-12 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">About CV Maker</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-lg leading-relaxed">
            Welcome to CV Maker! We are dedicated to providing job seekers with the best tools to create professional, ATS-friendly resumes that stand out to recruiters and hiring managers.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Mission</h2>
          <p className="leading-relaxed">
            Our mission is simple: to help people land their dream jobs by making the resume creation process as seamless, intelligent, and effective as possible. We understand that navigating the modern job market can be challenging, especially with Applicant Tracking Systems (ATS) filtering out qualified candidates based on formatting issues. That's why we built CV Maker.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>ATS-Optimized Templates:</strong> Our designs are rigorously tested to ensure they pass through automated resume screeners without losing critical data.</li>
            <li><strong>Intuitive Builder:</strong> A seamless, real-time live preview builder that lets you see your changes instantly.</li>
            <li><strong>Privacy First:</strong> We believe your personal data belongs to you. We follow strict security practices to keep your data safe.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Get in Touch</h2>
          <p className="leading-relaxed">
            We are constantly evolving and improving. If you have any feedback, suggestions, or need support, please visit our <Link href="/contact" className="text-blue-600 hover:underline font-bold">Contact page</Link>. We'd love to hear from you!
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
