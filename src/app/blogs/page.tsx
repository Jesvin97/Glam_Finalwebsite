import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "Expert Beauty & Lifestyle Blogs | Glam'more Journal",
  description: "Read the latest trends in luxury hairstyles, wellness therapies, and professional beauty guides from our expert stylists in Thiruvalla.",
};

export default function Page() {
  return <BlogsClient />;
}
