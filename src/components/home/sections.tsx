import { withBase } from "@/lib/urls";
import type { Product } from "@/lib/content-schema";
import { statusLabels } from "@/lib/content-schema";
import type { Game } from "@/lib/content-schema";
import { SectionHeader } from "@/components/home/article-card";
import Link from "next/link";

export function ExternalSiteLinks({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  if (!product.websiteUrl && !product.overseasUrl) return null;
  return (
    <div className={className}>
      {product.websiteUrl && (
        <a
          href={product.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-sky-accent hover:underline"
        >
          官网（国内）↗
        </a>
      )}
      {product.overseasUrl && (
        <a
          href={product.overseasUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-sky-accent hover:underline"
        >
          官网（海外）↗
        </a>
      )}
    </div>
  );
}

export function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="glass-card glass-card-hover flex flex-col overflow-hidden">
      {p.screenshot && (
        <a
          href={p.websiteUrl ?? p.overseasUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`访问 ${p.name} 官网`}
          className="block border-b border-line"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={withBase(p.screenshot)}
            alt={`${p.name} 官网首页截图`}
            width={1600}
            height={1000}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </a>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={withBase(p.image)}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className="h-10 w-10 rounded-[10px]"
              />
            )}
            {p.name}
          </h3>
          <span
            className={`chip ${p.status === "in-development" ? "chip-glow" : ""}`}
          >
            {statusLabels[p.status]}
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-ink-400">{p.tagline}</p>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink-500">
          {p.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {p.platforms?.map((pl) => (
            <span key={pl} className="chip">
              {pl}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <ExternalSiteLinks product={p} className="flex flex-wrap gap-5" />
          <Link
            href={`/products/${p.slug}/`}
            className="text-sm font-medium text-ink-400 hover:text-white"
          >
            了解详情 →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section
      className="mx-auto max-w-(--container-page) px-6 py-20"
      id="products"
    >
      <SectionHeader
        eyebrow="PRODUCTS"
        title="Sumery 产品"
        moreHref="/products/"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

export function GamesSection({ games }: { games: Game[] }) {
  return (
    <section className="mx-auto max-w-(--container-page) px-6 py-20" id="games">
      <SectionHeader eyebrow="GAMES" title="游戏乐园" moreHref="/games/" />
      <div className="grid gap-5 lg:grid-cols-2">
        {games.map((g) => (
          <article
            key={g.slug}
            className="glass-card glass-card-hover relative flex min-h-44 flex-col justify-end overflow-hidden p-7"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(91,143,249,0.18),transparent_60%)]"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{g.name}</h3>
                <span className="chip chip-glow">{g.statusNote}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-500">
                {g.description}
              </p>
              <Link
                href={`/games/${g.slug}/`}
                className="mt-4 inline-block text-sm font-medium text-sky-accent hover:underline"
              >
                了解详情 →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
