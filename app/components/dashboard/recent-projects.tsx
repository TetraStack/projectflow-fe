import type {Project} from "@/types";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {getProjectProgress} from "@/lib";
import {Link} from "react-router";
import {cn} from "lib/utils";
import {getTaskStatusColor} from "@/constants";
import {Progress} from "../ui/progress";

interface Props {
  data: Project[];
  workspaceId: string;
}

const RecentProjects: React.FC<Props> = ({data, workspaceId}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No Recent project yet
          </p>
        ) : (
          data.map((project) => {
            const projectProgress = getProjectProgress(project.tasks);
            return (
              <div key={project._id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Link
                    to={`/workspaces/${workspaceId}/projects/${project._id}`}
                  >
                    <h3 className="font-medium hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <span
                    className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      getTaskStatusColor(project.status)
                    )}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {project.description}
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Progress</span>
                    <span>{projectProgress}%</span>
                  </div>

                  <Progress className="h-2" value={projectProgress} />
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProjects;
