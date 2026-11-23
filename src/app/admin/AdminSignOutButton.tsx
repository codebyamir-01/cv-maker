"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function AdminSignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}
