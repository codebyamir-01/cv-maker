"use client";

import Link from "next/link";
import { Plus, FileText, MoreVertical, Search, Filter, Sparkles, CheckCircle2, Copy, Trash2, Edit2, Download, AlertCircle, Eye, MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface Resume {
  id: string;
  title: string;
  updatedAt: string;
  atsScore: number | null;
}

export default function ResumesContent() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const { data, error, isLoading: loading, mutate } = useSWR("/api/resumes", fetcher);
  const resumes: Resume[] = data?.resumes || [];

  if (error) {
    // show error toast only once via effect or just console
    console.error("Error fetching resumes:", error);
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        mutate();
        showToast("Resume deleted successfully.");
      } else {
        showToast("Failed to delete resume.");
      }
    } catch (error) {
      showToast("An error occurred.");
    }
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
  };

  return (
    <div className="space-y-5 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-12 overflow-x-hidden">
      
      {/* Custom Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Resumes</h1>
          <p className="text-slate-500 mt-2 text-base">View and manage all your created resumes.</p>
        </div>
        <Link href="/builder" className="w-full sm:w-auto mt-2 sm:mt-0">
          <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 rounded-xl h-12 px-6 font-semibold transition-all hover:scale-[1.02]">
            <Plus className="w-5 h-5 mr-2" /> Create New
          </Button>
        </Link>
      </div>

      {/* Search & Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full animate-fade-in-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
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
      </div>

      {/* Empty State */}
      {!loading && resumes.length === 0 && !searchQuery ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto shadow-sm mt-12 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
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
        </div>
      ) : (
        /* Resume Cards Grid */
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-full">
                <Card className="border border-slate-200 shadow-sm flex flex-col h-full min-h-[260px] rounded-2xl">
                  <div className="h-[140px] bg-slate-100 border-b border-slate-100 flex-shrink-0"></div>
                  <CardContent className="p-4 flex-1 flex flex-col justify-between bg-white">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    <div className="flex gap-2 mt-auto pt-3">
                      <div className="h-9 bg-slate-100 rounded flex-1"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))
          ) : filteredResumes.length > 0 ? (
            // Existing Resumes
            filteredResumes.map((resume, idx) => {
              const score = resume.atsScore || 0;
              const hasScore = score > 0;
              const delay = `${150 + idx * 50}ms`;
              
              return (
                <div key={resume.id} className="min-w-0 flex h-full animate-fade-in-up" style={{ animationDelay: delay, animationFillMode: 'both' }}>
                  <Card className="w-full border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group relative flex flex-col h-full min-h-[260px] rounded-2xl bg-white hover:-translate-y-1">
                    
                    {/* Thumbnail Area */}
                    <div className="h-[140px] bg-slate-50 rounded-t-2xl border-b border-slate-100 flex items-center justify-center relative flex-shrink-0 overflow-hidden">
                      
                      {/* Top Right Menu */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          showToast("More actions coming soon!");
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:bg-slate-50 hover:text-slate-700 transition-colors z-10"
                        title="More actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {/* Wide Horizontal Skeleton */}
                      <div className="w-[85%] h-[90px] bg-white shadow-sm border border-slate-100 rounded-lg p-4 flex flex-col justify-start mt-2 transform transition-transform group-hover:scale-[1.02] duration-500">
                        <div className="h-2 w-[60%] bg-slate-200 rounded-full mb-3"></div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full mb-2"></div>
                        <div className="h-1.5 w-[90%] bg-slate-100 rounded-full mb-2"></div>
                        <div className="h-1.5 w-[80%] bg-slate-100 rounded-full"></div>
                      </div>

                      {/* Score Badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        {hasScore ? (
                          <div className={`flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-full text-[11px] shadow-sm`}>
                            {score >= 70 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertCircle className="w-3.5 h-3.5 text-orange-500" />}
                            ATS: {score}%
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-full text-[11px] shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                            Not checked yet
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Content & Actions */}
                    <CardContent className="p-4 flex-1 flex flex-col justify-between bg-white z-20 min-w-0">
                      <div>
                        <h3 className="font-bold text-slate-900 truncate text-[15px] group-hover:text-blue-600 transition-colors" title={resume.title}>{resume.title}</h3>
                        <p className="text-[13px] text-slate-500 mt-1 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Updated {formatDate(resume.updatedAt)}
                        </p>
                      </div>
                      
                      <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                        <Link href={`/builder?id=${resume.id}`} className="flex-1">
                          <Button 
                            variant="outline"
                            className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 h-9 text-xs font-semibold transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1.5" /> View
                          </Button>
                        </Link>
                        <Link href={`/builder?id=${resume.id}`} className="flex-1">
                          <Button 
                            variant="outline"
                            className="w-full rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 h-9 text-xs font-semibold transition-all"
                          >
                            <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
                          </Button>
                        </Link>
                        <Button 
                          variant="outline"
                          onClick={(e) => handleDelete(resume.id, e)}
                          className="w-9 h-9 p-0 shrink-0 rounded-xl border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              No resumes found matching "{searchQuery}"
            </div>
          )}

          {/* Create New Card (moved to end) */}
          {!loading && (
            <div className="min-w-0 flex h-full animate-fade-in-up" style={{ animationDelay: `${150 + filteredResumes.length * 50}ms`, animationFillMode: 'both' }}>
              <Link href="/builder" className="w-full block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl h-full min-h-[260px]">
                <Card className="border border-dashed border-blue-200 shadow-none hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 h-full flex flex-col items-center justify-center group rounded-2xl cursor-pointer hover:-translate-y-1 bg-slate-50/30 p-6">
                  <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-100 rounded-full flex items-center justify-center mb-4 transition-colors">
                    <Plus className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-[17px] group-hover:text-blue-600 transition-colors text-center w-full truncate">Create New Resume</h3>
                  <p className="text-[13px] text-slate-500 mt-1.5 text-center px-2">Start from scratch using our guided builder</p>
                </Card>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/50 rounded-3xl overflow-hidden relative shadow-sm">
          <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24 text-blue-600" />
          </div>
          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
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
      </div>

    </div>
  );
}
