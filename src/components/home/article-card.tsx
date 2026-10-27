import Link from "next/link";
import type { BlogPost } from "@/lib/rss/schema";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="glass-card glass-card-hover flex flex-col p-6">
      <time dateTime={post.publishedAt} className="text-xs text-ink-500">
        {formatDate(post.publishedAt)}
      </time>
      <h3 className="mt-3 line-clamp-2 text-base font-semibold leading-6 text-white">
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {post.title}
        </a>
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-500">
        {post.summary}
      </p>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm font-medium text-sky-accent hover:underline"
      >
        阅读全文 ↗
      </a>
    </article>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  moreHref,
}: {
  eyebrow: string;
  title: string;
  moreHref?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
      </div>
      {moreHref && (
        <Link
          href={moreHref}
          className="shrink-0 text-sm text-sky-accent hover:underline"
        >
          查看全部 →
        </Link>
      )}
    </div>
  );
}
