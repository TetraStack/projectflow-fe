import type { CreteTaskFormData } from "@/components/task/create-task"
import { getData, postData, putData, updateData } from "@/lib/fetch-util"
import type { Project, TaskPriority, TaskStatus } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateTask = () => {

    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { projectId: string, taskData: CreteTaskFormData }) => postData(`/task/${data.projectId}`, data.taskData),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["project", data.project]
            })
        }
    })
}

export const useTaskByIdQuery = (taskId: string) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getData(`task/${taskId}`)
    })
}

export const useTaskTitleMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { title: string, taskId: string }) => updateData(`task/${data.taskId}/update-title`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useTaskDescriptionMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { description: string, taskId: string }) => updateData(`task/${data.taskId}/update-description`, { description: data.description }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })

            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useTaskStatusMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, taskStatus: string }) => updateData(`task/${data.taskId}/update-status`, { status: data.taskStatus }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useUpdateTaskAssigneesMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, assignees: string[] }) => updateData(`task/${data.taskId}/update-assignees`, { assignees: data.assignees }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useUpdateTaskPririty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, priority: TaskPriority }) => updateData(`task/${data.taskId}/update-priority`, { priority: data.priority }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useAddSubTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, title: string }) => postData(`task/${data.taskId}/add-subtask`, { title: data.title }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useUpdateSubTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, subTaskId: string, completed: boolean }) => updateData(`task/${data.taskId}/${data.subTaskId}/update-subtask`, { completed: data.completed }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task", data._id]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data._id]
            })
        }
    })
}

export const useGetTaskActivity = (taskId: string) => {
    return useQuery({
        queryKey: ["task-activity", taskId],
        queryFn: () => getData(`/task/${taskId}/getActivity`)
    })
}

export const useAddComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: { taskId: string, comment: string }) => postData(`/task/${data.taskId}/add-comment`, { comment: data.comment }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["task-comments", data.task]
            })
            queryClient.invalidateQueries({
                queryKey: ["task-activity", data.task]
            })
        }
    })
}

export const useGetAllComments = (taskId: string) => {
    return useQuery({
        queryKey: ["task-comments", taskId],
        queryFn: () => getData(`/task/${taskId}/get-comments`)
    })
}

