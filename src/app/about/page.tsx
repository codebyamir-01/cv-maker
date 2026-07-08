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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">About Smart Resume Maker</h1>
        <div className="prose prose-slate max-w-none text-slate-700 space-y-6">
          <p className="text-lg leading-relaxed">
            Let’s be honest—writing a resume is rarely anyone's favorite thing to do. It’s stressful, time-consuming, and figuring out what hiring managers actually want feels like guessing a secret password. We noticed that incredibly talented people were getting rejected simply because their resumes weren't formatted correctly for modern Applicant Tracking Systems (ATS). That didn't sit right with us.
          </p>
          <p className="text-lg leading-relaxed">
            That’s exactly why we built Smart Resume Maker. We wanted to take the guesswork out of the job hunt and give you a tool that handles the formatting, the layout, and the ATS rules, so you can focus entirely on showcasing your actual skills.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Our Core Mission</h2>
          <p className="leading-relaxed">
            Our mission isn't just to help you make a document; it's to help you land interviews. The recruitment landscape has changed drastically over the last few years. Companies rely heavily on automated screening tools, meaning a great candidate can easily slip through the cracks if their resume has the wrong margins, fonts, or structure. We exist to bridge that gap. We want to democratize access to high-quality, professional resume designs that were previously only available through expensive career coaches.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What Makes Us Different?</h2>
          <p className="leading-relaxed">
            There are dozens of resume builders out there. So why use ours? Because we focus on what actually works in the real world, not just what looks pretty.
          </p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Strictly ATS-Friendly:</strong> We don't offer overly complicated, graphic-heavy templates that choke applicant tracking systems. Our templates are clean, professional, and mathematically structured to be parsed perfectly by software like Workday, Greenhouse, and Lever.</li>
            <li><strong>Zero Hidden Paywalls:</strong> We hate it when you spend an hour building a resume, only to be asked for $15 right when you try to download it. Our core builder and PDF exports are accessible without sneaky tricks.</li>
            <li><strong>Real-Time Live Preview:</strong> You see exactly what your resume looks like as you type. No guessing, no refreshing.</li>
            <li><strong>Privacy First:</strong> Your career history is highly personal data. We don't sell your information to third-party marketers. What you build here stays between you and the employer you send it to.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Who Are We?</h2>
          <p className="leading-relaxed">
            We are a small, passionate team of developers, designers, and former recruiters who got tired of seeing great candidates fail because of bad formatting. We combined our technical expertise with real-world hiring insights to build a platform that genuinely works. We are constantly studying the latest hiring trends and updating our templates to ensure you always have a competitive edge.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Let's Connect</h2>
          <p className="leading-relaxed">
            This platform is built for you, and we love hearing from our users. Whether you just landed your dream job using our templates, or you have a suggestion on how we can improve the builder, we want to hear about it. Drop us a message on our <Link href="/contact" className="text-blue-600 hover:underline font-bold">Contact page</Link> and a real human will get back to you.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
