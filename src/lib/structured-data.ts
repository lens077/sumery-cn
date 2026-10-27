import type { Product } from "@/lib/content-schema";

/** 按真实可见内容生成 JSON-LD；不编造评分、价格与下载量。 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "希曼 (Sumery)",
    url: "https://sumery.cn",
    description:
      "独立开发者 · 产品工作室，专注于效率工具、开发者工具与独立产品。",
    sameAs: ["https://blog.apikv.com", "https://github.com/lens077"],
  };
}

export function softwareJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    url: `https://sumery.cn/products/${product.slug}/`,
    ...(product.repositoryUrl ? { codeRepository: product.repositoryUrl } : {}),
    ...(product.platforms
      ? {
          operatingSystem: product.platforms.join(", "),
          applicationCategory: "DesktopApplication",
        }
      : {}),
  };
}
