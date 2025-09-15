import Header from "@/components/layout/header";
import SidebarComponent from "@/components/layout/sidebarComponent";
import { Button } from "@/components/ui/button";
import CreateWorkspace from "@/components/workspace/create-workspace";
import { useLogoutMutation } from "@/hooks/use-auth";
import { getData } from "@/lib/fetch-util";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { LogOut } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([getData("/workspace")]);

    return { workspaces };
  } catch (error) {
    console.log(error);
  }
};

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  const { user, logout, isLoading, isAuthenticated } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("sign-in");
    }
  }, [user]);

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="bg-background h-screen w-full flex">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />
        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:py-8 py-4 md:py-8">
            {<Outlet />}
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashBoardLayout;
