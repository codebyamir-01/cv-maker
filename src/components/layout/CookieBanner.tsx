"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] p-4 sm:p-6 md:flex md:items-center md:justify-between font-sans">
      <div className="mb-4 md:mb-0 md:mr-8 flex-1">
        <h3 className="text-sm font-bold text-slate-900 mb-1">We value your privacy</h3>
        <p className="text-sm text-slate-600">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more in our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
        </p>
      </div>
      <div className="flex gap-3 shrink-0">
        <Button variant="outline" onClick={acceptCookies} className="text-slate-600 border-slate-300 hover:bg-slate-50">
          Decline Optional
        </Button>
        <Button onClick={acceptCookies} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          Accept All
        </Button>
      </div>
    </div>
  );
}
