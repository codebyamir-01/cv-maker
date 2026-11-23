"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem("cookieConsent");
      if (consent !== "accepted" && consent !== "declined") {
        setIsVisible(true);
      }
    };

    if (typeof window !== "undefined") {
      type IdleCallbackWindow = Window & {
        requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
        cancelIdleCallback?: (handle: number) => void;
      };
      const win = window as IdleCallbackWindow;
      if (typeof win.requestIdleCallback === "function") {
        const handle = win.requestIdleCallback(checkConsent, { timeout: 2000 });
        return () => win.cancelIdleCallback?.(handle);
      } else {
        const timer = setTimeout(checkConsent, 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const saveConsent = (choice: "accepted" | "declined") => {
    const wasAccepted = localStorage.getItem("cookieConsent") === "accepted";
    localStorage.setItem("cookieConsent", choice);
    window.dispatchEvent(new Event("cookie-consent-changed"));
    setIsVisible(false);
    if (wasAccepted && choice === "declined") window.location.reload();
  };

  if (!isVisible) return <button type="button" onClick={() => setIsVisible(true)} className="fixed bottom-2 left-2 z-40 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm print:hidden">Cookie settings</button>;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] p-4 sm:p-6 md:flex md:items-center md:justify-between font-sans">
      <div className="mb-4 md:mb-0 md:mr-8 flex-1">
        <h3 className="text-sm font-bold text-slate-900 mb-1">We value your privacy</h3>
        <p className="text-sm text-slate-600">
          Essential storage keeps sign-in and saved work available. With your permission, we also use Google Analytics to understand visits and downloads. This choice controls Google Analytics; ad consent is managed separately. Read our <Link href="/cookies" className="text-blue-600 underline hover:text-blue-700 underline-offset-2">Cookie Policy</Link> and <Link href="/privacy" className="text-blue-600 underline hover:text-blue-700 underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <Button variant="outline" onClick={() => saveConsent("declined")} className="text-slate-600 border-slate-300 hover:bg-slate-50">
          Decline Analytics
        </Button>
        <Button onClick={() => saveConsent("accepted")} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          Accept Analytics
        </Button>
      </div>
    </div>
  );
}
