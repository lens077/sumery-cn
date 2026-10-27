import { createRequire } from "node:module";
import { z } from "zod";
import { existsSync, readFileSync } from "node:fs";
import {
  productSchema,
  projectSchema,
  gameSchema,
} from "../src/lib/content-schema";

const require = createRequire(import.meta.url);

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

const slugs = new Set<string>();
function checkSlug(slug: string, kind: string) {
  if (slugs.has(slug)) fail(`slug 重复：${slug}（${kind}）`);
  slugs.add(slug);
}

const { products } = require("../src/content/products.ts") as {
  products: unknown[];
};
const { projects } = require("../src/content/projects.ts") as {
  projects: unknown[];
};
const { games } = require("../src/content/games.ts") as { games: unknown[] };

for (const [i, p] of products.entries()) {
  const r = productSchema.safeParse(p);
  if (!r.success) fail(`products[${i}]: ${r.error.message}`);
  checkSlug(r.data.slug, "product");
}
for (const [i, p] of projects.entries()) {
  const r = projectSchema.safeParse(p);
  if (!r.success) fail(`projects[${i}]: ${r.error.message}`);
  checkSlug(r.data.slug, "project");
}
for (const [i, g] of games.entries()) {
  const r = gameSchema.safeParse(g);
  if (!r.success) fail(`games[${i}]: ${r.error.message}`);
  checkSlug(r.data.slug, "game");
}

// RSS 数据若存在，须通过 schema
if (existsSync("data/blog-posts.json")) {
  const data = JSON.parse(readFileSync("data/blog-posts.json", "utf8"));
  const posts = z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z
          .string()
          .url()
          .refine((u) => u.startsWith("https://blog.apikv.com/"), {
            message: "文章链接只允许 blog.apikv.com",
          }),
        summary: z.string(),
        publishedAt: z.string(),
      }),
    )
    .safeParse(data.posts);
  if (!posts.success) fail(`blog-posts.json: ${posts.error.message}`);
  if (
    data.posts.some(
      (p: { url: string }, i: number) =>
        data.posts.findIndex((q: { url: string }) => q.url === p.url) !== i,
    )
  ) {
    fail("blog-posts.json 存在重复文章链接");
  }
}

console.log(
  `✓ 内容校验通过：${products.length} 产品 / ${projects.length} 项目 / ${games.length} 游戏`,
);
