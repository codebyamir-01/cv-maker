"use client";

import { useState, useRef, useEffect, useCallback, RefObject } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useResumeStore } from "@/store/useResumeStore";
import { trackGa4Event } from "@/components/analytics/Ga4Tracker";

interface UsePdfDownloadOptions {
  printRef: RefObject<HTMLDivElement | null>;
  onAutoDownloadJump?: () => void;
}

export function usePdfDownload({ printRef, onAutoDownloadJump }: UsePdfDownloadOptions) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const { resumeData } = useResumeStore();

  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const downloadInProgress = useRef(false);

  const handleDownloadPdf = useCallback(async () => {
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/builder%3Faction%3Ddownload");
      return;
    }

    if (downloadInProgress.current) return;
    if (!printRef.current) return;

    downloadInProgress.current = true;
    setIsDownloading(true);
    try {
      const element = printRef.current;
      await new Promise((r) => setTimeout(r, 500));

      const domtoimage = (await import("dom-to-image-more")).default;
      const jsPDF = (await import("jspdf")).default;

      const scale = 2;
      const imgData = await domtoimage.toJpeg(element, {
        quality: 1.0,
        bgcolor: "#ffffff",
        width: element.clientWidth * scale,
        height: element.clientHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.clientWidth}px`,
          height: `${element.clientHeight}px`,
        },
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (element.clientHeight * pdfWidth) / element.clientWidth;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = position - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const filename = resumeData.personalInfo?.fullName
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";

      pdf.save(filename);
      trackGa4Event("resume_downloaded");
      // Show success + feedback modal after download
      setShowSuccessModal(true);
    } catch (error: unknown) {
      console.error("PDF generation error:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      alert(`Download failed: ${message}`);
    } finally {
      downloadInProgress.current = false;
      setIsDownloading(false);
    }
  }, [status, printRef, router, resumeData]);

  // Auto-trigger download after returning from login
  const hasAutoDownloaded = useRef(false);
  useEffect(() => {
    if (
      status === "authenticated" &&
      searchParams.get("action") === "download" &&
      !hasAutoDownloaded.current
    ) {
      hasAutoDownloaded.current = true;
      if (onAutoDownloadJump) {
        onAutoDownloadJump();
      }
      setTimeout(() => {
        handleDownloadPdf();
      }, 1200);
      window.history.replaceState(null, "", "/builder");
    }
  }, [status, searchParams, onAutoDownloadJump, handleDownloadPdf]);

  const submitFeedback = (rating: number) => {
    setFeedbackRating(rating);
    setFeedbackSubmitted(true);
    setTimeout(() => setShowSuccessModal(false), 1800);
  };

  return {
    isDownloading,
    showSuccessModal,
    setShowSuccessModal,
    feedbackRating,
    feedbackSubmitted,
    submitFeedback,
    handleDownloadPdf,
  };
}

export default usePdfDownload;
