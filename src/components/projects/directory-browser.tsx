"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  DIRECTORY_CATEGORIES,
  directoryEntries,
  type DirectoryCategoryId,
  type DirectoryEntry,
} from "@/content/directory";

function EntryCard({ entry }: { entry: DirectoryEntry }) {
  return (
    <article className="glass-card glass-card-hover flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{entry.title}</h3>
        <span
          className={`chip ${entry.status.tone === "glow" ? "chip-glow" : ""}`}
        >
          {entry.status.label}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-500">
        {entry.subcategory} ·{" "}
        {DIRECTORY_CATEGORIES.find((c) => c.id === entry.category)?.label}
      </p>
      <p className="mt-2 flex-1 text-sm leading-6 text-ink-500">
        {entry.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {entry.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-5">
        {entry.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={entry.image}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="h-7 w-7 rounded-md"
          />
        )}
        {entry.homeUrl && (
          <a
            href={entry.homeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-sky-accent hover:underline"
          >
            官网 ↗
          </a>
        )}
        {entry.overseasUrl && (
          <a
            href={entry.overseasUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky-accent hover:underline"
          >
            海外 ↗
          </a>
        )}
        {entry.repoUrl && (
          <a
            href={entry.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky-accent hover:underline"
          >
            仓库 ↗
          </a>
        )}
        {entry.repoNote && (
          <span className="text-xs text-ink-500">{entry.repoNote}</span>
        )}
        {!entry.repoUrl &&
          !entry.homeUrl &&
          !entry.repoNote &&
          entry.category === "deploy-ops" && (
            <span className="text-xs text-ink-500">仓库待安全审计后公开</span>
          )}
      </div>
    </article>
  );
}

export function ProjectDirectory() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") ?? "all";
  const [category, setCategory] = useState<DirectoryCategoryId>(
    (DIRECTORY_CATEGORIES.some((c) => c.id === initialType)
      ? initialType
      : "all") as DirectoryCategoryId,
  );
  const [query, setQuery] = useState("");

  // 分类选择同步到 URL 查询参数（?type=platform 等）
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", category);
    window.history.replaceState(null, "", url);
  }, [category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directoryEntries.filter((e) => {
      if (category !== "all" && e.category !== category) return false;
      if (!q) return true;
      return [e.title, e.summary, e.subcategory, ...e.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="tablist"
          aria-label="项目分类"
          className="flex flex-wrap gap-2"
        >
          {DIRECTORY_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={category === c.id}
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c.id
                  ? "border-sky-accent bg-sky-accent/15 text-white"
                  : "border-line text-ink-400 hover:border-sky-accent hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">搜索项目</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索项目、标签或关键词…"
            className="w-full rounded-full border border-line bg-navy-900 px-4 py-2 text-sm text-white placeholder:text-ink-500 focus:border-sky-accent focus:outline-none"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-ink-500" aria-live="polite">
        共 {filtered.length} 个项目
      </p>

      {filtered.length === 0 ? (
        <div className="glass-card mt-6 p-10 text-center">
          <p className="text-white">没有找到匹配项目</p>
          <p className="mt-2 text-sm text-ink-500">
            请调整关键词或分类后再试。
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((e) => (
            <EntryCard key={e.id} entry={e} />
          ))}
        </div>
      )}
    </div>
  );
}
