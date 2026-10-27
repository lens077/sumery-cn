import { createRequire } from "node:module";
import { z } from "zod";
import { existsSync, readFileSync } from "node:fs";
import { productSchema, gameSchema } from "../src/lib/content-schema";

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
const { games } = require("../src/content/games.ts") as { games: unknown[] };
const { directoryEntries } = require("../src/content/directory.ts") as {
  directoryEntries: unknown[];
};

for (const [i, p] of products.entries()) {
  const r = productSchema.safeParse(p);
  if (!r.success) fail(`products[${i}]: ${r.error.message}`);
  checkSlug(r.data.slug, "product");
}
for (const [i, g] of games.entries()) {
  const r = gameSchema.safeParse(g);
  if (!r.success) fail(`games[${i}]: ${r.error.message}`);
  checkSlug(r.data.slug, "game");
}

// 目录数据：分类合法、id 唯一、仓库链接只允许已核验域名
const directorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum([
    "product",
    "platform-arch",
    "deploy-ops",
    "tech-practice",
    "game",
  ]),
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.object({
    label: z.string().min(1),
    tone: z.enum(["glow", "plain"]),
  }),
  repoUrl: z
    .string()
    .url()
    .refine((u) => /^https:\/\/(github\.com|gitlab\.com)\//.test(u), {
      message: "仓库链接只允许 github.com / gitlab.com",
    })
    .optional(),
  homeUrl: z
    .string()
    .url()
    .refine(
      (u) =>
        /^https:\/\/([a-z0-9-]+\.apikv\.com|[a-z0-9.-]+\.pages\.dev)(\/|$)/.test(
          u,
        ),
      {
        message: "官网链接只允许已核验的 apikv.com 与 pages.dev",
      },
    )
    .optional(),
  lastVerifiedAt: z.string().date().optional(),
});
for (const [i, e] of (directoryEntries as unknown[]).entries()) {
  const r = directorySchema.safeParse(e);
  if (!r.success) fail(`directory[${i}]: ${r.error.message}`);
  checkSlug(`dir-${r.data.id}`, "directory");
}
for (const id of ["cloud-native-deploy", "config-center"]) {
  if ((directoryEntries as { id: string }[]).some((e) => e.id === id)) {
    fail(`已合并/替代项目不得作为独立条目出现：${id}`);
  }
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
  `✓ 内容校验通过：${products.length} 产品 / ${directoryEntries.length} 目录项目 / ${games.length} 游戏`,
);
