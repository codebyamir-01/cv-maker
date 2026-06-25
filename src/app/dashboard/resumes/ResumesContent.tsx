"use client";

import Link from "next/link";
import { Plus, FileText, MoreVertical, Search, Filter, Sparkles, CheckCircle2, Copy, Trash2, Edit2, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Fallback for toast if not installed, though shadcn usually has it.
// We'll use a simple state-based custom toast for maximum reliability if we don't know the exact toast library.
export default function ResumesContent() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  // Mock data for resumes
  const resumes = [
    { id: 1, title: "Senior Software Engineer CV", date: "Updated 2 days ago", score: 85, color: "bg-green-500" },
    { id: 2, title: "Product Manager Resume", date: "Updated 1 week ago", score: 78, color: "bg-green-500" },
    { id: 3, title: "Frontend Developer (Draft)", date: "Updated 2 weeks ago", score: 54, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8 w-full px-4 sm:px-8 lg:px-10 py-6 sm:py-8 pb-12 relative min-h-[80vh] overflow-x-hidden">
      
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-medium text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full"
      >
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
          <p className="text-slate-500 mt-2 text-base">View and manage all your created resumes.</p>
        </div>
        <Link href="/builder" className="w-full sm:w-auto mt-2 sm:mt-0">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl h-12 px-6 font-semibold transition-all hover:scale-[1.02]">
            <Plus className="w-5 h-5 mr-2" /> Create New
          </Button>
        </Link>
      </motion.div>

      {/* Search & Filter Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 mb-8 w-full"
      >
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search resumes..." 
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-slate-700 bg-white shadow-sm"
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => showToast("Filters coming soon!")}
          className="w-full sm:w-auto rounded-2xl border-slate-200 text-slate-600 h-12 px-6 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </motion.div>

      {/* Resume Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full"
      >
        {/* Existing Resumes */}
        {resumes.map((resume) => (
          <motion.div key={resume.id} variants={itemVariants} className="h-full min-w-0">
            <Card className="border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group relative overflow-hidden flex flex-col h-full rounded-2xl bg-white hover:-translate-y-1">
              
              {/* Three-dot menu */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Options menu coming soon!");
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-white/90 rounded-xl backdrop-blur-md shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Thumbnail Area */}
              <div className="aspect-[1/1.2] bg-slate-50 border-b border-slate-100 flex items-center justify-center relative flex-shrink-0 overflow-hidden">
                {/* Fake resume skeleton */}
                <div className="absolute inset-4 bg-white shadow-sm border border-slate-100 rounded-md p-4 flex flex-col gap-3 opacity-60">
                  <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                  <div className="h-2 w-1/3 bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
                  <div className="h-2 w-full bg-slate-100 rounded mt-2"></div>
                  <div className="h-2 w-full bg-slate-100 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                </div>

                {/* Score Badge */}
                <div className="absolute bottom-4 left-4 z-10">
                   <div className={`flex items-center gap-1.5 text-white font-semibold ${resume.color} px-3 py-1.5 rounded-full text-xs shadow-md`}>
                     {resume.score >= 70 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                     ATS Score: {resume.score}%
                   </div>
                </div>
              </div>

              {/* Card Content & Actions */}
              <CardContent className="p-5 flex-1 flex flex-col justify-between bg-white z-20 min-w-0">
                <div className="mb-4">
                  <h3 className="font-bold text-slate-900 truncate text-base group-hover:text-blue-700 transition-colors w-full">{resume.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {resume.date}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Button 
                    variant="outline" 
                    onClick={() => showToast("Preview opening soon!")}
                    className="w-full rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 h-9 text-xs"
                  >
                    View
                  </Button>
                  <Link href="/builder" className="w-full">
                    <Button 
                      className="w-full rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border-none h-9 text-xs transition-colors"
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Create New Card (moved to end) */}
        <motion.div variants={itemVariants} className="h-full min-w-0">
          <Link href="/builder" className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
            <Card className="border-2 border-dashed border-slate-200 shadow-none hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[340px] group rounded-2xl cursor-pointer hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100/50 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-5 transition-colors">
                <Plus className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors text-center w-full truncate px-2">Create New Resume</h3>
              <p className="text-sm text-slate-500 mt-2 text-center px-4">Start from scratch using our guided builder</p>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/50 rounded-3xl overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Sparkles className="w-32 h-32 text-blue-600" />
          </div>
          <CardContent className="p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Want a higher ATS score?</h2>
              <p className="text-slate-600 text-base max-w-xl">
                Get personalized suggestions to improve your resume and increase your chances of getting hired.
              </p>
            </div>
            <Button 
              onClick={() => showToast("ATS Checker coming soon!")}
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-md shadow-blue-900/5 border border-blue-100 rounded-xl h-12 px-8 font-bold whitespace-nowrap transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 mr-2" /> Check ATS Score
            </Button>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}
