"use client";

import { X, Download, Star, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface DownloadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadAgain: () => void;
  isDownloading: boolean;
  feedbackRating: number;
  feedbackSubmitted: boolean;
  onFeedbackSubmit: (rating: number) => void;
}

export function DownloadSuccessModal({
  isOpen,
  onClose,
  onDownloadAgain,
  isDownloading,
  feedbackRating,
  feedbackSubmitted,
  onFeedbackSubmit,
}: DownloadSuccessModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden animate-[scale-in_0.3s_ease-out]">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full text-slate-400 hover:bg-slate-100 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Green top banner */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-8 pt-10 pb-8 text-center text-white">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-white/20 ring-4 ring-white/30">
            <Download className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold mb-1">Resume Downloaded! 🎉</h2>
          <p className="text-emerald-100 text-sm font-medium">
            Your CV is saved as a PDF — ready to send to employers!
          </p>
        </div>

        {/* Feedback section */}
        <div className="px-8 py-6 text-center">
          {!feedbackSubmitted ? (
            <>
              <p className="text-slate-800 font-bold text-base mb-1">How was your experience?</p>
              <p className="text-slate-500 text-sm mb-5">Your feedback helps us improve the builder.</p>

              {/* Star rating */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onFeedbackSubmit(star)}
                    className="group transition-transform hover:scale-125 active:scale-110"
                    aria-label={`${star} star`}
                  >
                    <Star
                      className={`h-9 w-9 transition-colors ${
                        star <= feedbackRating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-200 group-hover:fill-amber-300 group-hover:text-amber-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
              >
                Skip feedback
              </button>
            </>
          ) : (
            <div className="py-4 flex flex-col items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50">
                <ThumbsUp className="h-6 w-6 text-emerald-500" />
              </div>
              <p className="font-bold text-slate-800">Thank you for your feedback!</p>
              <p className="text-sm text-slate-500">We appreciate you taking the time. 😊</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-8 pb-7 flex flex-col gap-2.5">
          <button
            onClick={onDownloadAgain}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-black transition-colors disabled:opacity-60"
          >
            <Download className="h-4 w-4" />
            Download Again
          </button>
          <button
            onClick={() => { onClose(); router.push("/dashboard"); }}
            className="inline-flex items-center justify-center w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadSuccessModal;
