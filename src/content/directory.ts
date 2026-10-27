/**
 * 全部项目目录的单一数据源（design-guide v1.0 §5）。
 * 首页精选卡片与 /projects/ 目录共用；状态以仓库审计证据为准（2026-10-28 核验）。
 * 维护证据 = 2025-01-01 至 2026-12-31 的实质提交；无法核验的标「维护状态待核验」且不挂仓库链接。
 * cloud-native-deploy 已并入 kubernetes，config-center 已被 control-tower 替代，均不收录。
 */
export const DIRECTORY_CATEGORIES = [
  { id: "all", label: "全部项目" },
  { id: "product", label: "产品" },
  { id: "platform-arch", label: "平台与架构" },
  { id: "deploy-ops", label: "部署与运维" },
  { id: "tech-practice", label: "技术实践" },
  { id: "game", label: "游戏" },
] as const;

export type DirectoryCategoryId = (typeof DIRECTORY_CATEGORIES)[number]["id"];

export type DirectoryEntry = {
  id: string;
  title: string;
  category: Exclude<DirectoryCategoryId, "all">;
  subcategory: string;
  summary: string;
  tags: string[];
  /** 状态标签文案 + 色调：glow=暖橙强调，plain=常规 */
  status: { label: string; tone: "glow" | "plain" };
  repoUrl?: string;
  repoNote?: string;
  homeUrl?: string;
  overseasUrl?: string;
  image?: string;
  screenshot?: string;
  /** 维护状态核验日期（本地仓库最后提交或 GitHub API pushed_at） */
  lastVerifiedAt?: string;
  featured: boolean;
};

import { products } from "./products";
import { games } from "./games";

const productStatuses: Record<
  string,
  { label: string; tone: "glow" | "plain" }
> = {
  lyra: { label: "开发中", tone: "glow" },
  scorpius: { label: "已上线", tone: "plain" },
  virgo: { label: "实验中", tone: "glow" },
  pyxis: { label: "开源", tone: "plain" },
  libra: { label: "未发布", tone: "glow" },
};

const productSubcategories: Record<string, string> = {
  lyra: "产品与商业化",
  scorpius: "产品与商业化",
  virgo: "开发者工具",
  pyxis: "产品与开源",
  libra: "产品研发",
};

const productEntries: DirectoryEntry[] = products.map((p) => ({
  id: p.slug,
  title: p.name,
  category: "product" as const,
  subcategory: productSubcategories[p.slug] ?? "产品研发",
  summary: p.description,
  tags: p.platforms ?? [],
  status: productStatuses[p.slug] ?? { label: "待核验", tone: "plain" },
  repoUrl: p.repositoryUrl,
  homeUrl: p.websiteUrl,
  overseasUrl: p.overseasUrl,
  image: p.image,
  screenshot: p.screenshot,
  featured: true,
}));

const gameEntries: DirectoryEntry[] = games.map((g) => ({
  id: g.slug,
  title: g.name,
  category: "game" as const,
  subcategory: "游戏实验",
  summary:
    g.slug === "lepus"
      ? "浏览器 3D 竞速实验，包含车辆选择、山路赛道、双圈比赛和本地成绩。"
      : "多人战术射击实验。访问控制、部署方式与公开可玩状态须重新核验。",
  tags:
    g.slug === "lepus"
      ? ["Browser", "3D", "Racing"]
      : ["Multiplayer", "Tactical", "Self-hosted"],
  status:
    g.slug === "lepus"
      ? { label: "实验项目", tone: "glow" }
      : { label: "访问受限/需核验", tone: "glow" },
  featured: false,
}));

export const directoryEntries: DirectoryEntry[] = [
  ...productEntries,
  {
    id: "ecommerce",
    title: "ecommerce · 电商平台",
    category: "platform-arch",
    subcategory: "业务系统",
    summary:
      "Go + React 的 B2B2C 电商项目，包含微服务、前端 monorepo 与云原生交付实践。明确区分已实现和仍在完善的功能。",
    tags: ["Go", "Connect RPC", "React", "K8s", "Argo CD"],
    status: { label: "持续开发", tone: "plain" },
    repoNote: "私有 GitLab 仓库（gitlab.com/sumery/ecommerce），未公开访问",
    lastVerifiedAt: "2026-10-20",
    featured: true,
  },
  {
    id: "control-tower",
    title: "control-tower",
    category: "platform-arch",
    subcategory: "平台服务",
    summary:
      "网关与配置控制面，涵盖请求代理、认证授权、配置版本与热更新等工程能力；config-center 已由它替代。",
    tags: ["Go", "Gateway", "Config"],
    status: { label: "持续开发", tone: "plain" },
    repoUrl: "https://github.com/lens077/control-tower",
    featured: true,
  },
  {
    id: "kubernetes",
    title: "kubernetes",
    category: "platform-arch",
    subcategory: "基础设施",
    summary:
      "集群安装与云原生组件部署仓库；cloud-native-deploy 已并入本仓库，不再单独展示。",
    tags: ["Kubernetes", "Cilium", "Gateway API", "GitOps"],
    status: { label: "持续开发", tone: "plain" },
    repoUrl: "https://github.com/lens077/kubernetes",
    lastVerifiedAt: "2026-10-25",
    featured: true,
  },
  {
    id: "docker-deploy",
    title: "docker-deploy",
    category: "deploy-ops",
    subcategory: "部署自动化",
    summary:
      "个人基础设施部署与运维资产。目录、敏感配置与备份/恢复流程完成安全审计前，不公开仓库内容，也不包装为通用产品。",
    tags: ["Docker", "Compose", "Ops", "Backup"],
    status: { label: "内部资产 · 待审计", tone: "glow" },
    lastVerifiedAt: "2026-10-14",
    featured: false,
  },
  {
    id: "go-connect-kit",
    title: "Go Connect Kit",
    category: "tech-practice",
    subcategory: "开发者基础设施",
    summary: "共享 Go 微服务基础设施库，减少重复模块和模板漂移。",
    tags: ["Go", "Microservices", "Library"],
    status: { label: "持续开发", tone: "plain" },
    repoUrl: "https://github.com/lens077/go-connect-kit",
    lastVerifiedAt: "2026-10-07",
    featured: true,
  },
  {
    id: "go-connect-template",
    title: "Go Connect Template",
    category: "tech-practice",
    subcategory: "开发者基础设施",
    summary: "Go 微服务项目模板，用于统一基础工程结构和开发约定。",
    tags: ["Go", "Template", "Connect RPC"],
    status: { label: "持续开发", tone: "plain" },
    repoUrl: "https://github.com/lens077/go-connect-template",
    lastVerifiedAt: "2026-09-11",
    featured: false,
  },
  {
    id: "go-connect-template-cli",
    title: "Go Connect Template CLI",
    category: "tech-practice",
    subcategory: "开发者工具",
    summary: "为微服务模板提供命令行初始化与三方合并升级等工程化辅助能力。",
    tags: ["Go", "CLI", "Developer Experience"],
    status: { label: "持续开发", tone: "plain" },
    repoUrl: "https://github.com/lens077/go-connect-template-cli",
    lastVerifiedAt: "2026-09-11",
    featured: false,
  },
  {
    id: "postgres-cdc-pipeline",
    title: "PostgreSQL CDC Pipeline",
    category: "tech-practice",
    subcategory: "数据工程",
    summary:
      "使用 Debezium CDC 与 Kafka 将 PostgreSQL 变更同步到 Elasticsearch 的数据链路实践。公开仓库待核验后补链接。",
    tags: ["PostgreSQL", "Debezium", "Kafka", "Elasticsearch"],
    status: { label: "维护状态待核验", tone: "glow" },
    featured: false,
  },
  ...gameEntries,
];

export function directoryByCategory(id: DirectoryCategoryId) {
  return id === "all"
    ? directoryEntries
    : directoryEntries.filter((e) => e.category === id);
}
