"use client";

import Link from "next/link";
import { Plus, FileText, Upload, Clock, TrendingUp, Sparkles, Edit, ChevronRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export default function DashboardContent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    status === "authenticated" ? "/api/resumes" : null,
    fetcher
  );

  const resumes = data?.resumes || [];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="space-y-8 animate-pulse p-2">
        <div className="h-10 bg-slate-200 rounded w-1/3 mb-8"></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
           {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-slate-100 rounded-xl"></div>)}
        </div>
        <div className="mt-12 h-8 bg-slate-200 rounded w-1/4 mb-6"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {[...Array(3)].map((_, i) => <div key={i} className="h-56 bg-slate-100 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  const user = session?.user;

  const averageAtsScore = resumes.length > 0
    ? Math.round(resumes.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / resumes.length)
    : 0;

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (res.ok) {
        mutate();
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCreateNew = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "My New Resume",
          templateId: "ats-classic"
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.resume && data.resume.id) {
          router.push(`/builder?id=${data.resume.id}`);
          return;
        }
      }
      // Fallback
      router.push("/builder");
    } catch (error) {
      console.error(error);
      router.push("/builder");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

      {/* Hero Section */}
      <div className="animate-fade-in-up flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {user?.name?.split(" ")[0]}{" "}
            <span className="text-4xl animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your resumes, track ATS scores, and improve your job chances.</p>
        </div>
        <div className="flex gap-4 animate-fade-in-up-delay-1">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-shadow hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Resumes</p>
              <p className="text-2xl font-bold text-slate-900 leading-none mt-1">{resumes.length}</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-shadow hover:shadow-md">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg ATS Score</p>
              <p className="text-xl font-bold text-slate-900 leading-none mt-1">
                {averageAtsScore > 0 ? `${averageAtsScore}%` : <span className="text-sm font-medium text-slate-500">Not checked yet</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* Action Cards */}
        <div className="grid sm:grid-cols-2 gap-6 animate-fade-in-up-delay-2">
          <button onClick={handleCreateNew} disabled={creating} className="block h-full group text-left">
            <Card className="h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-0 shadow-[0_8px_30px_rgb(37,99,235,0.2)] overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(37,99,235,0.3)]">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                <FileText className="w-32 h-32 transform rotate-12" />
              </div>
              <CardHeader className="relative z-10 pb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                  {creating ? <Loader2 className="w-6 h-6 text-white animate-spin" /> : <Plus className="w-6 h-6 text-white" />}
                </div>
                <CardTitle className="text-2xl font-bold text-white">Create New Resume</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-blue-100/90 mb-6 font-medium leading-relaxed">Build an ATS-optimized resume from scratch using our guided step-by-step wizard.</p>
                <div className="inline-flex items-center text-white font-semibold group-hover:underline decoration-2 underline-offset-4">
                  {creating ? "Creating..." : "Start Building"} <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </button>

          <Link href="/upload" className="block h-full group">
            <Card className="h-full bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-50 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-900">Import Existing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 mb-6 font-medium leading-relaxed">Upload an existing PDF or DOCX resume to parse its content and get instant ATS feedback.</p>
                <div className="inline-flex items-center text-blue-600 font-semibold group-hover:underline decoration-2 underline-offset-4">
                  Upload Resume <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Resumes */}
        <div className="space-y-4 animate-fade-in-up-delay-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Resumes</h2>
            {resumes.length > 0 && (
              <Link href="/dashboard/resumes" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                View All
              </Link>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {resumes.slice(0, 4).map((resume: any) => (
              <div key={resume.id} className="group transition-all duration-300 hover:-translate-y-1">
                <Card className="border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer relative bg-white overflow-hidden">
                  <button
                    onClick={() => handleDelete(resume.id)}
                    disabled={deletingId === resume.id}
                    className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-500 bg-white/90 rounded-md backdrop-blur-sm shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="aspect-[2/1] bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100 flex items-center justify-center relative overflow-hidden group-hover:from-blue-50/50 group-hover:to-slate-50 transition-colors">
                    <FileText className="w-12 h-12 text-slate-300 group-hover:text-blue-200 transition-colors" />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                      {resume.atsScore > 0 ? (
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                          resume.atsScore >= 80 ? "bg-green-100 text-green-700" :
                          resume.atsScore >= 50 ? "bg-amber-100 text-amber-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          ATS: {resume.atsScore}%
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm bg-slate-100 text-slate-500">
                          Not Checked
                        </span>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">{resume.title}</h3>
                    <p className="text-xs font-medium text-slate-400 mt-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Updated {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                      <Link href={`/builder?id=${resume.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-slate-50 hover:bg-slate-100">
                          <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}

            {resumes.length === 0 && (
              <div className="col-span-2 text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <FileText className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No resumes yet</h3>
                <p className="text-slate-500 mt-1 mb-4">Create your first resume to get started.</p>
                <Link href="/builder">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Create Resume
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
