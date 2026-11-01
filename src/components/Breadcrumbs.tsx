import Link from "next/link";

// Visible trail; the matching BreadcrumbList JSON-LD is added by the page (breadcrumbList in lib/schema).
export default function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={item.name}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
            {i < items.length - 1 && <span aria-hidden="true"> / </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
