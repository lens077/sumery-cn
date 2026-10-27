import type { Metadata } from "next";
import { products } from "@/content/products";
import { SectionHeader } from "@/components/home/article-card";

export const metadata: Metadata = {
  title: "Sumery 产品",
  description: "Sumery 希曼出品的桌面效率工具与开发者工具。",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <SectionHeader eyebrow="PRODUCTS" title="Sumery 产品" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <a
            key={p.slug}
            href={`/products/${p.slug}/`}
            className="glass-card glass-card-hover block p-6"
          >
            <h2 className="text-base font-semibold text-white">{p.name}</h2>
            <p className="mt-1 text-sm text-ink-400">{p.tagline}</p>
            <p className="mt-2 text-sm leading-6 text-ink-500">{p.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
