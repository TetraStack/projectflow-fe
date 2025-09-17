import type { TaskStatus } from "@/types"

export const publicRoutes = ["/sign-in", "/sign-up", "/verify-email", "/reset-password", "/forgot-password", "/"]

export const getProjectProgress = (tasks: { status: TaskStatus }[]) => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(task => task.status === "Done").length

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
}