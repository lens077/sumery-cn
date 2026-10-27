import { describe, expect, it } from "vitest";
import { products } from "../../src/content/products";
import { projects } from "../../src/content/projects";
import { games } from "../../src/content/games";

const EXCLUDED = [
  "cloud-native-deploy",
  "databases",
  "palmart",
  "palworld-shop-prototype",
];

describe("内容事实源", () => {
  it("首页精选 5 个桌面产品", () => {
    const featured = products.filter((p) => p.featured);
    expect(featured).toHaveLength(5);
    featured.forEach((p) => expect(p.category).toBe("desktop"));
  });

  it("排除项目不得出现", () => {
    for (const items of [products, projects, games]) {
      for (const item of items) {
        expect(EXCLUDED).not.toContain(item.slug);
        expect(JSON.stringify(item)).not.toMatch(/palmart|palworld/);
      }
    }
  });

  it("外链仓库域名只允许 GitHub / GitLab", () => {
    const urls = [
      ...products.map((p) => p.repositoryUrl),
      ...projects.map((p) => p.repositoryUrl),
    ].filter(Boolean) as string[];
    urls.forEach((u) =>
      expect(u).toMatch(/^https:\/\/(github\.com|gitlab\.com)\//),
    );
  });

  it("产品官网域名只允许已核验的 apikv.com 与 pages.dev，且都有官网入口", () => {
    products.forEach((p) => {
      expect(p.websiteUrl).toMatch(
        /^https:\/\/(scorpius|lyrapass|virgo|pyxis|libra)\.apikv\.com(\/.*)?$/,
      );
      if (p.overseasUrl) {
        expect(p.overseasUrl).toMatch(
          /^https:\/\/[a-z0-9.-]+\.pages\.dev(\/.*)?$/,
        );
      }
    });
  });

  it("游戏在入口核验前不得提供游玩链接", () => {
    games.forEach((g) => expect(g.playUrl).toBeUndefined());
  });
});
