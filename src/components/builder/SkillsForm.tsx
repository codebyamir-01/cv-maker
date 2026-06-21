"use client";

import { useState } from "react";
import { Plus, Trash2, Zap, Globe, Wrench, Brain } from "lucide-react";
import { useResumeStore, Skill } from "@/store/useResumeStore";

const CATEGORIES: Skill["category"][] = ["Technical", "Soft", "Tools", "Languages"];

const categoryConfig = {
  Technical: { icon: Zap,    color: "bg-blue-50 text-blue-600 border-blue-200"   },
  Soft:      { icon: Brain,  color: "bg-purple-50 text-purple-600 border-purple-200" },
  Tools:     { icon: Wrench, color: "bg-orange-50 text-orange-600 border-orange-200" },
  Languages: { icon: Globe,  color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
};

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<Skill["category"]>("Technical");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    addSkill({ id: Date.now().toString(), name: trimmed, category });
    setInput("");
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = resumeData.skills.filter(s => s.category === cat);
    return acc;
  }, {} as Record<Skill["category"], Skill[]>);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Skills</h2>
        <p className="mt-0.5 text-sm text-slate-400">Add your technical skills, soft skills, tools, and languages.</p>
      </div>

      {/* Add skill input */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
            placeholder="e.g. React, Python, Figma, Agile..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value as Skill["category"])}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 focus:outline-none"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={handleAdd} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-black">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-400">Press Enter or click Add to insert a skill</p>
      </div>

      {/* Grouped skills display */}
      <div className="space-y-5">
        {CATEGORIES.map(cat => {
          const skills = grouped[cat];
          if (skills.length === 0) return null;
          const Cfg = categoryConfig[cat];
          const Icon = Cfg.icon;
          return (
            <div key={cat}>
              <div className="mb-2 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${Cfg.color}`}>
                  <Icon className="h-3 w-3" /> {cat}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill.id} className="group inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50">
                    {skill.name}
                    <button onClick={() => removeSkill(skill.id)} className="ml-0.5 grid h-4 w-4 place-items-center rounded-full text-slate-400 transition group-hover:text-red-500">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {resumeData.skills.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <Zap className="mb-3 h-8 w-8 text-slate-300" />
            <p className="text-sm font-semibold text-slate-500 mb-1">No skills added yet</p>
            <p className="text-xs text-slate-400">Type a skill above and press Enter to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
