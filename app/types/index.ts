
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