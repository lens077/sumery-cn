import type { Metadata } from "next";
import { products } from "@/content/products";
import { SectionHeader } from "@/components/home/article-card";
import { ProductCard } from "@/components/home/sections";

export const metadata: Metadata = {
  title: "Sumery 产品",
  description: "Sumery 希曼出品的桌面效率工具与开发者工具。",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <SectionHeader eyebrow="PRODUCTS" title="Sumery 产品" />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
