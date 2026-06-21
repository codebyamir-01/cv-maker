import Link from "next/link";
import { Plus, FileText, Upload, MoreVertical, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const resumes = user ? await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  }) : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome to your Dashboard, {session.user.name?.split(" ")[0]}</h1>
        <p className="text-slate-600 mt-2">Manage your resumes, track ATS scores, and improve your job chances.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Create New Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-100 mb-6">Build an ATS-optimized resume from scratch using our guided step-by-step wizard.</p>
            <Link href="/builder">
              <Button className="bg-white text-blue-700 hover:bg-slate-100 w-full h-12 text-lg rounded-xl font-semibold">
                <Plus className="mr-2 w-5 h-5" /> Start Building
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm bg-white hover:border-blue-200 hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Upload className="text-blue-600 w-5 h-5" /> Import Existing Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-6">Upload an existing PDF or DOCX resume to parse its content and get instant ATS feedback.</p>
            <Link href="/upload">
              <Button variant="outline" className="w-full h-12 text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold">
                Upload Resume
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Resumes</h2>
          {resumes.length > 0 && (
            <Link href="/dashboard/resumes" className="text-blue-600 font-medium hover:underline">
              View All
            </Link>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <Card key={resume.id} className="border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer relative overflow-hidden">
              <div className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-white/80 rounded-md backdrop-blur-sm shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-5 h-5" />
              </div>
              <div className="aspect-[1/1.4] bg-slate-100 border-b border-slate-200 flex items-center justify-center relative">
                 <FileText className="w-16 h-16 text-slate-300" />
                 <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-4">
                    <div className="flex items-center justify-between">
                       <span className="text-white font-bold bg-green-500/90 px-2 py-1 rounded text-xs">ATS Score: {resume.atsScore}%</span>
                    </div>
                 </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-slate-900 truncate">{resume.title}</h3>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}

          <Link href="/builder" className="block">
            <Card className="border-2 border-dashed border-slate-300 shadow-none hover:border-blue-400 hover:bg-blue-50/50 transition-colors h-full flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900">Create New</h3>
              <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
