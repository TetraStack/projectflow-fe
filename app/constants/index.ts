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
