"use client";

import { useState } from "react";
import TemplateCard from "@/components/templates/TemplateCard";

interface TemplatesGridProps {
  categories: string[];
  templates: any[];
  dummyData: any;
}

export default function TemplatesGrid({ categories, templates, dummyData }: TemplatesGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition border
              ${activeCategory === cat
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map(t => (
          <TemplateCard key={t.id} template={t} dummyData={dummyData} />
        ))}
      </div>
    </>
  );
}
