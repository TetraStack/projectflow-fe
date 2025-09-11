import { CheckCircle2, Folder, LayoutDashboard, ListCheck, Settings, Users, Users2 } from "lucide-react";

export const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        title: "Workspaces",
        href: "/workspaces",
        icon: Folder
    },
    {
        title: "My Tasks",
        href: "/my-tasks",
        icon: ListCheck
    },
    {
        title: "Members",
        href: "/members",
        icon: Users
    },
    {
        title: "Achived",
        href: "/achieved",
        icon: CheckCircle2
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings
    }
]