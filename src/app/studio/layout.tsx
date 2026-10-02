import type { Metadata } from "next";

// The content editor must never show up in search results (robots.txt only blocks crawling).
export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: LayoutProps<"/studio">) {
  return children;
}
