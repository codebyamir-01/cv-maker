import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { FileText } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Cookie Policy — CV Maker",
  description: "Read our Cookie Policy.",
};

export default async function CookiesPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Cookie Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: June 2026</p>
        
        <div className="prose prose-slate max-w-none text-slate-700">
          <p>This Cookie Policy explains how CV Maker uses cookies and similar technologies to recognize you when you visit our website.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What are cookies?</h2>
          <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why do we use cookies?</h2>
          <p>We use first and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Websites to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How can I control cookies?</h2>
          <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
