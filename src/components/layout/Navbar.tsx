"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/builder", label: "Builder" },
    { href: "/templates", label: "Templates" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <FileText className="text-slate-800 w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            CV Maker
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-colors ${isActive ? "text-blue-600" : "hover:text-blue-600"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-[120px] h-11 bg-slate-200 animate-pulse rounded-full" />
          ) : session ? (
            <Link href="/dashboard">
              <Button className="bg-slate-900 hover:bg-black text-white rounded-full px-8 h-11 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 h-11 text-[15px] font-semibold shadow-md hover:shadow-lg transition-all">
                Log In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
