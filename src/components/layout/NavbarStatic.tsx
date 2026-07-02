import Link from "next/link";
import { LogoIcon } from "@/components/ui/LogoIcon";

export function NavbarStatic() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/builder", label: "Builder" },
    { href: "/templates", label: "Templates" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 border-b border-slate-200/60" style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-600">
            <LogoIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
            Smart <span className="text-blue-600">Resume Maker</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-blue-600">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 h-11 text-[15px] font-semibold shadow-md transition-colors">
            Log In
          </Link>
        </div>

        <div className="flex md:hidden items-center">
          <Link href="/builder" className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 h-9 text-sm font-bold">
            Build Free
          </Link>
        </div>
      </div>
    </header>
  );
}