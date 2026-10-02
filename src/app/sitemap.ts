import type { MetadataRoute } from "next";
import { fetchList } from "@/sanity/fetch";
import { SITE_URL } from "@/lib/site";

// Generated at build time. /blogs is only listed once there is at least one post, matching its noindex.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await fetchList<{ _id: string }>(`*[_type == "blog"]{_id}`);

  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified, changeFrequency: "monthly", priority: 0.7 },
  ];
  if (posts.length > 0) {
    pages.push({ url: `${SITE_URL}/blogs`, lastModified, changeFrequency: "weekly", priority: 0.6 });
  }
  return pages;
}
