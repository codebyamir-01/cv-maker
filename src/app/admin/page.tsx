import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Users, FileText, Activity, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGa4FunnelReport, getSearchConsoleReport } from "@/lib/google-reporting";

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

  const [userCount, resumeCount, score, recentResumes, seo, funnel] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.resume.aggregate({ _avg: { atsScore: true } }),
    prisma.resume.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true, user: { select: { email: true } } },
    }),
    getSearchConsoleReport(),
    getGa4FunnelReport(),
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

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Google Search Console</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {seo.status === "setup_required" ? <p className="text-sm text-slate-600">Setup required: add a read-only service account and the Search Console site property. No historical CSV is shown as live data.</p> :
                seo.status === "error" ? <p className="text-sm text-amber-700">{seo.message}</p> : <>
                  <p className="text-xs text-slate-500">Live API · {seo.startDate} to {seo.endDate} · Updated {new Date(seo.fetchedAt).toLocaleString()}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Impressions</span><p className="text-2xl font-bold">{seo.data.impressions.toLocaleString()}</p></div>
                    <div><span className="text-slate-500">Clicks</span><p className="text-2xl font-bold">{seo.data.clicks.toLocaleString()}</p></div>
                    <div><span className="text-slate-500">CTR</span><p className="text-2xl font-bold">{(seo.data.ctr * 100).toFixed(2)}%</p></div>
                    <div><span className="text-slate-500">Avg. position</span><p className="text-2xl font-bold">{seo.data.position.toFixed(1)}</p></div>
                  </div>
                  <h3 className="font-semibold text-slate-800">Top pages by clicks</h3>
                  {seo.data.pages.length === 0 ? <p className="text-sm text-slate-500">No page data in this period.</p> : <ul className="divide-y text-sm">
                    {seo.data.pages.map(page => <li key={page.url} className="py-2 flex justify-between gap-3"><span className="break-all text-slate-700">{page.url}</span><span className="shrink-0">{page.clicks} clicks</span></li>)}
                  </ul>}
                </>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Builder → Download</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {funnel.status === "setup_required" ? <p className="text-sm text-slate-600">Setup required: configure GA4 collection and read-only reporting access. Conversion counts will appear after consented visitors generate events.</p> :
                funnel.status === "error" ? <p className="text-sm text-amber-700">{funnel.message}</p> : <>
                  <p className="text-xs text-slate-500">Live GA4 API · {funnel.startDate} to {funnel.endDate} · Updated {new Date(funnel.fetchedAt).toLocaleString()}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Builder opens</span><p className="text-2xl font-bold">{funnel.data.builderOpened.toLocaleString()}</p></div>
                    <div><span className="text-slate-500">PDF downloads</span><p className="text-2xl font-bold">{funnel.data.resumeDownloaded.toLocaleString()}</p></div>
                  </div>
                  <p className="text-xs text-slate-500">Event counts from consented visits. These counts do not establish a same-user conversion rate.</p>
                </>}
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
