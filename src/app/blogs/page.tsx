import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import type { BlogItem } from "@/components/Blogs";
import JsonLd from "@/components/JsonLd";
import { fetchList } from "@/sanity/fetch";
import { breadcrumbList } from "@/lib/schema";
import { BUSINESS_NAME } from "@/lib/site";

export const revalidate = 3600;

const TITLE = `Beauty Tips | ${BUSINESS_NAME}, Thiruvalla`;
const DESCRIPTION =
  "Hair care, skin care and bridal makeup tips from the stylists at Glam'more Premium Unisex Salon in Thukalassery, Thiruvalla.";

const POSTS_QUERY = `*[_type == "blog"] | order(publishedAt desc)`;

// With no posts yet this page is only a "coming soon" note, so keep it out of search results
// until there is real content to index. It turns itself back on once a post is published.
export async function generateMetadata(): Promise<Metadata> {
  const blogs = await fetchList<BlogItem>(POSTS_QUERY);
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
  const blogs = await fetchList<BlogItem>(POSTS_QUERY);
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
