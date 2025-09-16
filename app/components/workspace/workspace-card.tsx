import type { Workspace } from "@/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router";
import WorkspaceAvatar from "./workspace-avatar";
import { format } from "date-fns";
import { Users } from "lucide-react";

interface Props {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<Props> = ({ workspace }) => {
  return (
    <Link to={`/workspaces/${workspace._id}`}>
      <Card
        className="transition-all hover:shadow-md hover:-translate-y-1"
        style={{ borderColor: withOpacity(workspace.color, 0.4) }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 ">
              <WorkspaceAvatar color={workspace.color} name={workspace.name} />
              <div>
                <CardTitle>{workspace.name}</CardTitle>
                <span className="text-xs text-muted-foreground">
                  Created at:{format(workspace.createdAt, "MMM d,yyyy H:mm a")}
                </span>
              </div>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="size-4 mr-1" />
              <span className="text-xs">{workspace.members.length}</span>
            </div>
          </div>

          <CardDescription className="line-clamp-5">
            {`${workspace.description}` || "No Description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-sm text-muted-foreground">
            View Workspace details and projects
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export function withOpacity(hex: string = "", opacity: number) {
  const alpha = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return hex + alpha;
}

export default WorkspaceCard;
