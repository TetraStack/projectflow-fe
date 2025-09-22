import type { CreteTaskFormData } from "@/components/task/create-task"
import { getData, postData, putData } from "@/lib/fetch-util"
import type { Project, TaskStatus } from "@/types"
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

