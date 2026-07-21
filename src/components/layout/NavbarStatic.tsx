import Link from "next/link";
import { LogoIcon } from "@/components/ui/LogoIcon";

/**
 * NavbarStatic - Pure Server Component, zero client JS, no useSession call.
 * Mobile menu uses native <details>/<summary> HTML - no JS needed.
 * This avoids blocking FCP with useSession() hydration cost.
 */
export function NavbarStatic() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/builder", label: "Builder" },
    { href: "/templates", label: "Templates" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 border-b border-slate-200/60" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
              Smart <span className="text-blue-600">Resume Maker</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-blue-600">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 text-[15px] font-semibold shadow-md transition-colors">
              Log In
            </Link>
          </div>

          {/* Mobile Hamburger - pure CSS, zero JS */}
          <details className="relative lg:hidden group">
            <summary className="list-none cursor-pointer p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none" aria-label="Toggle menu">
              {/* Hamburger icon - shown when closed */}
              <svg className="w-6 h-6 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* X icon - shown when open */}
              <svg className="w-6 h-6 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </summary>

            {/* Mobile Menu Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">
              <nav className="flex flex-col p-3 space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2 px-1 pb-1">
                  <Link href="/login" className="inline-flex items-center justify-center w-full rounded-xl bg-slate-900 text-white h-11 text-sm font-bold hover:bg-black transition-colors">
                    Log In
                  </Link>
                  <Link href="/signup" className="inline-flex items-center justify-center w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-11 text-sm font-bold transition-colors">
                    Get Started Free
                  </Link>
                </div>
              </nav>
            </div>
          </details>

        </div>
      </header>
    </>
  );
}