import { ShieldCheck } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-24 px-4 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <ShieldCheck className="w-16 h-16 text-blue-600 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Your data is safe with us</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          We believe your career information belongs to you. We have built Smart Resume Maker with privacy and security at its core.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Private by default", body: "Your resume is never shared publicly unless you explicitly choose to share a link." },
            { title: "Auto-saved securely", body: "Your progress is automatically saved to your account so you never lose your work." },
            { title: "Free PDF Download", body: "Download your resume as a clean PDF instantly. No hidden fees or watermarks." },
          ].map(({ title, body }) => (
            <div key={title}>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" /> {title}
              </h3>
              <p className="text-sm text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}