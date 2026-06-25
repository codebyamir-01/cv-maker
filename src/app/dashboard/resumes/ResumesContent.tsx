"use client";

import Link from "next/link";
import { Plus, FileText, MoreVertical, Search, Filter, Sparkles, CheckCircle2, Copy, Trash2, Edit2, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  atsScore: number | null;
}

// Fallback for toast if not installed, though shadcn usually has it.
// We'll use a simple state-based custom toast for maximum reliability if we don't know the exact toast library.
export default function ResumesContent() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await fetch("/api/resumes");
        if (res.ok) {
          const data = await res.json();
          setResumes(data.resumes || []);
        } else {
          showToast("Failed to load resumes.");
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
        showToast("An error occurred while loading.");
      } finally {
        setLoading(false);
      }
    }
    fetchResumes();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setResumes((prev) => prev.filter(r => r.id !== id));
        showToast("Resume deleted successfully.");
      } else {
        showToast("Failed to delete resume.");
      }
    } catch (error) {
      showToast("An error occurred.");
    }
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

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Empty State */}
      {!loading && resumes.length === 0 && !searchQuery ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm mt-12 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No resumes yet</h2>
          <p className="text-slate-500 mb-8 max-w-md">Create your first ATS-friendly resume to get started and land your dream job.</p>
          <Link href="/builder">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 px-8 font-semibold transition-all hover:scale-105 shadow-md shadow-blue-600/20">
              <Plus className="w-5 h-5 mr-2" /> Create New Resume
            </Button>
          </Link>
        </motion.div>
      ) : (
        /* Resume Cards Grid */
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full"
        >
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <Card className="border border-slate-200 shadow-sm h-full flex flex-col min-h-[340px] rounded-2xl">
                  <div className="aspect-[1/1.2] bg-slate-100 border-b border-slate-100 flex-shrink-0"></div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    <div className="flex gap-2 mt-auto pt-4">
                      <div className="h-9 bg-slate-100 rounded flex-1"></div>
                      <div className="h-9 bg-slate-100 rounded flex-1"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : filteredResumes.length > 0 ? (
            // Existing Resumes
            filteredResumes.map((resume) => {
              const score = resume.atsScore || 0;
              const hasScore = score > 0;
              
              return (
                <motion.div key={resume.id} variants={itemVariants} className="h-full min-w-0">
                  <Card className="border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group relative overflow-hidden flex flex-col h-full rounded-2xl bg-white hover:-translate-y-1">
                    
                    {/* Delete button (instead of generic menu for now) */}
                    <button 
                      onClick={(e) => handleDelete(resume.id, e)}
                      className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 bg-white/90 rounded-xl backdrop-blur-md shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all hover:scale-105"
                      title="Delete resume"
                    >
                      <Trash2 className="w-4 h-4" />
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
                        {hasScore ? (
                          <div className={`flex items-center gap-1.5 text-white font-semibold ${score >= 70 ? 'bg-green-500' : 'bg-orange-500'} px-3 py-1.5 rounded-full text-xs shadow-md`}>
                            {score >= 70 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            ATS Score: {score}%
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-600 font-semibold bg-white px-3 py-1.5 rounded-full text-xs shadow-md border border-slate-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                            Not checked yet
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Content & Actions */}
                    <CardContent className="p-5 flex-1 flex flex-col justify-between bg-white z-20 min-w-0">
                      <div className="mb-4">
                        <h3 className="font-bold text-slate-900 truncate text-base group-hover:text-blue-700 transition-colors w-full" title={resume.title}>{resume.title}</h3>
                        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Updated {formatDate(resume.updatedAt)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mt-auto">
                        <Link href={`/builder?id=${resume.id}`} className="w-full">
                          <Button 
                            className="w-full rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border-none h-9 text-xs transition-colors font-semibold"
                          >
                            Open Builder
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              No resumes found matching "{searchQuery}"
            </div>
          )}

          {/* Create New Card (moved to end) */}
          {!loading && (
            <motion.div variants={itemVariants} className="h-full min-w-0">
              <Link href="/builder" className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl">
                <Card className="border-2 border-dashed border-slate-200 shadow-none hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 h-full flex flex-col items-center justify-center min-h-[340px] group rounded-2xl cursor-pointer hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
                  <div className="w-16 h-16 bg-blue-100/50 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-5 transition-colors">
                    <Plus className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors text-center w-full truncate px-2">Create New Resume</h3>
                  <p className="text-sm text-slate-500 mt-2 text-center px-4">Start from scratch using our guided builder</p>
                </Card>
              </Link>
            </motion.div>
          )}
        </motion.div>
      )}

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
