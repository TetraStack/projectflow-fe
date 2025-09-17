import type { CreteTaskFormData } from "@/components/task/create-task"
import { postData, putData } from "@/lib/fetch-util"
import type { Project, TaskStatus } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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

export const useUpdateTaskStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: { taskId: string, status: TaskStatus }) =>
            putData(`/task/${data.taskId}/status`, { status: data.status }),
        onSuccess: (data: any) => {
            queryClient.invalidateQueries({
                queryKey: ["project", data.project]
            })
        }
    })
}