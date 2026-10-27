import { describe, expect, it } from "vitest";
import { parseFeed } from "../../scripts/sync-blog-rss";

const fixture = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>blog</title>
<item>
  <title>文章一</title>
  <link>https://blog.apikv.com/blog/post-1/</link>
  <guid>g1</guid>
  <pubDate>Mon, 26 Oct 2026 00:00:00 GMT</pubDate>
  <description>&lt;p&gt;摘要 &lt;b&gt;加粗&lt;/b&gt;&lt;/p&gt;</description>
</item>
<item>
  <title>文章一重复</title>
  <link>https://blog.apikv.com/blog/post-1/</link>
  <guid>g1</guid>
  <pubDate>Mon, 26 Oct 2026 00:00:00 GMT</pubDate>
  <description>重复项</description>
</item>
<item>
  <title>外部链接应被拒</title>
  <link>https://evil.example.com/post/</link>
  <guid>g2</guid>
  <pubDate>Sun, 25 Oct 2026 00:00:00 GMT</pubDate>
  <description>x</description>
</item>
<item>
  <title>文章三</title>
  <link>https://blog.apikv.com/blog/post-3/</link>
  <guid>g3</guid>
  <pubDate>Tue, 27 Oct 2026 00:00:00 GMT</pubDate>
  <description>第三篇</description>
</item>
</channel></rss>`;

describe("parseFeed", () => {
  it("去重、过滤外链、按发布时间倒序", () => {
    const posts = parseFeed(fixture);
    expect(posts.map((p) => p.id)).toEqual(["g3", "g1"]);
    expect(posts[1].title).toBe("文章一");
  });

  it("去除摘要 HTML 并限长", () => {
    const posts = parseFeed(fixture);
    expect(posts[1].summary).toBe("摘要 加粗");
  });

  it("空 feed 返回空数组", () => {
    expect(parseFeed("<rss><channel></channel></rss>")).toEqual([]);
  });
});
