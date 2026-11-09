import test from "node:test";
import assert from "node:assert/strict";
import { checkAll, checkPost } from "../scripts/check-blog-posts.mjs";

const ctx = {
  serviceSlugs: new Set(["hair-colouring"]),
  postSlugs: new Set(["good-post"]),
  fileExists: (p) => p === "/images/cover.jpg",
  routeExists: (first) => ["faq", "services", "blogs"].includes(first),
};

const header = (extra = "") =>
  `---\nseo_title: A title\nslug: good-post\nmeta_description: ${"x".repeat(100)}\ncategory: Hair\npublish_at: 2026-11-09T09:00:00+05:30\ncover: /images/cover.jpg\nservice_link: /services/hair-colouring\n${extra}---\n`;

const good = header() + `# Title\n\n**Short answer:** Yes, see [hair colour](/services/hair-colouring).\n\n## A heading\n\n- one **bold** item\n\n## FAQ\n\n**Is it ok?** Yes.\n`;

test("a well-formed post has no errors", () => {
  assert.deepEqual(checkPost({ file: "01-good-post.md", raw: good }, ctx).errors, []);
});

test("syntax the page cannot show is an error", () => {
  const bad = good.replace("## A heading", "### Small heading\n\n> quote\n\n*italic text*\n\n| a | b |");
  const msgs = checkPost({ file: "01-good-post.md", raw: bad }, ctx).errors.map((e) => e.msg).join("\n");
  for (const word of ["###", "quotes", "italics", "tables"]) assert.match(msgs, new RegExp(word));
});

test("header and link problems are errors", () => {
  const bad = good
    .replace("+05:30", "")
    .replace("/services/hair-colouring", "/services/nope")
    .replace("**Is it ok?** Yes.", "Is it ok? Yes.");
  const msgs = checkPost({ file: "01-good-post.md", raw: bad }, ctx).errors.map((e) => e.msg).join("\n");
  for (const word of ["time zone", "nope", "FAQ entry"]) assert.match(msgs, new RegExp(word));
});

test("every real post in content/blogs passes", () => {
  const failing = checkAll(process.cwd()).filter((r) => r.errors.length);
  assert.deepEqual(failing.map((r) => r.file), []);
});
