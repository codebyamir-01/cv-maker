"use client";

import { useState } from "react";

type Result = { pages: number; checkedPages: number; text: string };

export function PdfReadabilityCheck({ onUseText }: { onUseText: (text: string) => void }) {
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function check(file?: File) {
    setResult(null);
    setMessage("");
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) return setMessage("Choose a PDF file.");
    if (file.size > 10 * 1024 * 1024) return setMessage("Choose a PDF smaller than 10 MB.");
    setBusy(true);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const task = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()), useSystemFonts: true });
      try {
        const document = await task.promise;
        const checkedPages = Math.min(document.numPages, 10);
        const pages: string[] = [];
        for (let number = 1; number <= checkedPages; number++) {
          const page = await document.getPage(number);
          const content = await page.getTextContent();
          pages.push(content.items.map((item) => "str" in item ? item.str : "").join(" ").trim());
          page.cleanup();
        }
        setResult({ pages: document.numPages, checkedPages, text: pages.join("\n\n") });
      } finally { await task.destroy(); }
    } catch {
      setMessage("This PDF could not be read here. It may be damaged, encrypted, or use an unsupported format. Try exporting a new PDF with selectable text.");
    } finally { setBusy(false); }
  }

  return <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
    <h3 className="text-sm font-bold text-slate-900">Check whether your PDF text can be read</h3>
    <p className="mt-1 text-xs leading-5 text-slate-600">This check runs in your browser. The PDF is not uploaded or saved by this tool. It checks text extraction only, not an employer&apos;s ATS or hiring decision.</p>
    <label className="mt-4 block text-sm font-semibold text-blue-700">Choose a PDF (up to 10 MB)<input type="file" accept="application/pdf,.pdf" disabled={busy} onChange={(event) => void check(event.target.files?.[0])} className="mt-2 block w-full text-xs text-slate-700 file:mr-3 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white" /></label>
    {busy && <p role="status" className="mt-3 text-sm text-slate-600">Reading PDF text...</p>}
    {message && <p role="alert" className="mt-3 text-sm text-red-700">{message}</p>}
    {result && <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm"><p className="font-semibold text-slate-900">{result.text.trim().length > 30 ? "Text found" : "Little or no text found"}</p><p className="mt-1 text-slate-600">{result.text.trim().length} text characters extracted from {result.checkedPages} of {result.pages} page{result.pages === 1 ? "" : "s"}.</p>{result.pages > 10 && <p className="mt-1 text-amber-700">Only the first 10 pages were checked.</p>}{result.text.trim().length > 30 ? <><p className="mt-3 text-xs text-slate-500">Preview: {result.text.slice(0, 420)}{result.text.length > 420 ? "…" : ""}</p><button type="button" onClick={() => onUseText(result.text)} className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">Use extracted text in matcher</button></> : <p className="mt-3 text-slate-600">The file may be a scan or image-only PDF. Export it with selectable text, then check again.</p>}</div>}
  </div>;
}
