import type { User, Workspace } from "@/types";
import React from "react";
import WorkspaceAvatar from "./workspace-avatar";
import { Button } from "../ui/button";
import { PlusCircle, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  workspace: Workspace;
  members: {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
  }[];
  onCreateProject: React.Dispatch<React.SetStateAction<boolean>>;
  onInviteMember: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceHeader: React.FC<Props> = ({
  workspace,
  members,
  onCreateProject,
  onInviteMember,
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex md:items-center gap-3">
            {workspace.color && (
              <WorkspaceAvatar color={workspace.color} name={workspace.name} />
            )}

            <h2 className="text-xl md:text-2xl font-semibold">
              {workspace.name}
            </h2>
          </div>
          <div className="flex items-center gap-3 justify-between md:justify-start mb-4 md:mb-0">
            <Button
              className="text-primary hover:text-primary/80"
              variant={"outline"}
              onClick={() => onInviteMember(true)}
            >
              <UserPlus className="size-4 mr-2" />
              Invite
            </Button>
            <Button onClick={() => onCreateProject(true)}>
              <PlusCircle className="size-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {workspace.description && (
          <p className="text-sm md:text-base text-muted-foreground">
            {workspace.description}
          </p>
        )}
      </div>

      {members.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Members:</span>
          <div className="flex space-x-2">
            {members.map((member) => {
              return (
                <Avatar
                  key={member._id}
                  className="relative size-8 rounded-full border-2 border-background overflow-hidden"
                  title={member.user.name}
                >
                  <AvatarImage
                    src={member.user.profilePicture}
                    alt={member.user.name}
                  />
                  <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeader;
