import { Card } from "@/components/ui/card";
import NoDataFound from "@/components/workspace/no-data-found";
import type { Project, User } from "@/types";
import React from "react";
import ProjectCard from "./project-card";

interface Props {
  workspaceId: string;
  onCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({
  projects,
  onCreateProject,
  workspaceId,
}) => {
  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Projects</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <NoDataFound
            buttonAction={() => onCreateProject(true)}
            title="No Project Found"
            description="Create a Project to get started"
            buttonText="Create Project"
          />
        ) : (
          projects.map((project) => {
            const projectProgress = 0;

            return (
              <ProjectCard
                key={project._id}
                project={project}
                workspaceId={workspaceId}
                progress={projectProgress}
              ></ProjectCard>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProjectList;
