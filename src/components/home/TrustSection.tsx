import { ShieldCheck, Lock, Save, DownloadCloud } from "lucide-react";

export default function TrustSection() {
  const features = [
    { 
      title: "Private by default", 
      body: "Your resume is never shared publicly unless you explicitly choose to share a secure link.",
      icon: <Lock className="w-5 h-5 text-blue-600" />
    },
    { 
      title: "Auto-saved securely", 
      body: "Your progress is automatically saved to your account in real-time so you never lose your work.",
      icon: <Save className="w-5 h-5 text-emerald-600" />
    },
    { 
      title: "Free PDF Download", 
      body: "Download your resume as a clean, ATS-friendly PDF instantly. No hidden fees or watermarks.",
      icon: <DownloadCloud className="w-5 h-5 text-purple-600" />
    },
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Your data is safe with us
        </h2>
        <p className="text-lg text-slate-600 mb-14 max-w-2xl mx-auto leading-relaxed">
          We believe your career information belongs to you. We have built Smart Resume Maker with privacy, security, and transparency at its core.
        </p>

        {/* Premium Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          {features.map(({ title, body, icon }) => (
            <div 
              key={title}
              className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                {icon}
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg mb-3 tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}