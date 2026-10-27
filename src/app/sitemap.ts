import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { games } from "@/content/games";

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
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}/` })),
    ...games.map((g) => ({ url: `${BASE}/games/${g.slug}/` })),
  ];
}
