
import projects from "../../../config/projects.json";
import { ProjectRenderer } from "../../projects/ProjectRenderer";
import { ProjectConfig } from "../../types";

export default async function HomePage() {
  const projectsMap = projects as Record<string, ProjectConfig>;
  const project = projectsMap["fridge-chef"];

  if (!project) {
    return null;
  }

  return (
    <>
      {/* === Header 导航区 === */}
      {/* === Hero 核心工具区 === */}
      {/* === Features 特性区 === */}
      {/* === Pricing 定价区 === */}
      {/* === FAQ 常见问题区 === */}
      {/* === Footer 底部区 === */}
      <ProjectRenderer project={project} slug="fridge-chef" />
    </>
  );
}
