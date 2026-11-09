// Tests for the scheduled blog logic in src/lib/blog-posts.ts.
// Run with: npm test   (uses Node's built-in test runner, no extra packages)
import test from "node:test";
import assert from "node:assert/strict";
import { getAllPosts, getPublishedPosts, getPostBySlug, isPublished } from "../src/lib/blog-posts.ts";

const at = (iso) => Date.parse(iso);
const posts = getAllPosts();
const weekdayIST = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
const timeIST = (iso) =>
  new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

test("loads all 15 posts with unique slugs", () => {
  assert.equal(posts.length, 15);
  assert.equal(new Set(posts.map((p) => p.slug)).size, 15);
});

test("every post has the fields the page needs", () => {
  for (const p of posts) {
    assert.ok(p.title, `${p.slug}: title`);
    assert.ok(p.seoTitle.length <= 65, `${p.slug}: SEO title too long (${p.seoTitle.length})`);
    assert.ok(p.metaDescription.length > 0 && p.metaDescription.length <= 160, `${p.slug}: meta description length ${p.metaDescription.length}`);
    assert.ok(p.intro.length > 0, `${p.slug}: short answer`);
    assert.ok(p.blocks.length > 0, `${p.slug}: body`);
    assert.equal(p.faq.length, 3, `${p.slug}: FAQ count`);
    assert.ok(p.serviceLink.startsWith("/"), `${p.slug}: service link`);
    assert.ok(p.cover.startsWith("/images/"), `${p.slug}: cover`);
    assert.ok(p.salonKeywords.length > 0, `${p.slug}: salon keywords`);
  }
});

test("FAQ answers are separated from their questions", () => {
  for (const p of posts) {
    for (const f of p.faq) {
      assert.ok(f.question.endsWith("?"), `${p.slug}: question "${f.question}"`);
      assert.ok(f.answer.length > 0, `${p.slug}: empty answer`);
      assert.ok(!f.answer.includes("**"), `${p.slug}: stray markdown in answer`);
    }
  }
});

test("schedule is Monday, Wednesday, Friday at 9:00 IST, starting 9 Nov 2026", () => {
  const days = ["Monday", "Wednesday", "Friday"];
  posts.forEach((p, i) => {
    assert.equal(weekdayIST(p.publishAt), days[i % 3], `${p.slug}: weekday`);
    assert.equal(timeIST(p.publishAt), "09:00", `${p.slug}: time`);
  });
  assert.equal(posts[0].publishAt, "2026-11-09T09:00:00+05:30");
  assert.equal(posts[14].publishAt, "2026-12-11T09:00:00+05:30");
});

test("dates strictly increase and files are numbered in publish order", () => {
  for (let i = 1; i < posts.length; i++) {
    assert.ok(at(posts[i].publishAt) > at(posts[i - 1].publishAt));
  }
  assert.equal(posts[0].slug, "grey-hair-turned-purple-after-black-dye");
});

test("nothing is published before Monday 9:00 IST", () => {
  assert.equal(getPublishedPosts(at("2026-11-08T12:00:00+05:30")).length, 0);
  assert.equal(getPublishedPosts(at("2026-11-09T08:59:59+05:30")).length, 0);
});

test("post 1 goes live exactly at Monday 9:00 IST", () => {
  const live = getPublishedPosts(at("2026-11-09T09:00:00+05:30"));
  assert.equal(live.length, 1);
  assert.equal(live[0].slug, "grey-hair-turned-purple-after-black-dye");
  assert.equal(isPublished(posts[0], at("2026-11-09T09:00:00+05:30")), true);
  assert.equal(isPublished(posts[0], at("2026-11-09T08:59:59+05:30")), false);
});

test("a new post appears on Wednesday and Friday, not in between", () => {
  assert.equal(getPublishedPosts(at("2026-11-10T20:00:00+05:30")).length, 1); // Tuesday
  assert.equal(getPublishedPosts(at("2026-11-11T08:59:00+05:30")).length, 1);
  assert.equal(getPublishedPosts(at("2026-11-11T09:00:00+05:30")).length, 2); // Wednesday
  assert.equal(getPublishedPosts(at("2026-11-12T12:00:00+05:30")).length, 2); // Thursday
  assert.equal(getPublishedPosts(at("2026-11-13T09:00:00+05:30")).length, 3); // Friday
  assert.equal(getPublishedPosts(at("2026-11-15T12:00:00+05:30")).length, 3); // weekend
  assert.equal(getPublishedPosts(at("2026-11-16T09:00:00+05:30")).length, 4); // next Monday
});

test("all 15 are live after the last date, newest first", () => {
  const live = getPublishedPosts(at("2026-12-12T00:00:00+05:30"));
  assert.equal(live.length, 15);
  for (let i = 1; i < live.length; i++) {
    assert.ok(at(live[i - 1].publishAt) > at(live[i].publishAt));
  }
});

test("publish time is read in IST, not UTC", () => {
  // 03:30 UTC on 9 Nov is exactly 09:00 IST.
  assert.equal(getPublishedPosts(at("2026-11-09T03:29:59Z")).length, 0);
  assert.equal(getPublishedPosts(at("2026-11-09T03:30:00Z")).length, 1);
});

test("looking a post up by slug works, unknown slugs return nothing", () => {
  assert.equal(getPostBySlug("threading-vs-waxing-face")?.category, "Brows & Hair Removal");
  assert.equal(getPostBySlug("does-not-exist"), undefined);
});

test("internal links in posts point at real site paths", () => {
  const allowed = [/^\/services(\/[a-z-]+)?$/, /^\/#contact$/];
  for (const p of posts) {
    const text = [p.intro, ...p.blocks.map((b) => JSON.stringify(b)), ...p.faq.map((f) => f.answer)].join(" ");
    for (const m of text.matchAll(/\]\((\/[^)]*)\)/g)) {
      assert.ok(allowed.some((r) => r.test(m[1])), `${p.slug}: unexpected link ${m[1]}`);
    }
  }
});
