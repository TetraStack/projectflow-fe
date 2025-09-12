import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import CreateWorkspace from "@/components/workspace/create-workspace";
import NoDataFound from "@/components/workspace/no-data-found";
import WorkspaceCard from "@/components/workspace/workspace-card";
import { useGetWorkspaces } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { PlusCircleIcon } from "lucide-react";

import React, { useState } from "react";

const Workspaces = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { data: workspaces, isLoading } = useGetWorkspaces() as {
    data: Workspace[];
    isLoading: boolean;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-3xl font-semibold">Workspaces</h2>
          <Button
            onClick={() => setIsCreatingWorkspace(true)}
            className="text-primary shadow-2xl hover:text-primary/80"
            variant={"outline"}
          >
            <PlusCircleIcon className="size-4" />
            New Workspace
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {workspaces.map((workspace) => {
            return (
              <WorkspaceCard
                key={workspace._id}
                workspace={workspace}
              ></WorkspaceCard>
            );
          })}

          {!workspaces.length && (
            <NoDataFound
              title="No workspaces found"
              description="Create a new Workspace top get started"
              buttonText="Create Workspace"
              buttonAction={() => setIsCreatingWorkspace(true)}
            />
          )}
        </div>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

export default Workspaces;
