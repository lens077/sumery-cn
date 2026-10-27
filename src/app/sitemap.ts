import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { directoryEntries } from "@/content/directory";

const BASE = "https://sumery.cn";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "products/",
    "projects/",
    "games/",
    "journal/",
    "about/",
    "contact/",
  ];
  return [
    ...staticPaths.map((p) => ({ url: `${BASE}/${p}` })),
    ...products.map((p) => ({ url: `${BASE}/products/${p.slug}/` })),
    ...directoryEntries
      .filter((e) => e.category !== "product" && e.category !== "game")
      .map((e) => ({ url: `${BASE}/projects/?type=${e.category}` })),
  ];
}
