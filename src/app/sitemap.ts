import type { MetadataRoute } from "next";
import { fetchList } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";
import { getPublishedPosts } from "@/lib/blog-posts";

// Rebuilt every 15 minutes so a scheduled blog post is listed soon after it goes live.
export const revalidate = 900;

// Dates are the last time each page's content really changed. Update them when you edit a page,
// because a date that is always "today" teaches Google to ignore it.
// /blogs is only listed once there is at least one post, matching its noindex.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const HOME_UPDATED = "2026-11-02";
  const SERVICES_UPDATED = "2026-11-02";
  const FAQ_UPDATED = "2026-10-02";
  const posts = await fetchList<{ _id: string }>(`*[_type == "blog"]{_id}`);

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: HOME_UPDATED },
    { url: `${SITE_URL}/services`, lastModified: SERVICES_UPDATED },
    ...servicePages.map((p) => ({
      url: `${SITE_URL}/services/${p.slug}`,
      lastModified: p.updated,
    })),
    { url: `${SITE_URL}/faq`, lastModified: FAQ_UPDATED },
  ];
  const scheduled = getPublishedPosts();
  if (posts.length + scheduled.length > 0) {
    pages.push({ url: `${SITE_URL}/blogs`, lastModified: new Date() });
  }
  for (const p of scheduled) {
    pages.push({ url: `${SITE_URL}/blogs/${p.slug}`, lastModified: new Date(p.publishAt) });
  }
  return pages;
}
