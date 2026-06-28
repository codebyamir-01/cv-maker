import Link from "next/link";
import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-base font-extrabold tracking-tight text-slate-900">Smart Resume Maker</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500 leading-relaxed">
              Build a professional resume or CV in minutes. Smart guidance, ATS-friendly templates, and instant download.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-xs font-bold text-slate-500 transition hover:bg-slate-100">X</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 text-xs font-bold text-slate-500 transition hover:bg-slate-100">in</a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-tight text-slate-900">Product</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/" className="transition hover:text-slate-900">Home</Link></li>
              <li><Link href="/about" className="transition hover:text-slate-900">About Us</Link></li>
              <li><Link href="/builder" className="transition hover:text-slate-900">Resume Builder</Link></li>
              <li><Link href="/templates" className="transition hover:text-slate-900">Templates</Link></li>
              <li><Link href="/blog" className="transition hover:text-slate-900">Career Blog</Link></li>
              <li><Link href="/contact" className="transition hover:text-slate-900">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-tight text-slate-900">Expert Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/blog" className="transition hover:text-slate-900">Resume Examples</Link></li>
              <li><Link href="/blog/ats-friendly-resume-2026" className="transition hover:text-slate-900">ATS-Friendly Resumes</Link></li>
              <li><Link href="/templates" className="transition hover:text-slate-900">Professional Templates</Link></li>
              <li><Link href="/blog/one-vs-two-page-resume" className="transition hover:text-slate-900">How to Write a CV</Link></li>
              <li><Link href="/blog/resume-action-verbs" className="transition hover:text-slate-900">Resume Action Verbs</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-bold tracking-tight text-slate-900">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="/terms" className="transition hover:text-slate-900">Terms of Service</Link></li>
              <li><Link href="/privacy" className="transition hover:text-slate-900">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="transition hover:text-slate-900">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex justify-center border-t border-slate-100 pt-6 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Smart Resume Maker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
