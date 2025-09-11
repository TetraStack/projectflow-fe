import type { WorkSpaceForm } from "@/components/workspace/create-workspace"
import { postData } from "@/lib/fetch-util"
import { useMutation } from "@tanstack/react-query"

export const useCreateWorkspaceMutation = () => {
    return useMutation(
        {
            mutationFn: (data: WorkSpaceForm) => postData("/workspace", data)
        }
    )
}