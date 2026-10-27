import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "工程项目",
  description: "精选的微服务、电商与工程项目。",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <h1 className="text-3xl font-bold text-white">工程项目</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}/`}
            className="glass-card glass-card-hover block p-6"
          >
            <h2 className="text-base font-semibold text-white">{p.name}</h2>
            <p className="mt-1 text-sm text-glow-soft">{p.tagline}</p>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              {p.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
