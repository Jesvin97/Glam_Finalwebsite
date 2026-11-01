import type { MetadataRoute } from "next";
import { fetchList } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";

// Dates are the last time each page's content really changed. Update them when you edit a page,
// because a date that is always "today" teaches Google to ignore it.
// /blogs is only listed once there is at least one post, matching its noindex.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const HOME_UPDATED = "2026-10-08";
  const SERVICES_UPDATED = "2026-10-31";
  const FAQ_UPDATED = "2026-10-02";
  const posts = await fetchList<{ _id: string }>(`*[_type == "blog"]{_id}`);

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: HOME_UPDATED, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: SERVICES_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((p) => ({
      url: `${SITE_URL}/services/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/faq`, lastModified: FAQ_UPDATED, changeFrequency: "monthly", priority: 0.7 },
  ];
  if (posts.length > 0) {
    pages.push({ url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 });
  }
  return pages;
}
