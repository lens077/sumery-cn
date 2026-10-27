import { notFound } from "next/navigation";
import { products } from "@/content/products";
import { softwareJsonLd } from "@/lib/structured-data";

export default async function ProductJsonLdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd(product)) }}
      />
      {children}
    </>
  );
}
