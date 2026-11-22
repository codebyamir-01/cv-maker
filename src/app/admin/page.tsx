import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, FileText, Activity, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  // Server-side ADMIN role check — redirect any non-admin immediately
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (!user || user.role !== "ADMIN") {
    // Non-admin authenticated users get a 404-style redirect to dashboard
    redirect("/dashboard");
  }

  const [userCount, resumeCount, score, recentResumes] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.resume.aggregate({ _avg: { atsScore: true } }),
    prisma.resume.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true, user: { select: { email: true } } },
    }),
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Manage users, view analytics, and configure settings.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Users className="w-4 h-4" /> Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{userCount.toLocaleString()}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Resumes Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{resumeCount.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Avg ATS Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{Math.round(score._avg.atsScore ?? 0)}%</div>
              <p className="text-xs text-slate-500 mt-1">Across all users</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentResumes.length === 0 ? <p className="text-sm text-slate-500">No resumes created yet.</p> : (
              <ul className="divide-y divide-slate-200 text-sm">
                {recentResumes.map((resume) => (
                  <li key={resume.id} className="flex flex-wrap justify-between gap-2 py-3">
                    <span className="font-medium text-slate-800">{resume.title}</span>
                    <span className="text-slate-500">{resume.user.email} · {resume.createdAt.toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
