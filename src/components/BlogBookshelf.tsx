"use client";

import dynamic from "next/dynamic";
import type { NewsletterBookshelfItem } from "@/components/ui/newsletter-bookshelf";

// The 3D shelf is heavy (three.js), so it loads only in the browser, after the page is up.
const NewsletterBookshelf = dynamic(
  () => import("@/components/ui/newsletter-bookshelf").then((m) => m.NewsletterBookshelf),
  { ssr: false, loading: () => <div style={{ height: 520 }} aria-hidden="true" /> },
);

export default function BlogBookshelf({ items }: { items: NewsletterBookshelfItem[] }) {
  return (
    <div className="bookshelf-wrap">
      <NewsletterBookshelf items={items} brand="Glam'more" height={520} />
    </div>
  );
}
