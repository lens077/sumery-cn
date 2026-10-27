import type { Project } from "@/lib/content-schema";

/**
 * 工程项目精选。cloud-native-deploy、databases、palmart、palworld-shop-prototype
 * 已明确排除，不得加入。ecommerce 仓库在 GitLab，属真实 remote（git@gitlab.com:sumery/ecommerce.git）。
 */
export const projects: Project[] = [
  {
    slug: "ecommerce",
    name: "电商微服务平台",
    tagline: "Go 微服务 · 事件驱动 · K8s GitOps",
    description:
      "多服务电商后端：订单、支付、库存与通知拆分为独立微服务，事件驱动通信，GitOps 部署与零信任网络策略。",
    tags: ["Go", "gRPC", "Kafka", "Kubernetes", "ArgoCD"],
    repositoryNote:
      "私有 GitLab 仓库（gitlab.com/sumery/ecommerce），未公开访问",
    featured: true,
  },
  {
    slug: "control-tower",
    name: "Control Tower",
    tagline: "API 网关与配置中心",
    description:
      "为微服务集群提供统一网关路由与配置分发，含零信任访问策略；Go 实现并被多个服务以模块方式引用。",
    tags: ["Go", "Gateway", "Config Center", "Zero Trust"],
    repositoryUrl: "https://github.com/lens077/control-tower",
    featured: true,
  },
  {
    slug: "lyrapass",
    name: "LyraPass 核心库",
    tagline: "零知识密码管理核心",
    description:
      "Lyra 桌面端、浏览器插件与 Android 端共用的本地优先密码管理核心：端到端加密与同步协议。",
    tags: ["Rust", "Tauri", "E2EE"],
    repositoryUrl: "https://github.com/lens077/LyraPass",
    featured: false,
  },
  {
    slug: "scorpius-clipboard",
    name: "Scorpius 剪贴板",
    tagline: "Tauri 2 轻量桌面工具",
    description:
      "跨平台剪贴板历史管理：全局呼出、模糊搜索、多格式贴回，Rust 后端保证低资源占用。",
    tags: ["Rust", "Tauri 2", "Desktop"],
    repositoryUrl: "https://github.com/lens077/Scorpius",
    featured: false,
  },
];
