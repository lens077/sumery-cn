import { withBase } from "@/lib/urls";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/content/products";
import { statusLabels } from "@/lib/content-schema";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}/` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <p className="section-eyebrow">PRODUCT</p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          {product.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBase(product.image)}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl"
            />
          )}
          {product.name}
        </h1>
        <span className="chip chip-glow">{statusLabels[product.status]}</span>
        {product.statusNote && (
          <span className="text-xs text-ink-500">{product.statusNote}</span>
        )}
      </div>
      <p className="mt-3 text-lg text-ink-400">{product.tagline}</p>
      <p className="mt-6 max-w-2xl leading-7 text-ink-500">
        {product.description}
      </p>
      {product.platforms && (
        <div className="mt-6 flex flex-wrap gap-2">
          {product.platforms.map((pl) => (
            <span key={pl} className="chip">
              {pl}
            </span>
          ))}
        </div>
      )}
      {product.screenshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={withBase(product.screenshot)}
          alt={`${product.name} 官网首页截图`}
          width={1600}
          height={1000}
          className="mt-8 w-full rounded-2xl border border-line"
        />
      )}
      <div className="mt-8 flex flex-wrap items-center gap-6">
        {product.websiteUrl && (
          <a
            className="cta-primary"
            href={product.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            访问官网（国内）↗
          </a>
        )}
        {product.overseasUrl && (
          <a
            className="cta-secondary"
            href={product.overseasUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            官网（海外）↗
          </a>
        )}
        {product.repositoryUrl && (
          <a
            className="cta-secondary"
            href={product.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 仓库 ↗
          </a>
        )}
        <Link className="cta-secondary" href="/products/">
          ← 全部产品
        </Link>
      </div>
    </div>
  );
}
