"use client";

import { useSearchParams } from "next/navigation";

export function JobRoleHint() {
  const role = useSearchParams().get("jobRole")?.trim().slice(0, 180);
  if (!role) return null;

  return <p className="border-b border-blue-100 bg-blue-50 px-4 py-3 text-center text-sm text-blue-900">
    Preparing a CV for <strong>{role}</strong>. Include only skills and experience you can support; check the original job posting as you write.
  </p>;
}
