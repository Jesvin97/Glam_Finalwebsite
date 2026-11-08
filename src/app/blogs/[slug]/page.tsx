import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import BlogArticle from "@/components/BlogArticle";
import { breadcrumbList } from "@/lib/schema";
import { getAllPosts, getPostBySlug, isPublished } from "@/lib/blog-posts";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";

// Re-checked every 15 minutes, so a post goes live shortly after its publish time and no later than
// 15 minutes past it. Before that time the URL returns a 404.
export const revalidate = 900;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isPublished(post)) return {};
  const url = `/blogs/${post.slug}`;
  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url,
      siteName: BUSINESS_NAME,
      images: [{ url: post.cover }],
      locale: "en_IN",
      type: "article",
      publishedTime: post.publishAt,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isPublished(post)) notFound();

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.cover}`,
    datePublished: post.publishAt,
    dateModified: post.publishAt,
    inLanguage: "en-IN",
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: BUSINESS_NAME },
    publisher: { "@type": "Organization", name: BUSINESS_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
  };
  const faq =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={article} />
      {faq && <JsonLd data={faq} />}
      <JsonLd
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
          { name: post.title, path: `/blogs/${post.slug}` },
        ])}
      />
      <Navbar />
      <main className="blogs-page">
        <BlogArticle post={post} />
      </main>
      <Footer />
    </>
  );
}
