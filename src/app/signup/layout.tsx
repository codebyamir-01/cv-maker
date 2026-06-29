import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Sign Up — Smart Resume Maker",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
