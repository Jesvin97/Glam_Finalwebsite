import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import type { BlogItem } from "@/components/Blogs";
import JsonLd from "@/components/JsonLd";
import { fetchList } from "@/sanity/fetch";
import { breadcrumbList } from "@/lib/schema";
import { BUSINESS_NAME } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog-posts";

// Re-checked every 15 minutes so scheduled posts appear soon after their publish time.
export const revalidate = 900;

const TITLE = `Beauty Tips | ${BUSINESS_NAME}, Thiruvalla`;
const DESCRIPTION =
  "Hair care, skin care and bridal makeup tips from the stylists at Glam'more Premium Unisex Salon in Thukalassery, Thiruvalla.";

const POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc)`;

// Posts from the CMS plus the scheduled posts whose publish time has passed, newest first.
async function loadBlogs(): Promise<BlogItem[]> {
  const cms = await fetchList<BlogItem>(POSTS_QUERY);
  const scheduled: BlogItem[] = getPublishedPosts().map((p) => ({
    title: p.title,
    description: (p.intro || p.metaDescription).replaceAll("**", ""),
    category: p.category,
    image: p.cover,
    _id: p.slug,
    publishedAt: p.publishAt,
    href: `/blogs/${p.slug}`,
  }));
  return [...cms, ...scheduled].sort(
    (a, b) => Date.parse(b.publishedAt ?? "") - Date.parse(a.publishedAt ?? "")
  );
}

// With no posts yet this page is only a "coming soon" note, so keep it out of search results
// until there is real content to index. It turns itself back on once a post is published.
export async function generateMetadata(): Promise<Metadata> {
  const blogs = await loadBlogs();
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/blogs" },
    robots: blogs.length > 0 ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "/blogs",
      siteName: BUSINESS_NAME,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
      locale: "en_IN",
      type: "website",
    },
  };
}

export default async function Page() {
  const blogs = await loadBlogs();
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
        ])}
      />
      <BlogsClient blogs={blogs} />
    </>
  );
}
