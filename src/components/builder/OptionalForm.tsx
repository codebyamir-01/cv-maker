"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, FolderOpen, ExternalLink, Award, Globe, Medal, HeartHandshake, BookOpen } from "lucide-react";
import { useResumeStore, OptionalSections } from "@/store/useResumeStore";

type SectionKey = keyof OptionalSections;

interface FieldConfig {
  key: string;
  label: string;
  placeholder: string;
  fullWidth?: boolean;
  type?: "text" | "select";
  options?: string[];
}

interface SectionConfig {
  id: SectionKey;
  title: string;
  desc: string;
  icon: React.ReactNode;
  fields: FieldConfig[];
  textArea?: { key: string; label: string; placeholder: string };
  renderListTitle: (item: any) => string;
  renderListSubtitle: (item: any) => string;
}

const SECTIONS: SectionConfig[] = [
  {
    id: "projects",
    title: "Projects",
    desc: "Showcase your best work and side projects.",
    icon: <FolderOpen className="w-5 h-5" />,
    fields: [
      { key: "name", label: "Project Name *", placeholder: "e.g. E-Commerce Platform" },
      { key: "techStack", label: "Tech Stack", placeholder: "e.g. React, Node.js" },
      { key: "link", label: "Project Link", placeholder: "https://github.com/...", fullWidth: true },
    ],
    textArea: { key: "description", label: "Description", placeholder: "Briefly describe what you built, the problem it solved, and its impact..." },
    renderListTitle: (item) => item.name || "(No name)",
    renderListSubtitle: (item) => item.techStack || "No tech stack listed",
  },
  {
    id: "certifications",
    title: "Certifications",
    desc: "Add your professional credentials.",
    icon: <Award className="w-5 h-5" />,
    fields: [
      { key: "name", label: "Certification Name *", placeholder: "e.g. AWS Solutions Architect" },
      { key: "issuer", label: "Issuing Organization", placeholder: "e.g. Amazon Web Services" },
      { key: "issueDate", label: "Issue Date", placeholder: "e.g. Jan 2023" },
      { key: "expiryDate", label: "Expiry Date", placeholder: "e.g. Jan 2026 (Optional)" },
      { key: "link", label: "Credential Link", placeholder: "https://...", fullWidth: true },
    ],
    renderListTitle: (item) => item.name || "(No name)",
    renderListSubtitle: (item) => item.issuer || "No issuer listed",
  },
  {
    id: "languages",
    title: "Languages",
    desc: "List the languages you speak and your proficiency.",
    icon: <Globe className="w-5 h-5" />,
    fields: [
      { key: "name", label: "Language *", placeholder: "e.g. English, Spanish" },
      { key: "proficiency", label: "Proficiency", placeholder: "e.g. Native, Fluent, Intermediate, Basic", type: "select", options: ["Native", "Fluent", "Proficient", "Intermediate", "Basic"] },
    ],
    renderListTitle: (item) => item.name || "(No name)",
    renderListSubtitle: (item) => item.proficiency || "No proficiency specified",
  },
  {
    id: "awards",
    title: "Awards",
    desc: "Highlight your achievements and recognitions.",
    icon: <Medal className="w-5 h-5" />,
    fields: [
      { key: "title", label: "Award Title *", placeholder: "e.g. Employee of the Year" },
      { key: "organization", label: "Organization", placeholder: "e.g. Tech Corp Inc." },
      { key: "date", label: "Date", placeholder: "e.g. Dec 2023", fullWidth: true },
    ],
    textArea: { key: "description", label: "Description", placeholder: "Briefly describe what this award was for..." },
    renderListTitle: (item) => item.title || "(No title)",
    renderListSubtitle: (item) => item.organization || "No organization listed",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    desc: "Include your community service and volunteer work.",
    icon: <HeartHandshake className="w-5 h-5" />,
    fields: [
      { key: "role", label: "Role *", placeholder: "e.g. Event Coordinator" },
      { key: "organization", label: "Organization", placeholder: "e.g. Red Cross" },
      { key: "location", label: "Location", placeholder: "e.g. New York, NY" },
      { key: "startDate", label: "Start Date", placeholder: "e.g. Jan 2022" },
      { key: "endDate", label: "End Date", placeholder: "e.g. Present" },
    ],
    textArea: { key: "description", label: "Description", placeholder: "Describe your responsibilities and impact..." },
    renderListTitle: (item) => item.role || "(No role)",
    renderListSubtitle: (item) => item.organization || "No organization listed",
  },
  {
    id: "publications",
    title: "Publications",
    desc: "List your published articles, papers, or books.",
    icon: <BookOpen className="w-5 h-5" />,
    fields: [
      { key: "title", label: "Publication Title *", placeholder: "e.g. Modern Web Architecture" },
      { key: "publisher", label: "Publisher/Journal", placeholder: "e.g. Tech Review" },
      { key: "date", label: "Date", placeholder: "e.g. May 2023" },
      { key: "link", label: "Link", placeholder: "https://...", fullWidth: true },
    ],
    textArea: { key: "description", label: "Description", placeholder: "Briefly describe the publication content..." },
    renderListTitle: (item) => item.title || "(No title)",
    renderListSubtitle: (item) => item.publisher || "No publisher listed",
  },
];

export default function OptionalForm() {
  const { resumeData, addOptionalItem, updateOptionalItem, removeOptionalItem } = useResumeStore();
  
  // Track which section panels are expanded
  const [activeSections, setActiveSections] = useState<Record<SectionKey, boolean>>(() => {
    const active: any = {};
    SECTIONS.forEach(s => {
      // Auto-expand if it has items
      const hasItems = resumeData.optionalSections?.[s.id]?.length > 0;
      active[s.id] = hasItems;
    });
    // Ensure at least projects is shown by default if empty
    if (!active.projects) active.projects = true;
    return active;
  });

  const toggleSection = (id: SectionKey) => {
    setActiveSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Optional sections picker */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Optional Sections</h2>
        <p className="mt-0.5 mb-5 text-sm text-slate-400">Add extra sections to make your resume stand out.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map(s => {
            const hasData = (resumeData.optionalSections?.[s.id]?.length || 0) > 0;
            const isActive = activeSections[s.id];
            
            return (
              <button
                key={s.id}
                onClick={() => toggleSection(s.id)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition
                  ${isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"}`}
              >
                {s.title}
                <span className={`ml-2 grid h-5 w-5 place-items-center rounded-full text-xs font-bold border
                  ${isActive ? "border-white bg-white text-slate-900" : "border-slate-200 text-slate-400"}
                  ${hasData && !isActive ? "bg-green-100 border-green-200 text-green-700" : ""}
                `}>
                  {hasData && !isActive ? "✓" : (isActive ? "−" : "+")}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Render Active Sections */}
      {SECTIONS.map(section => {
        if (!activeSections[section.id]) return null;
        return (
          <SectionEditor 
            key={section.id}
            config={section}
            items={resumeData.optionalSections?.[section.id] || []}
            onAdd={(item: any) => addOptionalItem(section.id, item)}
            onUpdate={(id: string, data: any) => updateOptionalItem(section.id, id, data)}
            onRemove={(id: string) => removeOptionalItem(section.id, id)}
          />
        );
      })}
    </div>
  );
}

// Reusable Editor Component for any section
function SectionEditor({ config, items, onAdd, onUpdate, onRemove }: { config: SectionConfig, items: any[], onAdd: any, onUpdate: any, onRemove: any }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [current, setCurrent] = useState<any>({});

  const handleAddNew = () => {
    const id = Date.now().toString();
    const newItem: any = { id };
    // Initialize fields
    config.fields.forEach(f => newItem[f.key] = "");
    if (config.textArea) newItem[config.textArea.key] = "";
    
    onAdd(newItem);
    setEditingId(id);
    setCurrent(newItem);
  };

  const handleChange = (key: string, value: string) => {
    setCurrent((prev: any) => {
      const next = { ...prev, [key]: value };
      if (editingId) {
        onUpdate(editingId, next);
      }
      return next;
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="text-slate-500">{config.icon}</span> {config.title}
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">{config.desc}</p>
        </div>
        <button onClick={handleAddNew} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition w-full sm:w-auto shrink-0">
          <Plus className="h-4 w-4" /> Add {config.title.replace(/s$/, '')}
        </button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id}>
            {editingId === item.id ? (
              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config.fields.map(f => (
                    <div key={f.key} className={`flex flex-col gap-1.5 ${f.fullWidth ? "sm:col-span-2" : ""}`}>
                      <label className="text-[13px] font-semibold text-slate-700">{f.label}</label>
                      {f.type === "select" ? (
                        <select
                          className="h-[42px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                          value={current[f.key] || ""}
                          onChange={e => handleChange(f.key, e.target.value)}
                        >
                          <option value="" disabled>Select {f.label.replace(" *", "")}</option>
                          {f.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="h-[42px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-300 text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
                          placeholder={f.placeholder}
                          value={current[f.key] || ""}
                          onChange={e => handleChange(f.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                  
                  {config.textArea && (
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-[13px] font-semibold text-slate-700">{config.textArea.label}</label>
                      <textarea
                        rows={3}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm placeholder:text-slate-300 text-slate-800 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 transition resize-none"
                        placeholder={config.textArea.placeholder}
                        value={current[config.textArea.key] || ""}
                        onChange={e => handleChange(config.textArea!.key, e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                  <button onClick={() => setEditingId(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
                  <button onClick={() => setEditingId(null)} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-black transition">Save {config.title.replace(/s$/, '')}</button>
                </div>
              </div>
            ) : (
              <div className="group flex cursor-pointer items-start justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition" onClick={() => { setEditingId(item.id); setCurrent(item); }}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg bg-slate-100 shrink-0">
                    {config.icon}
                  </div>
                  <div className="min-w-0 pr-4">
                    <p className="font-bold text-slate-900 truncate">{config.renderListTitle(item)}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{config.renderListSubtitle(item)}</p>
                    {item.link && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-blue-500 truncate">
                        <ExternalLink className="h-3 w-3 shrink-0" /><a href={item.link} target="_blank" rel="noreferrer" className="truncate hover:underline" onClick={e => e.stopPropagation()}>{item.link}</a>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-blue-600 transition">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); onRemove(item.id); }} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && !editingId && (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
            <div className="mb-3 h-8 w-8 text-slate-300 flex justify-center items-center">
              {config.icon}
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-4">No {config.title.toLowerCase()} added yet</p>
            <button onClick={handleAddNew} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
              <Plus className="h-4 w-4" /> Add First {config.title.replace(/s$/, '')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
