import { Hero } from "@/components/home/hero";
import { ProductsSection, GamesSection } from "@/components/home/sections";
import {
  PlatformArchSection,
  TechPracticeSection,
} from "@/components/home/practice-sections";
import { directoryEntries } from "@/content/directory";
import { SectionHeader, ArticleCard } from "@/components/home/article-card";
import { products } from "@/content/products";
import { games } from "@/content/games";
import postsData from "../../data/blog-posts.json";
import type { BlogPost } from "@/lib/rss/schema";

export default function HomePage() {
  const posts = (postsData.posts as BlogPost[]).slice(0, 3);
  return (
    <>
      <Hero />
      <section className="bg-navy-950">
        <div className="mx-auto max-w-(--container-page) px-6 pt-20">
          <SectionHeader
            eyebrow="JOURNAL"
            title="最新文章"
            moreHref="/journal/"
          />
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
        <ProductsSection products={products} />
        <PlatformArchSection
          entries={directoryEntries.filter(
            (e) => e.category === "platform-arch",
          )}
        />
        <TechPracticeSection
          entries={directoryEntries.filter(
            (e) => e.category === "tech-practice",
          )}
        />
        <GamesSection games={games} />
      </section>
    </>
  );
}
