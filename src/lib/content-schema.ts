import { z } from "zod";

export const PRODUCT_STATUSES = [
  "released",
  "open-source",
  "beta",
  "in-development",
  "paused",
] as const;

export const statusLabels: Record<(typeof PRODUCT_STATUSES)[number], string> = {
  released: "已发布",
  "open-source": "开源",
  beta: "公测",
  "in-development": "开发中",
  paused: "暂停维护",
};

export const productSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug 须为小写字母数字与连字符"),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["desktop", "browser"]),
  status: z.enum(PRODUCT_STATUSES),
  statusNote: z.string().optional(),
  platforms: z.array(z.string()).optional(),
  priceLabel: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  overseasUrl: z.string().url().optional(),
  screenshot: z.string().optional(),
  downloadUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  image: z.string().optional(),
  featured: z.boolean(),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()).min(1),
  repositoryUrl: z.string().url().optional(),
  repositoryNote: z.string().optional(),
  featured: z.boolean(),
});

export const gameSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(PRODUCT_STATUSES),
  statusNote: z.string().min(1),
  playUrl: z.string().url().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Game = z.infer<typeof gameSchema>;
