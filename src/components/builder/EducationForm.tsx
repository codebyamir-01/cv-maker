"use client";

import { useState } from "react";
import { GraduationCap, Plus, Trash2, Edit2, Calendar } from "lucide-react";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { useResumeStore, Education } from "@/store/useResumeStore";

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [current, setCurrent] = useState<Partial<Education>>({});

  const handleAddNew = () => {
    const id = Date.now().toString();
    const newEdu: Education = {
      id, degree: "", institution: "", location: "", startYear: "", endYear: "", grade: "", currentlyStudying: false,
    };
    addEducation(newEdu);
    setEditingId(id);
    setCurrent(newEdu);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleChange = (key: keyof Education, value: any) => {
    setCurrent(prev => {
      const next = { ...prev, [key]: value };
      if (editingId) {
        updateEducation(editingId, next);
      }
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Education</h2>
          <p className="mt-0.5 text-sm text-slate-400">Add your degrees, certifications, and courses.</p>
        </div>
        <button onClick={handleAddNew} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          <Plus className="h-4 w-4" /> Add Education
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {resumeData.education.map(edu => (
          <div key={edu.id}>
            {editingId === edu.id ? (
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Degree / Certification *", key: "degree", placeholder: "e.g. B.Sc. Computer Science" },
                    { label: "Institution *", key: "institution", placeholder: "e.g. FAST NUCES" },
                    { label: "Location", key: "location", placeholder: "e.g. Islamabad, Pakistan" },
                    { label: "Grade / GPA", key: "grade", placeholder: "e.g. 3.8 / 4.0" },
                  ].map(f => (
                    <div key={f.key} className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-slate-700">{f.label}</label>
                      <input
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                        placeholder={f.placeholder}
                        value={(current as any)[f.key] || ""}
                        onChange={e => handleChange(f.key as keyof Education, e.target.value)}
                      />
                    </div>
                  ))}
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Start Date</label>
                    <MonthYearPicker 
                      value={current.startYear || ""} 
                      onChange={val => handleChange("startYear", val)} 
                      placeholder="e.g. Sep 2020" 
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">End Date (or Expected)</label>
                    <MonthYearPicker 
                      value={current.currentlyStudying ? "Expected" : (current.endYear || "")} 
                      onChange={val => handleChange("endYear", val)} 
                      placeholder="e.g. May 2024" 
                      disabled={current.currentlyStudying}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox" 
                    id="currentlyStudying" 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                    checked={current.currentlyStudying || false}
                    onChange={(e) => {
                      handleChange("currentlyStudying", e.target.checked);
                      if (e.target.checked) handleChange("endYear", "Expected");
                      else handleChange("endYear", "");
                    }}
                  />
                  <label htmlFor="currentlyStudying" className="text-sm font-medium text-slate-700 cursor-pointer">
                    I currently study here
                  </label>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 mt-2">
                  <button onClick={() => setEditingId(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                  <button onClick={handleSave} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black transition">Save Education</button>
                </div>
              </div>
            ) : (
              <div className="group flex cursor-pointer items-start justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-300" onClick={() => { setEditingId(edu.id); setCurrent(edu); }}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-blue-50">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{edu.degree || "(No degree)"}</p>
                    <p className="text-sm text-slate-500">{edu.institution}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{edu.startYear}{edu.startYear && edu.endYear && " — "}{edu.endYear}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); removeEducation(edu.id); }} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {resumeData.education.length === 0 && !editingId && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-14 text-center">
            <GraduationCap className="mb-3 h-8 w-8 text-slate-300" />
            <p className="text-sm font-semibold text-slate-500 mb-1">No education added yet</p>
            <p className="text-xs text-slate-400 mb-4">Add your degrees, diplomas, or certifications</p>
            <button onClick={handleAddNew} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
              <Plus className="h-4 w-4" /> Add Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
