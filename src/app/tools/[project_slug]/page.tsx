import projects from "../../../../config/projects.json";
import { ProjectRenderer } from "../../../projects/ProjectRenderer";
import { ProjectConfig } from "../../../types";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = Object.keys(projects).filter((k) => k !== "default");
  return slugs.map((slug) => ({ project_slug: slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ project_slug: string }>;
}) {
  const { project_slug } = await params;
  const projectsMap = projects as Record<string, ProjectConfig>;
  const project = projectsMap[project_slug];

  if (!project) {
    notFound();
  }

  return <ProjectRenderer project={project} slug={project_slug} />;
}
