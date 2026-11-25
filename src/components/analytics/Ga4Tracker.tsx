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

export function trackGa4Event(name: "builder_opened" | "resume_downloaded" | "jobs_builder_clicked" | "jobs_apply_clicked", params?: { jobs_source: "pakistan" | "remote"; jobs_section: string }) {
  if (typeof window === "undefined" || !measurementId) return false;
  if (localStorage.getItem("cookieConsent") !== "accepted" || !window.gtag) return false;
  window.gtag("event", name, params);
  return true;
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
    if (pathname !== "/builder") sessionStorage.removeItem("ga4-builder-entry");
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
    if (pathname === "/builder" && !sessionStorage.getItem("ga4-builder-entry")) {
      if (trackGa4Event("builder_opened")) sessionStorage.setItem("ga4-builder-entry", "1");
    }
  }, [accepted, pathname]);

  return null;
}
