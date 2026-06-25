"use client";

import Link from "next/link";
import { Plus, FileText, Upload, MoreVertical, Clock, CheckCircle2, TrendingUp, Sparkles, Download, Edit, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const chartData = [
  { name: 'Jan', score: 45 },
  { name: 'Feb', score: 52 },
  { name: 'Mar', score: 58 },
  { name: 'Apr', score: 65 },
  { name: 'May', score: 72 },
  { name: 'Jun', score: 85 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function DashboardContent({ user, resumes }: { user: any, resumes: any[] }) {
  const averageAtsScore = resumes.length > 0 
    ? Math.round(resumes.reduce((acc, curr) => acc + (curr.atsScore || 0), 0) / resumes.length)
    : 0;

  return (
    <motion.div 
      className="p-8 max-w-7xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {user?.name?.split(" ")[0]} <span className="text-4xl animate-wave origin-bottom-right inline-block">👋</span>
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Manage your resumes, track ATS scores, and improve your job chances.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Resumes</p>
              <p className="text-2xl font-bold text-slate-900 leading-none mt-1">{resumes.length}</p>
            </div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg ATS Score</p>
              <p className="text-2xl font-bold text-slate-900 leading-none mt-1">{averageAtsScore}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (Left 70%) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Action Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="/builder" className="block h-full">
                <Card className="h-full bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-0 shadow-[0_8px_30px_rgb(37,99,235,0.2)] overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                    <FileText className="w-32 h-32 transform rotate-12" />
                  </div>
                  <CardHeader className="relative z-10 pb-2">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">Create New Resume</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-blue-100/90 mb-6 font-medium leading-relaxed">Build an ATS-optimized resume from scratch using our guided step-by-step wizard.</p>
                    <div className="inline-flex items-center text-white font-semibold group-hover:underline decoration-2 underline-offset-4">
                      Start Building <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link href="/upload" className="block h-full">
                <Card className="h-full bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
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
            </motion.div>
          </div>

          {/* Recent Resumes */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Recent Resumes</h2>
              {resumes.length > 0 && (
                <Link href="/dashboard/resumes" className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                  View All
                </Link>
              )}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {resumes.slice(0, 4).map((resume: any, index: number) => (
                <motion.div key={resume.id} variants={itemVariants} whileHover={{ y: -4 }}>
                  <Card className="border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer relative group bg-white overflow-hidden">
                    <div className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-900 bg-white/90 rounded-md backdrop-blur-sm shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </div>
                    <div className="aspect-[2/1] bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-100 flex items-center justify-center relative overflow-hidden group-hover:from-blue-50/50 group-hover:to-slate-50 transition-colors">
                       <FileText className="w-12 h-12 text-slate-300 group-hover:text-blue-200 transition-colors" />
                       <div className="absolute bottom-3 left-3 flex gap-2">
                         <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                           (resume.atsScore || 0) >= 80 ? "bg-green-100 text-green-700" : 
                           (resume.atsScore || 0) >= 50 ? "bg-amber-100 text-amber-700" : 
                           "bg-red-100 text-red-700"
                         }`}>
                           ATS: {resume.atsScore || 0}%
                         </span>
                       </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">{resume.title}</h3>
                      <p className="text-xs font-medium text-slate-400 mt-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-slate-50 hover:bg-slate-100">
                          <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-xs h-8 bg-slate-50 hover:bg-slate-100">
                          <Download className="w-3.5 h-3.5 mr-1.5" /> Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
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
          </motion.div>

          {/* Analytics Chart */}
          <motion.div variants={itemVariants}>
             <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                <CardHeader className="border-b border-slate-100 pb-4">
                   <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     <BarChart3 className="w-5 h-5 text-blue-600" /> ATS Score Overview
                   </CardTitle>
                   <CardDescription>Track your resume improvement over time</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                   <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                          />
                          <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                      </ResponsiveContainer>
                   </div>
                </CardContent>
             </Card>
          </motion.div>

        </div>

        {/* Right Sidebar Widgets (Right 30%) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Profile Strength */}
          <motion.div variants={itemVariants}>
            <Card className="border border-slate-200 shadow-sm bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-slate-900">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="transparent" 
                        stroke="#2563eb" 
                        strokeWidth="8" 
                        strokeDasharray={`${2 * Math.PI * 40}`} 
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.75)}`} 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-900">75%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Almost there!</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Complete your profile to get better ATS recommendations.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Add Personal Info", done: true },
                    { label: "Add Experience", done: true },
                    { label: "Add Education", done: true },
                    { label: "Add Skills", done: false },
                    { label: "Add Summary", done: false },
                  ].map((task, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                        {task.label}
                      </span>
                      {task.done ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Improve ATS Score */}
          <motion.div variants={itemVariants}>
            <Card className="border border-amber-200 bg-amber-50/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles className="w-24 h-24 text-amber-500 transform rotate-12 translate-x-4 -translate-y-4" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" /> Improve Your ATS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 relative z-10">
                  {[
                    "Add more industry-specific skills",
                    "Use strong action verbs in experience",
                    "Optimize your professional summary",
                    "Quantify your achievements with metrics"
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-3 text-sm text-amber-800/80 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

