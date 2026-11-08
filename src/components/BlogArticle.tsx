import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import type { BlogPost } from "@/lib/blog-posts";

// Turns **bold** and [text](link) in a line of markdown into React nodes. React escapes everything else.
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const internal = href.startsWith("/");
      out.push(
        internal ? (
          <Link key={key++} href={href}>
            {m[2]}
          </Link>
        ) : (
          <a key={key++} href={href} rel="noopener noreferrer" target="_blank">
            {m[2]}
          </a>
        )
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="blog-article">
      <p className="blog-article-meta">
        <span className="blog-category">{post.category.toUpperCase()}</span>
        <time dateTime={post.publishAt}>{formatDate(post.publishAt)}</time>
      </p>
      <h1>{post.title}</h1>

      <Image
        className="blog-article-cover"
        src={post.cover}
        alt={post.title}
        width={1000}
        height={560}
        priority
      />

      {post.intro && <p className="blog-article-intro">{inline(post.intro)}</p>}

      {post.blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "p") return <p key={i}>{inline(b.text)}</p>;
        const items = b.items.map((t, j) => <li key={j}>{inline(t)}</li>);
        return b.type === "ul" ? <ul key={i}>{items}</ul> : <ol key={i}>{items}</ol>;
      })}

      {post.faq.length > 0 && (
        <section className="blog-article-faq">
          <h2>Frequently asked questions</h2>
          {post.faq.map((f, i) => (
            <div key={i}>
              <h3>{f.question}</h3>
              <p>{inline(f.answer)}</p>
            </div>
          ))}
        </section>
      )}

      <p className="blog-article-cta">
        <Link href={post.serviceLink}>See this service</Link>
        <Link href="/#contact">Book on WhatsApp</Link>
      </p>
    </article>
  );
}
