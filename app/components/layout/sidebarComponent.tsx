import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/provider/auth-context";
import type { Workspace } from "@/types";
import {
  ArrowLeftToLine,
  ArrowLeftToLineIcon,
  ArrowRightToLine,
  ArrowRightToLineIcon,
  ChevronLeftCircle,
  ChevronRightCircle,
  LogOut,
  SquareDashedKanban,
  SquareKanban,
  Wrench,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import SidebarNav from "./sidebarNav";

interface Props {
  currentWorkspace: Workspace | null;
}

const SidebarComponent: React.FC<Props> = ({ currentWorkspace }) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "relative  border-dashed border-r-3 flex flex-col  bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w[80px]" : "w-16 md:w-[240px]"
      )}
    >
      <Button
        className="absolute -right-6 bottom-15 z-50 cursor-pointer hidden md:block"
        variant={"ghost"}
        size={"icon"}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRightCircle className="size-6" />
        ) : (
          <ChevronLeftCircle className="size-6" />
        )}
      </Button>

      {/* projectflow logo */}
      <div className="h-14 border-b-3 border-dashed flex items-center px-4 mt-0.5 mb-4">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2 text-primary">
              <SquareKanban className="size-6 " />
              <span className="font-semibold text-lg hidden md:block">
                ProjectFlow
              </span>
            </div>
          )}

          {isCollapsed && <SquareKanban className="size-6" />}
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && "items-center space-y-3")}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      <Button
        className={cn("justify-start  mx-3 mb-5 hover:text-primary")}
        variant={"outline"}
        onClick={logout}
      >
        <LogOut className="mr-2 size-4" />

        {isCollapsed ? <span className="sr-only ">Logout</span> : "Logout"}
      </Button>
    </div>
  );
};

export default SidebarComponent;
