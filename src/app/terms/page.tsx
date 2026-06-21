import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Terms of Service — CV Maker",
  description: "Read our Terms of Service.",
};

export default async function TermsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">
      <header className="w-full z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="text-slate-800 w-6 h-6 stroke-[2.5]" />
            <span className="font-bold text-xl tracking-tight text-slate-900">CV Maker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
            <Link href="/"         className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/builder"  className="hover:text-blue-600 transition-colors">Builder</Link>
            <Link href="/templates" className="hover:text-blue-600 transition-colors">Templates</Link>
            <Link href="/blog"     className="hover:text-blue-600 transition-colors">Blog</Link>
            <Link href="/contact"  className="hover:text-blue-600 transition-colors">Contact</Link>
          </nav>

          {session ? (
            <Link href="/dashboard" className="bg-slate-900 hover:bg-black text-white rounded-full px-8 h-11 text-[15px] font-semibold shadow-md transition-all inline-flex items-center">
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-11 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center">
              Log In
            </Link>
          )}
        </div>
      </header>
      
      <main className="flex-1 py-16 px-6 container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: June 2026</p>
        
        <div className="prose prose-slate max-w-none text-slate-700">
          <p>Welcome to CV Maker. By accessing or using our website and resume builder services, you agree to be bound by these Terms of Service.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By using our services, you confirm that you accept these terms of service and that you agree to comply with them. If you do not agree to these terms, you must not use our services.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Description of Service</h2>
          <p>CV Maker provides tools for creating, formatting, and downloading resumes and cover letters. The service is provided "as is" and we make no guarantees regarding your employment prospects.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. User Accounts</h2>
          <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. We encourage you to use "strong" passwords.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Intellectual Property</h2>
          <p>Our website and its original content, features, and functionality are owned by CV Maker and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
