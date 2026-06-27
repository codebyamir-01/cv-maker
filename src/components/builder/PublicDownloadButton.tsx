"use client";

import { Download } from "lucide-react";

export default function PublicDownloadButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
    >
      <Download className="h-4 w-4" /> Download PDF
    </button>
  );
}
