import type { Product } from "@/lib/content-schema";

/**
 * 事实源：Sumery 桌面产品线。
 * 链接与状态核验方式见实施报告 IMPLEMENTATION.md；待确认项以 statusNote 标注，
 * 未知字段一律不填、前端隐藏，禁止编造价格与下载地址。
 */
export const products: Product[] = [
  {
    slug: "lyra",
    image: "/images/products/lyra.png",
    name: "Sumery Lyra",
    tagline: "本地优先的零知识密码管理器",
    description:
      "密码只留在你的设备上。Rust + Tauri 桌面端，浏览器插件与 Android 端复用同一核心库。",
    category: "desktop",
    status: "released",
    platforms: ["macOS", "Windows", "Browser", "Android"],
    repositoryUrl: "https://github.com/lens077/LyraPass",
    featured: true,
  },
  {
    slug: "scorpius",
    image: "/images/products/scorpius.png",
    name: "Sumery Scorpius",
    tagline: "记住每一次复制的剪贴板管理器",
    description:
      "记住每一次复制，呼出、选中、直接贴回原处。基于 Tauri 2 的轻量级剪贴板管理器。",
    category: "desktop",
    status: "released",
    platforms: ["macOS", "Windows"],
    repositoryUrl: "https://github.com/lens077/Scorpius",
    featured: true,
  },
  {
    slug: "virgo",
    image: "/images/products/virgo.png",
    name: "Sumery Virgo",
    tagline: "给 AI 协作开发者的本地任务对账器",
    description:
      "Markdown 是唯一事实源。本地任务对账器，配合 AI 协作开发流程使用。",
    category: "desktop",
    status: "released",
    platforms: ["macOS"],
    repositoryUrl: "https://github.com/lens077/ToDo",
    featured: true,
  },
  {
    slug: "pyxis",
    image: "/images/products/pyxis.png",
    name: "Sumery Pyxis",
    tagline: "开源的桌面项目规划工具",
    description:
      "写一份结构化大纲，得到任务分解、依赖网络、时间线与里程碑，导出为 XMind 与 Visio 里能接着改的文件。",
    category: "desktop",
    status: "open-source",
    platforms: ["macOS", "Windows"],
    repositoryUrl: "https://github.com/lens077/mcm",
    featured: true,
  },
  {
    slug: "libra",
    image: "/images/products/libra.png",
    name: "Sumery Libra",
    tagline: "打工人身心健康观测",
    description:
      "把工作时长、疲劳信号与身体数据放在一起，本地计算，不猜数字。没有数据时界面会明说。",
    category: "desktop",
    status: "in-development",
    statusNote: "开发迭代中，发布时间待确认",
    repositoryUrl: "https://github.com/lens077/Libra",
    featured: true,
  },
];
