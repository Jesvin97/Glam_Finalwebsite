// Checks every post in content/blogs before the site is built.
// The blog page is a small hand-written markdown renderer (src/components/BlogArticle.tsx). It shows **bold**,
// [links](/x), "## " headings, "- " and "1. " lists and the FAQ. Anything else would show up on the live page as
// raw characters, and a post with a bad header is skipped without a word. This script turns both into a build error.
//
// Run it with: npm run check:blogs   (it also runs before `npm run build`)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED = ["seo_title", "slug", "meta_description", "category", "publish_at", "cover", "service_link"];

function splitFrontMatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: null, body: raw, bodyStartLine: 1 };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i !== -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const bodyStartLine = raw.slice(0, raw.length - m[2].length).split(/\r?\n/).length;
  return { meta, body: m[2], bodyStartLine };
}

// What is left of a line once the supported bold and link markup is taken out.
const strip = (t) => t.replace(/\*\*(.+?)\*\*/g, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "");

/**
 * ctx = { serviceSlugs: Set, postSlugs: Set, fileExists(publicPath): boolean, routeExists(firstSegment): boolean }
 * Returns { errors: [{line, msg}], warnings: [{line, msg}] }. Errors stop the build, warnings do not.
 */
export function checkPost({ file, raw }, ctx) {
  const errors = [];
  const warnings = [];
  const err = (line, msg) => errors.push({ line, msg });
  const warn = (line, msg) => warnings.push({ line, msg });

  const { meta, body, bodyStartLine } = splitFrontMatter(raw);
  if (!meta) {
    err(1, "the file must start with a --- header block (slug, publish_at ...).");
    return { errors, warnings };
  }

  for (const key of REQUIRED) if (!meta[key]) err(1, `header is missing "${key}".`);
  if (meta.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug)) err(1, `slug "${meta.slug}" must be lowercase words joined by hyphens.`);
  if (meta.publish_at) {
    if (Number.isNaN(Date.parse(meta.publish_at))) err(1, `publish_at "${meta.publish_at}" is not a valid date.`);
    else if (!/(Z|[+-]\d\d:\d\d)$/.test(meta.publish_at)) err(1, `publish_at needs a time zone, for example 2026-11-09T09:00:00+05:30.`);
  }
  if (meta.cover && !ctx.fileExists(meta.cover)) err(1, `cover image ${meta.cover} is not in /public.`);
  if (meta.service_link && !linkOk(meta.service_link, ctx)) err(1, `service_link ${meta.service_link} is not a page on the site.`);
  if (meta.seo_title && meta.seo_title.length > 65) warn(1, `seo_title is ${meta.seo_title.length} characters; Google cuts titles near 60.`);
  if (meta.meta_description && (meta.meta_description.length > 160 || meta.meta_description.length < 70))
    warn(1, `meta_description is ${meta.meta_description.length} characters; aim for 70 to 160.`);

  const lines = body.split(/\r?\n/);
  let titles = 0;
  let inFaq = false;
  let sawFaq = false;
  let firstBlock = null; // "p" or something else
  let para = [];
  let paraLine = 0;

  const flushFaqPara = () => {
    if (inFaq && para.length && !/^\*\*(.+?)\*\*\s*\S/.test(para.join(" ").trim()))
      err(paraLine, `FAQ entry will not show: write it as **Question?** Answer on one paragraph.`);
    para = [];
  };

  lines.forEach((l, idx) => {
    const n = bodyStartLine + idx;
    const s = l.trim();

    if (/^# /.test(l)) { titles += 1; flushFaqPara(); return; }
    if (/^#{3,} /.test(l)) err(n, `"###" subheadings are not supported; use "##" or a bold line.`);
    if (/^##\s*$/.test(l)) err(n, `empty "##" heading.`);
    if (/^## /.test(l)) {
      flushFaqPara();
      const text = l.slice(3).trim();
      inFaq = /^faq$/i.test(text);
      sawFaq = sawFaq || inFaq;
      if (/[*_`\[]/.test(text)) err(n, `headings are shown as plain text; remove the markup from "${text}".`);
      if (firstBlock === null) firstBlock = "h2";
      return;
    }
    if (s === "") { flushFaqPara(); return; }

    if (s.startsWith(">")) err(n, `quotes ("> ...") are not supported.`);
    if (s.startsWith("|")) err(n, `tables are not supported.`);
    if (s.includes("![")) err(n, `images in the text are not supported.`);
    if (s.includes("`")) err(n, `code formatting with backticks is not supported.`);
    if (/^(---|\*\*\*|___)$/.test(s)) err(n, `horizontal rules are not supported.`);
    if (/<\/?[a-z][^>]*>/i.test(s)) err(n, `HTML is shown as plain text.`);
    if (/^\s{2,}(?:[-*]|\d+\.) /.test(l)) err(n, `nested lists are not supported.`);

    const isList = /^\s*(?:[-*]|\d+\.) /.test(l);
    const content = isList ? l.replace(/^\s*(?:[-*]|\d+\.) /, "") : s;
    const left = strip(content);
    if (left.includes("**")) err(n, `unbalanced ** (bold must open and close on the same line).`);
    else if (/(?<![\w*])\*[^*\s][^*]*\*(?!\*)/.test(left) || /(?<![\w])_[^_\s][^_]*_(?![\w])/.test(left))
      err(n, `italics are not supported (they would show the * or _ characters).`);

    for (const m of content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g))
      if (!linkOk(m[2], ctx)) err(n, `link ${m[2]} does not go to a page on the site (or is not https).`);

    if (inFaq) {
      if (isList) err(n, `FAQ entries must be paragraphs (**Question?** Answer), not list items.`);
      else { if (!para.length) paraLine = n; para.push(s); }
    } else if (firstBlock === null) {
      firstBlock = isList ? "list" : "p";
      if (firstBlock === "p" && !s.startsWith("**Short answer:**")) warn(n, `the first paragraph usually starts with **Short answer:**.`);
    }
  });
  flushFaqPara();

  if (titles !== 1) err(1, `needs exactly one "# " title line (found ${titles}).`);
  if (firstBlock !== "p") err(1, `the first thing after the title must be the short answer paragraph.`);
  if (!sawFaq) warn(1, `no "## FAQ" section.`);
  return { errors, warnings };
}

function linkOk(href, ctx) {
  if (href.startsWith("#") || href.startsWith("https://")) return true;
  if (!href.startsWith("/")) return false;
  const p = href.split("#")[0] || "/";
  if (p === "/") return true;
  const [first, second] = p.split("/").filter(Boolean);
  if (first === "services" && second) return ctx.serviceSlugs.has(second);
  if (first === "blogs" && second) return ctx.postSlugs.has(second);
  return ctx.routeExists(first);
}

export function checkAll(root) {
  const dir = path.join(root, "content", "blogs");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort() : [];
  const servicesSrc = fs.readFileSync(path.join(root, "src", "lib", "service-pages.ts"), "utf8");
  const raws = files.map((file) => ({ file, raw: fs.readFileSync(path.join(dir, file), "utf8") }));
  const postSlugs = new Set(raws.map(({ raw }) => splitFrontMatter(raw).meta?.slug).filter(Boolean));
  const ctx = {
    serviceSlugs: new Set([...servicesSrc.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1])),
    postSlugs,
    fileExists: (p) => fs.existsSync(path.join(root, "public", p)),
    routeExists: (first) => fs.existsSync(path.join(root, "src", "app", first, "page.tsx")),
  };
  const seen = new Map();
  return raws.map((post) => {
    const result = checkPost(post, ctx);
    const slug = splitFrontMatter(post.raw).meta?.slug;
    if (slug && seen.has(slug)) result.errors.push({ line: 1, msg: `slug "${slug}" is already used by ${seen.get(slug)}.` });
    if (slug) seen.set(slug, post.file);
    return { file: post.file, ...result };
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const results = checkAll(process.cwd());
  let bad = 0;
  for (const r of results) {
    if (!r.errors.length && !r.warnings.length) continue;
    console.log(`${r.errors.length ? "✖" : "!"} content/blogs/${r.file}`);
    for (const e of r.errors) console.log(`    line ${e.line}: ${e.msg}`);
    for (const w of r.warnings) console.log(`    line ${w.line}: (warning) ${w.msg}`);
    bad += r.errors.length;
  }
  if (bad) {
    console.error(`\nBlog check failed: ${bad} problem(s). Fix them, or the post would show broken or be skipped.`);
    process.exit(1);
  }
  console.log(`Blog check passed: ${results.length} post(s).`);
}
