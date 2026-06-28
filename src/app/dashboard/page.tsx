import { Metadata } from "next";
import DashboardContent from "./DashboardContent";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardContent />;
}
