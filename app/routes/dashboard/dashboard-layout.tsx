import Header from "@/components/layout/header";
import SidebarComponent from "@/components/layout/sidebarComponent";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/use-auth";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import { LogOut } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  const { user, logout, isLoading } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("sign-in");
    }
  }, [user]);

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
          <div className="mx-auto container px-2 sm:px-6 lg:py-8 py-0 md:py-8">
            {<Outlet />}
          </div>
        </main>
      </div>
      {/* <Button className="cursor-pointer" onClick={logout} disabled={isLoading}>
        Logout
        <LogOut className="size-4" />
      </Button> */}
    </div>
  );
};

export default DashBoardLayout;
