"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/ui/LogoIcon";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
    <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-500/30">
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
            Smart <span className="text-blue-600">Resume Maker</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
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
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
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

        {/* Mobile Hamburger Button */}
        <button 
          className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

    </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm" 
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Popup */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed left-4 right-4 top-[72px] sm:top-[88px] bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 z-[60] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col p-3 space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-colors ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-2 px-1 pb-1">
              {status === "loading" ? (
                <div className="w-full h-11 bg-slate-200 animate-pulse rounded-xl" />
              ) : session ? (
                <Link href="/dashboard" onClick={closeMenu}>
                  <Button className="w-full bg-slate-900 text-white rounded-xl h-11 text-sm font-bold">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={closeMenu}>
                    <Button variant="outline" className="w-full rounded-xl h-11 text-sm font-bold border-slate-200 text-slate-700">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={closeMenu}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 text-sm font-bold">
                      Get Started Free
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
