import fs from "node:fs";
import path from "node:path";

// Scheduled blog posts live in /content/blogs as markdown files. Each one has a `publish_at` date in its
// header. A post is hidden from the blog list, the sitemap and its own URL until that moment has passed.

const CONTENT_DIR = path.join(process.cwd(), "content", "blogs");

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string; // the H1 shown on the page
  seoTitle: string;
  metaDescription: string;
  targetKeyword: string;
  salonKeywords: string[];
  category: string;
  publishAt: string; // ISO string with timezone
  cover: string;
  serviceLink: string;
  intro: string; // the short answer at the top
  blocks: Block[]; // body after the short answer, FAQ excluded
  faq: { question: string; answer: string }[];
}

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2] };
}

function parseBody(body: string) {
  const lines = body.split(/\r?\n/);
  let title = "";
  const blocks: Block[] = [];
  const faq: { question: string; answer: string }[] = [];
  let inFaq = false;
  let para: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      const text = para.join(" ").trim();
      para = [];
      if (!text) return;
      if (inFaq) {
        const q = text.match(/^\*\*(.+?)\*\*\s*(.*)$/);
        if (q) faq.push({ question: q[1].trim(), answer: q[2].trim() });
      } else {
        blocks.push({ type: "p", text });
      }
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list.ordered ? { type: "ol", items: list.items } : { type: "ul", items: list.items });
      list = null;
    }
  };

  for (const line of lines) {
    if (/^# /.test(line)) {
      flushPara();
      flushList();
      title = line.slice(2).trim();
    } else if (/^## /.test(line)) {
      flushPara();
      flushList();
      const text = line.slice(3).trim();
      inFaq = /^faq$/i.test(text);
      if (!inFaq) blocks.push({ type: "h2", text });
    } else if (/^\s*[-*] /.test(line) && !inFaq) {
      flushPara();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(line.replace(/^\s*[-*] /, "").trim());
    } else if (/^\s*\d+\. /.test(line) && !inFaq) {
      flushPara();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(line.replace(/^\s*\d+\. /, "").trim());
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();

  // The first paragraph is the short answer shown at the top.
  let intro = "";
  const first = blocks.findIndex((b) => b.type === "p");
  if (first !== -1 && first === 0) {
    const b = blocks.splice(0, 1)[0];
    if (b.type === "p") intro = b.text;
  }
  return { title, intro, blocks, faq };
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  let files: string[] = [];
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const posts: BlogPost[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { meta, body } = parseFrontMatter(raw);
    if (!meta.slug || !meta.publish_at || Number.isNaN(Date.parse(meta.publish_at))) {
      console.error(`Blog post ${file} skipped: needs a slug and a valid publish_at.`);
      continue;
    }
    const { title, intro, blocks, faq } = parseBody(body);
    posts.push({
      slug: meta.slug,
      title: title || meta.seo_title,
      seoTitle: meta.seo_title ?? title,
      metaDescription: meta.meta_description ?? intro,
      targetKeyword: meta.target_keyword ?? "",
      salonKeywords: (meta.salon_keywords ?? "").split(",").map((s) => s.trim()).filter(Boolean),
      category: meta.category ?? "Beauty",
      publishAt: meta.publish_at,
      cover: meta.cover || "/images/model.jpeg",
      serviceLink: meta.service_link || "/services",
      intro,
      blocks,
      faq,
    });
  }
  posts.sort((a, b) => Date.parse(a.publishAt) - Date.parse(b.publishAt));
  cache = posts;
  return posts;
}

export function isPublished(post: BlogPost, now: number = Date.now()): boolean {
  return Date.parse(post.publishAt) <= now;
}

// Newest first, only posts whose publish time has passed.
export function getPublishedPosts(now: number = Date.now()): BlogPost[] {
  return getAllPosts()
    .filter((p) => isPublished(p, now))
    .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
