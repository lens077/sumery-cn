import { describe, expect, it } from "vitest";
import { products } from "../../src/content/products";
import { games } from "../../src/content/games";
import { directoryEntries } from "../../src/content/directory";

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
    for (const items of [products, games, directoryEntries]) {
      for (const item of items) {
        expect(EXCLUDED).not.toContain(
          (item as { slug?: string; id?: string }).slug ??
            (item as { id?: string }).id,
        );
        expect(JSON.stringify(item)).not.toMatch(/palmart|palworld/);
      }
    }
  });

  it("外链仓库域名只允许 GitHub / GitLab，待核验项目不得挂仓库链接", () => {
    const urls = [
      ...products.map((p) => p.repositoryUrl),
      ...directoryEntries.map((e) => e.repoUrl),
    ].filter(Boolean) as string[];
    urls.forEach((u) =>
      expect(u).toMatch(/^https:\/\/(github\.com|gitlab\.com)\//),
    );
    const cdc = directoryEntries.find((e) => e.id === "postgres-cdc-pipeline");
    expect(cdc?.status.label).toBe("维护状态待核验");
    expect(cdc?.repoUrl).toBeUndefined();
  });

  it("目录条目均属五类之一，docker-deploy 不公开仓库", () => {
    const allowed = [
      "product",
      "platform-arch",
      "deploy-ops",
      "tech-practice",
      "game",
    ];
    directoryEntries.forEach((e) => expect(allowed).toContain(e.category));
    const dd = directoryEntries.find((e) => e.id === "docker-deploy");
    expect(dd?.repoUrl).toBeUndefined();
    // cloud-native-deploy / config-center 不得作为独立项目出现
    expect(directoryEntries.map((e) => e.id)).not.toContain(
      "cloud-native-deploy",
    );
    expect(directoryEntries.map((e) => e.id)).not.toContain("config-center");
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
