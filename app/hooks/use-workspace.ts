import type { WorkSpaceForm } from "@/components/workspace/create-workspace"
import { getData, postData } from "@/lib/fetch-util"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useCreateWorkspaceMutation = () => {
    return useMutation(
        {
            mutationFn: (data: WorkSpaceForm) => postData("/workspace", data)
        }
    )
}

export const useGetWorkspaces = () => {
    return useQuery({
        queryKey: ['workspaces'],
        queryFn: async () => getData("/workspace")
    })
}

// export const useGetWorkSpaceDetails = (workspaceId: string) => {
//     return useQuery({
//         queryFn: async () => getData(`/workspace/${workspaceId}`),
//         queryKey: ['workspace', workspaceId]
//     })
// }

export const useGetWorkspaceProjects = (workspaceId: string) => {
    return useQuery({
        queryKey: ['workspace', workspaceId],
        queryFn: async () => getData(`/workspace/${workspaceId}/projects`)
    })
}

export const useDashBoardData = (workspaceId: string) => {
    return useQuery({
        queryKey: ["workspace", workspaceId, "stats"],
        queryFn: async () => getData(`workspace/${workspaceId}/stats`)
    })
}