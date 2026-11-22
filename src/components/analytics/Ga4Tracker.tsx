"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export function trackGa4Event(name: "builder_opened" | "resume_downloaded") {
  if (typeof window === "undefined" || !measurementId) return;
  if (localStorage.getItem("cookieConsent") !== "accepted") return;
  window.gtag?.("event", name);
}

export function Ga4Tracker() {
  const pathname = usePathname();
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const update = () => setAccepted(localStorage.getItem("cookieConsent") === "accepted");
    update();
    window.addEventListener("cookie-consent-changed", update);
    return () => window.removeEventListener("cookie-consent-changed", update);
  }, []);

  useEffect(() => {
    if (!accepted || !measurementId) return;
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => { window.dataLayer?.push(args); };
      window.gtag("js", new Date());
      window.gtag("config", measurementId);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(script);
    }
    if (pathname === "/builder" && !sessionStorage.getItem("ga4-builder-opened")) {
      sessionStorage.setItem("ga4-builder-opened", "1");
      trackGa4Event("builder_opened");
    }
  }, [accepted, pathname]);

  return null;
}
