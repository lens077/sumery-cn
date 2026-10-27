import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { blogPostsSchema } from "../src/lib/rss/schema";

const FEED_URL = "https://blog.apikv.com/rss.xml";
const ALLOWED_HOST = "blog.apikv.com";
const TIMEOUT_MS = 15000;
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const MAX_SUMMARY = 160;

const itemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z
    .string()
    .url()
    .refine((u) => {
      try {
        return new URL(u).host === ALLOWED_HOST && u.startsWith("https://");
      } catch {
        return false;
      }
    }, "文章链接只允许 https://blog.apikv.com"),
  summary: z.string(),
  publishedAt: z.string(),
});

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_SUMMARY);
}

async function fetchFeed(): Promise<string> {
  const res = await fetch(FEED_URL, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`RSS 请求失败：HTTP ${res.status}`);
  const len = Number(res.headers.get("content-length") ?? 0);
  if (len > MAX_BODY_BYTES) throw new Error("RSS 响应体超过大小上限");
  const text = await res.text();
  if (text.length > MAX_BODY_BYTES) throw new Error("RSS 响应体超过大小上限");
  return text;
}

export function parseFeed(xml: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
  });
  const doc = parser.parse(xml);
  const rawItems: unknown[] = doc?.rss?.channel?.item ?? [];
  const seen = new Set<string>();
  const posts = rawItems
    .map((raw) => {
      const it = raw as Record<string, unknown>;
      const title = typeof it.title === "string" ? it.title.trim() : "";
      const link = typeof it.link === "string" ? it.link.trim() : "";
      const guid =
        typeof it.guid === "string"
          ? it.guid.trim()
          : typeof (it.guid as { "#text"?: string })?.["#text"] === "string"
            ? String((it.guid as { "#text": string })["#text"]).trim()
            : "";
      const pub = typeof it.pubDate === "string" ? it.pubDate : "";
      const desc =
        typeof it.description === "string"
          ? it.description
          : typeof (it as { "content:encoded"?: string })["content:encoded"] ===
              "string"
            ? String((it as { "content:encoded": string })["content:encoded"])
            : "";
      const date = new Date(pub);
      return itemSchema.safeParse({
        id: guid || link,
        title,
        url: link,
        summary: stripHtml(desc),
        publishedAt: date.toISOString(),
      });
    })
    .filter((r) => r.success)
    .map((r) => r.data)
    // 按 id 稳定去重，发布时间倒序
    .filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  return posts;
}

async function main() {
  const { existsSync, readFileSync, writeFileSync, renameSync } =
    await import("node:fs");
  const dataPath = "data/blog-posts.json";

  // last-known-good：异常时保留现有数据
  let lastKnownGood: string | null = null;
  if (existsSync(dataPath)) lastKnownGood = readFileSync(dataPath, "utf8");

  try {
    const xml = await fetchFeed();
    const posts = parseFeed(xml);
    if (posts.length === 0) throw new Error("RSS 解析结果为空，拒绝覆盖有效数据");
    const next = JSON.stringify(
      { syncedAt: new Date().toISOString(), posts },
      null,
      2,
    );
    // 内容未变化时不提交文件：只比较文章数组，不比较同步时间戳
    const oldPosts = lastKnownGood
      ? (JSON.parse(lastKnownGood) as { posts?: unknown }).posts
      : undefined;
    if (
      oldPosts &&
      JSON.stringify(oldPosts) === JSON.stringify(posts)
    ) {
      console.log("RSS 无变化，跳过写入");
      return;
    }
    blogPostsSchema.parse(JSON.parse(next));
    // 先写临时文件，校验通过后原子替换
    const tmp = `${dataPath}.tmp`;
    writeFileSync(tmp, `${next}\n`);
    JSON.parse(readFileSync(tmp, "utf8"));
    renameSync(tmp, dataPath);
    console.log(`RSS 同步完成：${posts.length} 篇文章`);
  } catch (err) {
    console.error(
      `RSS 同步失败（保留 last-known-good）：${err instanceof Error ? err.message : err}`,
    );
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith("sync-blog-rss.ts")) void main();
