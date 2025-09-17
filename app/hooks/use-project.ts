import type { CreateProjectFormData } from "@/components/workspace/create-project"
import { getData, postData } from "@/lib/fetch-util"
import { queryClient } from "@/provider/react-query-provider"
import type { Project, Workspace } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateProject = () => {
    return useMutation({
        mutationFn: (data: { projectData: CreateProjectFormData, workspaceId: string }) => postData<{ workspace: Workspace, project: Project }>(`/project/${data.workspaceId}/create-project`, data.projectData),
        onSuccess: (data: { workspace: Workspace, project: Project }) => {
            queryClient.invalidateQueries({
                queryKey: ["workspace", data.workspace._id]
            })
        }
    })
}

export const useProjectDetails = (projectId: string) => {
    return useQuery({
        queryFn: () => getData(`/project/${projectId}/tasks`),
        queryKey: ["project", projectId]
    })
}