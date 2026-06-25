import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-12">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Loading dashboard...</p>
      </div>
    </div>
  );
}
