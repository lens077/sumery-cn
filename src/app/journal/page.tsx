import type { Metadata } from "next";
import type { BlogPost } from "@/lib/rss/schema";
import { ArticleCard, SectionHeader } from "@/components/home/article-card";
import postsData from "../../../data/blog-posts.json";

export const metadata: Metadata = {
  title: "博客文章",
  description: "来自希曼博客的最新文章，点击前往 blog.apikv.com 阅读原文。",
  alternates: { canonical: "/journal/" },
};

export default function JournalPage() {
  const posts = postsData.posts as BlogPost[];
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <SectionHeader eyebrow="JOURNAL" title="博客文章" />
      {posts.length === 0 ? (
        <p className="glass-card p-6 text-sm text-ink-500">
          文章正在同步，稍后再来看看。
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
