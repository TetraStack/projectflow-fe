import {useAuth} from "@/provider/auth-context";
import type {Workspace} from "@/types";
import React, {useEffect} from "react";
import {Button} from "../ui/button";

import {
  ArrowDown,
  Bell,
  ChevronDown,
  PlusCircle,
  UserCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {Avatar, AvatarImage} from "../ui/avatar";
import {ModeToggle} from "../mode-toggle";
import {Link, useLoaderData, useSearchParams} from "react-router";
import WorkspaceAvatar from "../workspace/workspace-avatar";
import {withOpacity} from "../workspace/workspace-card";

interface Props {
  onWorkspaceSelected: (workspace: Workspace) => void;
  selectedWorkspace: Workspace | null;
  onCreateWorkspace: () => void;
}

const Header: React.FC<Props> = ({
  onWorkspaceSelected,
  selectedWorkspace,
  onCreateWorkspace,
}) => {
  const {user, logout} = useAuth();
  const data = useLoaderData() as {workspaces: Workspace[]};
  const workspaces = data?.workspaces ?? [];

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  useEffect(() => {
    if (workspaceId && workspaces.length > 0) {
      const found = workspaces.find((w) => w._id === workspaceId);
      if (found) onWorkspaceSelected(found);
    }
  }, [workspaceId]);

  return (
    <div className="bg-background sticky  top-0 z-40 border-b-3 border-dashed border-primary/20">
      <div className="flex items-center gap-2 h-14 justify-between px-2 sm:px-6 py-4 container mx-auto">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={
                "flex border  p-2 rounded-lg cursor-pointer text-sm items-center"
              }
              style={{
                borderColor: withOpacity(selectedWorkspace?.color, 0.4),
              }}
            >
              {selectedWorkspace ? (
                <>
                  {selectedWorkspace.color && (
                    <WorkspaceAvatar
                      color={selectedWorkspace.color}
                      name={selectedWorkspace.name}
                    />
                  )}
                  <span className="font-medium ml-2">
                    {selectedWorkspace.name}
                  </span>
                </>
              ) : (
                <span className="font-medium">Select Workspace</span>
              )}
              <ChevronDown className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>Workspace</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace._id}
                    onClick={() => onWorkspaceSelected(workspace)}
                  >
                    {workspace.color && (
                      <WorkspaceAvatar
                        color={workspace.color}
                        name={workspace.name}
                      />
                    )}

                    <span className="ml-2 capitalize">{workspace.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={onCreateWorkspace}>
                  <PlusCircle className="size-4 mr-2" />
                  Create Workspace
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex item-center gap-2">
          <Button variant={"ghost"} size={"icon"} className="cursor-pointer">
            <Bell className="size-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} size={"icon"}>
                {user?.profilePicture ? (
                  <Avatar>
                    <AvatarImage src={user?.profilePicture} />
                  </Avatar>
                ) : (
                  <UserCircle className="size-6" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/user/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
