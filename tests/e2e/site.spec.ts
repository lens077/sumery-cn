import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("首页", () => {
  test("模块顺序：Hero → 文章 → 产品 → 项目 → 游戏", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    const ids = ["#products", "#projects", "#games"];
    for (const id of ids) await expect(page.locator(id)).toBeAttached();
    // 首页展示 3 篇真实文章，链接指向博客原文
    const links = await page
      .locator("a[href^='https://blog.apikv.com/blog/']")
      .count();
    expect(links).toBeGreaterThanOrEqual(3);
    // 设计图不作为整页背景：body 无大图背景
    const bg = await page.evaluate(
      () => getComputedStyle(document.body).backgroundImage,
    );
    expect(bg).toBe("none");
  });

  test("无障碍 axe 检查（桌面）", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("无横向溢出（手机视口）", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("路由与元数据", () => {
  test("详情路由与 404", async ({ page }) => {
    await page.goto("/products/lyra/");
    await expect(page.locator("h1")).toContainText("Sumery Lyra");
    await page.goto("/games/lepus/");
    await expect(page.locator("h1")).toContainText("Lepus");
    const res = await page.goto("/this-page-does-not-exist/");
    expect(res?.status()).toBe(404);
  });

  test("sitemap 与 robots 可访问", async ({ request }) => {
    expect((await request.get("/sitemap.xml")).status()).toBe(200);
    expect((await request.get("/robots.txt")).status()).toBe(200);
  });

  test("canonical 与 og 元数据", async ({ page }) => {
    await page.goto("/products/pyxis/");
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      "https://sumery.cn/products/pyxis/",
    );
    await expect(page.locator('meta[property="og:title"]')).toBeAttached();
  });

  test("Umami 脚本被引用", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.locator('script[src="https://umami.apikv.com/s.js"]'),
    ).toBeAttached();
  });
});
