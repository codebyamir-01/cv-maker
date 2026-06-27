"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "./input";

interface MonthYearPickerProps {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function MonthYearPicker({ value, onChange, disabled, placeholder = "Select date", className }: MonthYearPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && value !== "Present" && value !== "Expected" && value !== "No expiry") {
      const parts = value.split(" ");
      if (parts.length === 2) {
        const y = parseInt(parts[1], 10);
        if (!isNaN(y)) setYear(y);
      }
    }
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (month: string) => {
    onChange(`${month} ${year}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div 
        className={`relative cursor-pointer ${disabled ? "opacity-60 pointer-events-none" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Input 
          value={value} 
          readOnly 
          placeholder={placeholder}
          className={`cursor-pointer bg-white pr-10 ${className || ""}`}
          tabIndex={-1}
        />
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[260px] rounded-xl border border-slate-200 bg-white p-3 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-100 max-w-[90vw] sm:max-w-none">
          <div className="flex items-center justify-between mb-3">
            <button 
              type="button" 
              onClick={() => setYear(y => y - 1)}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-semibold text-sm text-slate-700">{year}</span>
            <button 
              type="button" 
              onClick={() => setYear(y => y + 1)}
              className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {MONTHS.map((m) => {
              const isSelected = value === `${m} ${year}`;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleSelect(m)}
                  className={`py-2 px-1 text-sm rounded-md transition-colors ${
                    isSelected 
                      ? "bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700" 
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={() => { onChange(""); setIsOpen(false); }}
              className="w-full py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
