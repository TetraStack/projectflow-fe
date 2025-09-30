import type {navItems} from "@/constants";
import {cn} from "@/lib/utils";
import type {Workspace} from "@/types";
import type {LucideIcon} from "lucide-react";
import React from "react";
import z from "zod";
import {Button} from "../ui/button";
import {useLocation, useNavigate} from "react-router";

interface Props extends React.HtmlHTMLAttributes<HTMLElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  className?: string;
  currentWorkspace: Workspace | null;
}

const SidebarNav: React.FC<Props> = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className={cn("flex flex-col gap-y-2", className)} {...props}>
      {items.map(({title, href, icon}) => {
        const Icon = icon;

        console.log("href=====>", href);
        console.log("location.pathname=====>", location.pathname);
        const isActive = location.pathname === href;
        const handleOnclick = () => {
          if (href === "/workspaces") {
            navigate(href);
          } else if (currentWorkspace && currentWorkspace._id) {
            navigate(`${href}/?workspaceId=${currentWorkspace._id}`);
          } else {
            navigate(href);
          }
        };
        return (
          <Button
            className={cn(
              "justify-start hover:text-primary",
              isActive && "bg-primary/20 text-primary font-medium"
            )}
            key={title}
            variant={isActive ? "outline" : "ghost"}
            onClick={handleOnclick}
          >
            <Icon className="mr-2 size-4" />
            {isCollapsed ? <span className="sr-only">{title}</span> : title}
          </Button>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
