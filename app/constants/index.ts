import type { ProjectStatus } from "@/types";
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
        title: "Archived",
        href: "/archived",
        icon: CheckCircle2
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings
    }
]

export const colorOptionsForWrokspaces = [
    "#e78a53",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#FFD433",
    "#33FFF5",
    "#9D33FF",
    "#FF8F33",
    "#33FF8F",
    "#FF3333",
    "#338FFF",

];

export const PUBLIC_AUTH_PATHS = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-email",
    "/reset-password",
    "/forgot-password",
    "*",

]

export const getTaskStatusColor = (status: ProjectStatus) => {
    switch (status) {
        case "Planning":
            return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
        case "In Progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
        case "On Hold":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
        case "Completed":
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
        case "Cancelled":
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
};

