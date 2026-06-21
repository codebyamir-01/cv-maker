import Link from "next/link";
import { Plus, FileText, MoreVertical, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function MyResumesPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Resumes</h1>
          <p className="text-slate-600 mt-2">View and manage all your created resumes.</p>
        </div>
        <Link href="/builder">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md rounded-xl h-11 px-5">
            <Plus className="w-4 h-4 mr-2" /> Create New
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search resumes..." 
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm"
          />
        </div>
        <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Placeholder for an existing resume */}
        <Card className="border border-slate-200 shadow-sm hover:border-blue-300 transition-colors group cursor-pointer relative overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 bg-white/80 rounded-md backdrop-blur-sm shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-5 h-5" />
          </div>
          <div className="aspect-[1/1.4] bg-slate-100 border-b border-slate-200 flex items-center justify-center relative flex-shrink-0">
             <FileText className="w-16 h-16 text-slate-300" />
             <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/50 to-transparent p-4">
                <div className="flex items-center justify-between">
                   <span className="text-white font-bold bg-green-500/90 px-2 py-1 rounded text-xs">ATS Score: 85%</span>
                </div>
             </div>
          </div>
          <CardContent className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 truncate">Senior Software Engineer CV</h3>
              <p className="text-xs text-slate-500 mt-1">Updated 2 days ago</p>
            </div>
          </CardContent>
        </Card>

        {/* Create new placeholder */}
        <Link href="/builder" className="block h-full">
          <Card className="border-2 border-dashed border-slate-300 shadow-none hover:border-blue-400 hover:bg-blue-50/50 transition-colors h-full flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-900">Create New</h3>
            <p className="text-sm text-slate-500 mt-1">Start from scratch</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
