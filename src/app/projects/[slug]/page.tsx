import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <p className="section-eyebrow">PROJECT</p>
      <h1 className="mt-1 text-3xl font-bold text-white">{project.name}</h1>
      <p className="mt-3 text-lg text-glow-soft">{project.tagline}</p>
      <p className="mt-6 max-w-2xl leading-7 text-ink-500">
        {project.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="chip">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        {project.repositoryUrl && (
          <a
            className="cta-secondary"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub 仓库 ↗
          </a>
        )}
        {project.repositoryNote && (
          <p className="text-sm text-ink-500">{project.repositoryNote}</p>
        )}
      </div>
    </div>
  );
}
