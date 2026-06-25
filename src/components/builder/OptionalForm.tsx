"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, FolderOpen, ExternalLink } from "lucide-react";
import { useResumeStore, Project } from "@/store/useResumeStore";

export default function OptionalForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [current, setCurrent] = useState<Partial<Project>>({});
  const [showProjects, setShowProjects] = useState(resumeData.projects.length > 0);

  const handleAddNew = () => {
    const id = Date.now().toString();
    const newProj: Project = { id, name: "", techStack: "", description: "", link: "" };
    addProject(newProj);
    setEditingId(id);
    setCurrent(newProj);
    setShowProjects(true);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleChange = (key: keyof Project, value: string) => {
    setCurrent(prev => {
      const next = { ...prev, [key]: value };
      if (editingId) {
        updateProject(editingId, next);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Optional sections picker */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Optional Sections</h2>
        <p className="mt-0.5 mb-5 text-sm text-slate-400">Add extra sections to make your resume stand out.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Projects",       active: showProjects,  toggle: () => setShowProjects(v => !v) },
            { label: "Certifications", active: false,         toggle: () => {} },
            { label: "Languages",      active: false,         toggle: () => {} },
            { label: "Awards",         active: false,         toggle: () => {} },
            { label: "Volunteer",      active: false,         toggle: () => {} },
            { label: "Publications",   active: false,         toggle: () => {} },
          ].map(s => (
            <button
              key={s.label}
              onClick={s.toggle}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition
                ${s.active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"}`}
            >
              {s.label}
              <span className={`ml-2 grid h-5 w-5 place-items-center rounded-full text-xs font-bold border
                ${s.active ? "border-white bg-white text-slate-900" : "border-slate-200 text-slate-400"}`}>
                {s.active ? "✓" : "+"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects section */}
      {showProjects && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Projects</h3>
              <p className="text-sm text-slate-400 mt-0.5">Showcase your best work and side projects.</p>
            </div>
            <button onClick={handleAddNew} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <Plus className="h-4 w-4" /> Add Project
            </button>
          </div>

          <div className="space-y-4">
            {resumeData.projects.map(proj => (
              <div key={proj.id}>
                {editingId === proj.id ? (
                  <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Project Name *", key: "name",       placeholder: "e.g. E-Commerce Platform" },
                        { label: "Tech Stack",     key: "techStack",  placeholder: "e.g. React, Node.js, PostgreSQL" },
                        { label: "Project Link",   key: "link",       placeholder: "https://github.com/..." },
                      ].map(f => (
                        <div key={f.key} className={`flex flex-col gap-1.5 ${f.key === "link" ? "sm:col-span-2" : ""}`}>
                          <label className="text-[13px] font-semibold text-slate-700">{f.label}</label>
                          <input
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder:text-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                            placeholder={f.placeholder}
                            value={(current as any)[f.key] || ""}
                            onChange={e => handleChange(f.key as keyof Project, e.target.value)}
                          />
                        </div>
                      ))}
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label className="text-[13px] font-semibold text-slate-700">Description</label>
                        <textarea
                          rows={3}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder:text-slate-300 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
                          placeholder="Briefly describe what you built, the problem it solved, and its impact..."
                          value={current.description || ""}
                          onChange={e => handleChange("description", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                      <button onClick={() => setEditingId(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                      <button onClick={handleSave} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black transition">Save Project</button>
                    </div>
                  </div>
                ) : (
                  <div className="group flex cursor-pointer items-start justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition" onClick={() => { setEditingId(proj.id); setCurrent(proj); }}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-slate-100">
                        <FolderOpen className="h-5 w-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{proj.name || "(No name)"}</p>
                        {proj.techStack && <p className="text-xs text-slate-500 mt-0.5">{proj.techStack}</p>}
                        {proj.link && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-blue-500">
                            <ExternalLink className="h-3 w-3" />{proj.link}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={e => { e.stopPropagation(); removeProject(proj.id); }} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {resumeData.projects.length === 0 && !editingId && (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                <FolderOpen className="mb-3 h-8 w-8 text-slate-300" />
                <p className="text-sm font-semibold text-slate-500 mb-4">No projects added yet</p>
                <button onClick={handleAddNew} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
                  <Plus className="h-4 w-4" /> Add First Project
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
