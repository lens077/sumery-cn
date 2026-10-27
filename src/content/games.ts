import type { Game } from "@/lib/content-schema";

/**
 * 游戏内容子线：Lepus 与 Corvus。
 * 本地仓库与公开链接均未能核验（见实施报告），状态标注为待确认；
 * 在事实核验前不提供 playUrl，不描述为可直接游玩。
 */
export const games: Game[] = [
  {
    slug: "lepus",
    name: "Lepus",
    tagline: "浏览器小游戏",
    description: "Sumery 游戏子线作品，浏览器直接体验，无需安装。",
    status: "in-development",
    statusNote: "开放状态待确认，入口补全后更新",
  },
  {
    slug: "corvus",
    name: "Corvus",
    tagline: "浏览器小游戏",
    description: "Sumery 游戏子线作品，浏览器直接体验，无需安装。",
    status: "in-development",
    statusNote: "开放状态待确认，入口补全后更新",
  },
];
