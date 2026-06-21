import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Privacy Policy — CV Maker",
  description: "Read our Privacy Policy.",
};

export default async function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: June 2026</p>
        
        <div className="prose prose-slate max-w-none text-slate-700">
          <p>CV Maker operates the cvmaker.io website, which provides the resume building service.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Information Collection and Use</h2>
          <p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, email address, phone number, and professional history.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Log Data</h2>
          <p>We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Security</h2>
          <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
