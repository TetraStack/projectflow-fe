
export interface User {
    _id: string,
    email: string,
    name: string,
    createdAt?: Date,
    isEmailverified: boolean
    profilePicture?: string
}

export interface Workspace {
    _id: string
    name: string
    description?: string
    owner: User | string
    color: string
    members: {
        _id: string
        user: User
        role: "admin" | "member" | "owner" | "viewer"
        joinedAt: Date
    }[];
    createdAt: Date;
    updatedAy: Date
}

export enum ProjectStatus {
    Planning = "Planning",
    InProgress = "In Progress",
    OnHold = "On Hold",
    Completed = "Completed",
    Cancelled = "Cancelled",
}

export interface Project {
    _id: string
    title: string
    description?: string
    status: ProjectStatus
    startDate: Date
    dueDate: Date
    progress: number
    tasks: Task[]
    members: {
        user: User
        role: ProjectMemberRole
    }[]
    isArchived: boolean
    workspace: Workspace
    createdAt: Date
    updatedAt: Date
}

export interface Task {
    _id: string
    title: string
    description?: string
    status: TaskStatus
    project: Project
    createdAt: Date
    updatedAt: Date
    isArchived: boolean
    dueDate: Date
    priority: TaskPriority
    assignee: User | string
    createdBy: User | string
    assignees: User[]
    subTasks: SubTask[]
    watchers: User[]
    attachments: Attachment[]
}

export type TaskStatus = "To Do" | "In Progress" | "Review" | "Done"
export type TaskPriority = "Low" | "Medium" | "High"
export enum ProjectMemberRole {
    MANAGER = "manager",
    CONTRIBUTOR = "contributor",
    VIEWER = "viewer"
}
export type SubTask = {
    _id: string
    title: string
    completed: boolean
    createdAt: Date
}
export type Attachment = {
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
    uploadedBy: string
    uploadedAt: Date
    _id: string
}

export type Action =

    | "created_task"
    | "updated_task"
    | "deleted_task"
    | "completed_task"
    | "assigned_task"
    | "unassigned_task"

    | "created_subtask"
    | "updated_subtask"
    | "deleted_subtask"
    | "completed_subtask"
    | "assigned_subtask"
    | "unassigned_subtask"

    | "created_project"
    | "updated_project"
    | "deleted_project"
    | "archived_project"
    | "restored_project"
    | "added_project_member"
    | "removed_project_member"

    | "created_workspace"
    | "updated_workspace"
    | "deleted_workspace"
    | "joined_workspace"
    | "left_workspace"
    | "transferred_workspace_ownership"
    | "invited_workspace_member"
    | "removed_workspace_member"

    | "added_comment"
    | "updated_comment"
    | "deleted_comment"

    | "added_attachment"
    | "removed_attachment"

    | "added_label"
    | "removed_label"

    | "added_member"
    | "removed_member"
    | "mentioned_user";

export type Resource = "Task" | "Project" | "Workspace" | "Comment" | "User"

export interface Activity {
    _id: string
    user: User
    action: Action,
    resourceType: Resource,
    resourceId: string
    details: { descriptiom: string }
    createdAt: Date
}

export interface CommentReaction {
    emoji: string
    user: User
}

export interface Comment {
    _id: string
    author: User
    text: string
    createdAt: Date
    reactions?: CommentReaction[]
    attchments?: {
        fileName: string
        fileUrl: string
        fileType?: string
        fileSize?: number
    }
}

export interface StateCardProps {
    totalProjects: number
    totalTasks: number
    totalProjectsInProgress: number
    totalTaskCompleted: number
    totalTaskToDo: number
    totalTaskInProgress: number
}

export type DashboardData = {
    stats: StateCardProps;
    taskTrendsData: {
        name: string;
        Done: number;
        In_Progress: number;
        To_Do: number;
    }[];
    projectStatusData: {
        name: string;
        value: number;
        color: string;
    }[];
    taskPriorityData: {
        name: string;
        value: number;
        color: string;
    }[];
    workspaceProductivityData: {
        name: string;
        completed: number;
        total: number;
    }[];
    upcomingTasks: Task[];
    recentProjects: Project[];
}