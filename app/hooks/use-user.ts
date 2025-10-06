import { getData, updateData } from "@/lib/fetch-util";
import type { ChnagePasswordFormData, ProfileFormData } from "@/routes/user/profile";
import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query";

const queryKey: QueryKey = ["user"]

export const useUserProfileQuery = () => {
    return useQuery({
        queryKey,
        queryFn: () => getData("/user/profile")
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: ChnagePasswordFormData) => updateData("/user/change-password", data)
    })
}

export const useUpdateUserProfile = () => {
    return useMutation({
        mutationFn: async (data: ProfileFormData) => updateData("/user/profile", data)
    })
}