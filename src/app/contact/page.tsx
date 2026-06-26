import Link from "next/link";
import { FileText, Mail, MapPin, Phone, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SupportForm } from "@/components/contact/SupportForm";

export const metadata: Metadata = {
  title: "Contact Us — CV Maker",
  description: "Get in touch with the CV Maker team. We're here to help with your resume questions, feedback, or support needs.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-sans">

      <Navbar />

      <main className="flex-1 pt-28 pb-20">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden py-16 text-center">
          {/* Lighter background blobs - reduced blur cost for better CLS/FCP */}
          <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/60 via-transparent to-indigo-50/40" />
          </div>

          <div className="container mx-auto px-6 max-w-2xl">
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-blue-600 text-sm font-semibold mb-6">
              <MessageSquare className="w-4 h-4" />
              We&apos;d love to hear from you
            </div>
            <h1 className="animate-fade-in-up text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-tight">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="animate-fade-in-up-delay-1 text-lg text-slate-500 font-medium leading-relaxed">
              Have a question, feedback, or need help? Our team is here to assist you — usually within 24 hours.
            </p>
          </div>
        </section>

        {/* ── MAIN GRID ── */}
        <section className="container mx-auto px-6 max-w-6xl mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* LEFT: Info cards */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact details */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-5">Contact Details</h2>
                <div className="flex flex-col gap-5">
                  {[
                    { icon: Mail,    label: "Email",   value: "jerryjoe9199@gmail.com",    sub: "For general questions & support" },
                    { icon: Phone,   label: "Phone",   value: "+92 332 131022",        sub: "Mon–Fri, 9am – 6pm PKT" },
                    { icon: MapPin,  label: "Office",  value: "Rawalpindi, Pakistan",  sub: "Headquartered in Pakistan" },
                    { icon: Clock,   label: "Hours",   value: "9:00 AM – 6:00 PM",     sub: "Pakistan Standard Time (PKT)" },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-50 border border-blue-100">
                          <Icon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{item.label}</p>
                          <p className="text-sm font-bold text-slate-800">{item.value}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why contact us */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">How We Can Help</h2>
                <ul className="space-y-3">
                  {[
                    "Resume builder questions",
                    "Template customization help",
                    "PDF download issues",
                    "ATS optimization tips",
                    "Feature requests & feedback",
                    "Partnership inquiries",
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600 font-medium">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT: Contact form */}
            <div className="lg:col-span-3">
              <SupportForm />
            </div>

          </div>
        </section>

        {/* ── FAQ strip ── */}
        <section className="container mx-auto px-6 max-w-6xl mt-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { q: "Is CV Maker free to use?",         a: "Yes! The core resume builder, templates, and PDF download are 100% free." },
                { q: "Can I download my resume as PDF?",  a: "Absolutely. Click Download in the builder and your resume saves as a print-ready PDF." },
                { q: "Are the templates ATS-friendly?",  a: "Yes. All templates are tested against popular ATS systems to ensure your resume parses correctly." },
                { q: "How do I change the resume color?", a: "In the builder's Live Preview panel, click any color dot to instantly update your resume's accent color." },
              ].map(faq => (
                <div key={faq.q} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                  <p className="text-sm font-bold text-slate-800 mb-2">{faq.q}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
