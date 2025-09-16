import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getTaskStatusColor } from "@/constants";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { format } from "date-fns";
import { Calendar1Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface Props {
  project: Project;
  workspaceId: string;
  progress: number;
}

const ProjectCard: React.FC<Props> = ({ project, progress, workspaceId }) => {
  return (
    <Link to={`/workspaces/${workspaceId}/projects/${project._id}`}>
      <Card className="transition-all duration-300 hover:shadow-md hover:translate-y-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{project.title}</CardTitle>
            <span
              className={cn(
                "text-xs rounded-full p-2",
                getTaskStatusColor(project.status)
              )}
            >
              {project.status}
            </span>
          </div>
          <CardDescription className="line-clamp-2">
            {project.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm gap-2 text-muted-foreground">
                <span>{project.tasks.length}</span>
                <span>Tasks</span>
              </div>

              {project.dueDate && (
                <div className="flex items-center text-xs gap-2 text-muted-foreground">
                  <Calendar1Icon className="size-4" />
                  <span>{format(project.dueDate, "MMM d,yyyy")}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProjectCard;
