export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded-lg w-56" />
          <div className="h-4 bg-slate-100 rounded w-80" />
        </div>
        <div className="flex gap-3">
          <div className="h-16 w-40 bg-slate-100 rounded-2xl" />
          <div className="h-16 w-40 bg-slate-100 rounded-2xl" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Action cards skeleton */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="h-44 bg-slate-200 rounded-2xl" />
          <div className="h-44 bg-slate-100 rounded-2xl border border-slate-200" />
        </div>

        {/* Resumes heading */}
        <div className="h-6 bg-slate-200 rounded w-36" />

        {/* Resume cards skeleton */}
        <div className="grid sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 overflow-hidden">
              <div className="h-28 bg-slate-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-8 bg-slate-100 rounded-lg mt-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
