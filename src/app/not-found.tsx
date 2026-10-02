import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";
import { BUSINESS_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found | ${BUSINESS_NAME}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
