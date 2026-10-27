import { z } from "zod";

/**
 * RSS 同步产物 data/blog-posts.json 的 schema；同步脚本与页面共用。
 */
export const blogPostSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  summary: z.string().max(400),
  publishedAt: z.string().datetime(),
});

export const blogPostsSchema = z.object({
  syncedAt: z.string().datetime(),
  posts: z.array(blogPostSchema),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
