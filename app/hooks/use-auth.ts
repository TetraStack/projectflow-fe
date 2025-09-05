import { getData, postData } from "@/lib/fetch-util";
import type { SignInFormData } from "@/routes/auth/sign-in";
import type { SignUpFormData } from "@/routes/auth/sign-up";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: (data: SignUpFormData) => postData("/auth", data)
    })
}

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: (data: { token: string }) => postData("/auth/verify-email", data)

    })
}

export const useSignInMutation = () => {
    return useMutation({
        mutationFn: (data: SignInFormData) => postData("/auth/login", data)
    })

}

export const useCheckUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getData("/auth")
    })
}