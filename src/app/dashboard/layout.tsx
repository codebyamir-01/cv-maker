"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, LogOut, User, Search, Bell, Sparkles, BookOpen, PenTool, BarChart3, ChevronDown, FileText } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/components/ui/LogoIcon";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use session image directly — no extra API call needed
  useEffect(() => {
    if (session?.user?.image) {
      setAvatar(session.user.image);
    }
  }, [session]);

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent && mainContent.scrollTop > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) mainContent.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Resumes", href: "/dashboard/resumes", icon: FileText },
    { name: "Templates", href: "/dashboard/templates", icon: PenTool },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col hidden md:flex shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20 relative">
        <div className="h-20 flex items-center px-6 border-b border-slate-100/50">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
              <LogoIcon className="text-white w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-base tracking-tight text-slate-900 leading-none block truncate">Smart Resume Maker</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mt-0.5">ATS Friendly</span>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Main Menu</div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  prefetch={true}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 group relative ${
                    isActive 
                      ? "text-blue-700 bg-blue-50" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile Card at Bottom */}
        <div className="p-4 m-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-slate-200 shrink-0">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">{session?.user?.name || "User"}</p>
              <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 rounded-lg font-medium transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Top Header Bar */}
        <header className={`h-20 flex items-center justify-between px-8 sticky top-0 z-10 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm" : "bg-transparent"}`}>
          
          {/* Mobile Header elements (shown only on small screens) */}
          <Link href="/" className="flex items-center md:hidden gap-3 active:opacity-70 transition-opacity">
             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="text-white w-4 h-4" />
             </div>
             <span className="font-bold text-lg text-slate-900 tracking-tight">CV Maker</span>
          </Link>

          <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search your resumes, templates..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm shadow-slate-100"
              />
            </div>
          </div>
          
        </header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 overflow-x-hidden overflow-y-auto pb-28 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Floating Dock) */}
      <div className="md:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between w-full max-w-[360px] bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-2xl p-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                prefetch={true}
                className={`relative flex flex-col items-center justify-center w-full h-14 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : "text-slate-500 hover:text-slate-900 active:bg-slate-100"
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "opacity-100" : "opacity-80"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
