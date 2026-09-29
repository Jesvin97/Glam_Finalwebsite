import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import type { BlogItem } from "@/components/Blogs";
import { fetchList } from "@/sanity/fetch";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hair, Skin & Bridal Beauty Tips | Glam'more Salon Thiruvalla",
  description: "Hair care, skin care, and bridal makeup tips from the stylists at Glam'more Unisex Salon in Thukalassery, Thiruvalla.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    url: "/blogs",
    siteName: "Glam'more Unisex Salon",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
};

export default async function Page() {
  const blogs = await fetchList<BlogItem>(`*[_type == "blog"] | order(publishedAt desc)`);
  return <BlogsClient blogs={blogs} />;
}
