"use client";

import Link from "next/link";
import { FileText, LayoutDashboard, Settings, LogOut, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user/profile")
        .then(res => res.json())
        .then(data => {
          if (data.user?.image) setAvatar(data.user.image);
        });
    }
  }, [status]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">CV Maker</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-medium">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/resumes" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
            <FileText className="w-5 h-5" />
            My Resumes
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-slate-500" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">{session?.user?.name || "User"}</p>
              <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Mobile Header */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-4 md:hidden">
          <span className="font-bold text-lg text-slate-900">CV Maker Dashboard</span>
        </header>
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
