import type { Project } from "@/types";
import React from "react";

interface Props {
  project: Project;
  workspaceId: string;
  progress: number;
}

const ProjectCard: React.FC<Props> = ({ project, progress, workspaceId }) => {
  return <div>ProjectCard</div>;
};

export default ProjectCard;
