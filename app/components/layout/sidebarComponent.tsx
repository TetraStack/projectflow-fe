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
  SquareDashedKanban,
  SquareKanban,
  Wrench,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

interface Props {
  currentWorkspace: Workspace | null;
}

const SidebarComponent: React.FC<Props> = ({ currentWorkspace }) => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div
      className={cn(
        "relative border-r border-dashed flex flex-col  bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16 md:w[80px]" : "w-16 md:w-[240px]"
      )}
    >
      {isCollapsed ? (
        <ChevronRightCircle
          className="absolute -right-3 bottom-5 z-50 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      ) : (
        <ChevronLeftCircle
          className="absolute -right-3 bottom-5 z-50 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      {/* projectflow logo */}
      <div className="h-14 border-b border-dashed flex items-center px-4 mb-4">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <SquareKanban className="size-6" />
              <span className="font-semibold text-lg hidden md:block">
                ProjectFlow
              </span>
            </div>
          )}

          {isCollapsed && <SquareKanban className="size-6" />}
        </Link>
      </div>
      <div className="flex flex-col space-y-8 px-4">
        {navItems.map((item) => {
          return (
            <Link to={item.href} className="flex gap-2">
              <item.icon /> {!isCollapsed && item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarComponent;
