# Sumery.cn 实施报告

依据 `ip-site/sumery_cn_agent_implementation_plan_v2.html`（Agent 执行版）实施。
仓库：`sumery-cn/`（Next.js 16.4.3 稳定版 + React 19.3 + TypeScript strict + Tailwind 4）。

## 审计结论（实施前完成）

| 事项       | 结论                                                                                                                   | 依据                                                         |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 3D IP 资产 | 复用 blog 仓库 `lucy-low.glb`（2.2 MB，meshopt 压缩 GLB），vanilla three.js 渲染，未引入 R3F                           | `blog/src/assets/models/`、`blog/src/scripts/lucy-viewer.ts` |
| 模型许可证 | **待确认**：blog 仓库未标注许可证                                                                                      | 仓库内无 LICENSE 引用模型                                    |
| 托管形态   | 采用 `output: "export"` 纯静态导出 + CDN；站点无服务端需求                                                             | 仓库中无 sumery.cn 托管配置记录（待确认）                    |
| RSS        | `https://blog.apikv.com/rss.xml` 实测可用（HTTP 200，51 条）                                                           | 实时抓取                                                     |
| 产品事实   | Lyra/LyraPass、Scorpius、Virgo/ToDo、Pyxis/mcm、Libra/work；名称与定位取自各仓库 README；仓库地址取自各仓库 git remote | 本地仓库核验                                                 |
| 排除项     | cloud-native-deploy、databases、palmart、palworld-shop-prototype 未出现（有单元测试守护）                              | 规格 §1                                                      |

## 关键架构决策

- **静态优先**：`next.config.ts` 设 `output: "export"` + `trailingSlash`；robots/sitemap 显式 `force-static`。
- **3D 为可选增强层**：独立 Client Component（`src/components/three/lucy-viewer.tsx`），`next/dynamic` + `ssr: false` 延迟加载；WebGL 不可用/加载失败降级为静态光晕占位；`prefers-reduced-motion` 停止自动旋转；移动端 DPR 上限 1.5；canvas 不遮挡文案与 CTA。
- **Hero 场景为纯 CSS/SVG 分层**（渐变天空、SVG 山脊、水面反光），未把设计图当背景，未使用生成图。
- **RSS 同步**：fast-xml-parser + Zod；超时 15s、响应体上限 2 MB；只允许 `https://blog.apikv.com` 链接；GUID 去重、时间倒序；先写临时文件校验后原子替换；失败保留 last-known-good；文章数组未变不写入。
- **内容事实源**：`src/content/{products,projects,games}.ts` + Zod schema（`src/lib/content-schema.ts`）；`pnpm content:validate` 校验 slug 唯一、外链域名、schema；未知字段不填、前端隐藏。
- **SEO**：`metadataBase https://sumery.cn`、每页独立 title/description/canonical、Person JSON-LD（全站）与 SoftwareApplication JSON-LD（产品页）、sitemap.xml、robots.txt。未编造评分/价格。
- **Umami**：根布局唯一一处 `next/script`（`https://umami.apikv.com/s.js` + 指定 website ID，`afterInteractive`）。

## 测试报告（2026-10-28 实测）

| 命令                                                                                                                                                                                     | 结果                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `pnpm exec tsc --noEmit`                                                                                                                                                                 | ✅ 通过                                                                |
| `pnpm exec eslint .`                                                                                                                                                                     | ✅ 通过（0 error 0 warning）                                           |
| `pnpm exec prettier --check .`                                                                                                                                                           | ✅ 通过                                                                |
| `pnpm test`（vitest，7 项：RSS 解析/去重/外链过滤/摘要净化、内容事实源/排除项/外链域名/游戏入口）                                                                                        | ✅ 7 passed                                                            |
| `pnpm content:validate`                                                                                                                                                                  | ✅ 5 产品 / 4 项目 / 2 游戏                                            |
| `pnpm build`（静态导出 19 个路由）                                                                                                                                                       | ✅ 通过                                                                |
| `pnpm test:e2e`（Playwright 桌面+手机：模块顺序、真实文章链接 ≥3、无设计图背景、axe wcag2a/2aa 零违规、手机无横向溢出、详情路由、404=404、sitemap/robots 200、canonical/og、Umami 脚本） | ✅ 14 passed                                                           |
| Hero 截图人工核验                                                                                                                                                                        | ✅ 场景/文案/CTA/Lucy 模型正常（模型加载失败时 fallback 已实测触发过） |

**未做/受阻**：

- Umami 真实上报与 SPA 路由 pageview 验证需部署到线上域名后进行。
- Google Search Console / Bing 站长验证需域名权限，本地无法替代。
- 生产 sumery.cn smoke test 未执行：无部署凭证（见下）。

## 部署说明

- 构建：`pnpm install --frozen-lockfile && pnpm build`，产物在 `out/`，任意静态托管 + CDN 可服务。
- RSS 触发：`.github/workflows/sync-blog.yml`（每日 cron + `repository_dispatch: blog-published` + 手动）。blog 仓库部署 workflow 成功后向本仓发 `repository_dispatch` 即可；无需额外 Secret（同仓 push 用默认 GITHUB_TOKEN）。
- CI：`.github/workflows/ci.yml`（format/lint/typecheck/unit/content/build/e2e，frozen lockfile，并发组防覆盖）。
- 回滚：回退对应 commit 重新 `pnpm build` 发布即可（静态产物不可变）。

## 阻塞与待确认项

1. **部署凭证缺失**：未获得 sumery.cn 的托管平台与 DNS 权限，未执行生产部署与线上 smoke test；不虚报部署成功。
2. **Lucy 模型许可证**：商用复用前需确认。
3. **产品价格/下载地址**：各产品仓库未提供公开下载渠道，站点隐藏这些字段，不编造；确认后在 `src/content/products.ts` 补 `priceLabel`/`downloadUrl`。
4. **Lepus / Corvus**：本地无对应仓库、blog 无相关记录，开放状态标为「待确认」，未提供游玩链接；核验后补 `playUrl`。
5. **OG 分享图**：`/images/og/opengraph-image.png` 未生成（无品牌设计资产源文件），metadata 已引用，部署前需补图或移除引用。
