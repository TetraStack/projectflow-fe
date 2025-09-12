import { getData, postData } from "@/lib/fetch-util";
import type { ForgotPasswordFormData } from "@/routes/auth/forgot-password";
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
        queryFn: () => getData("/auth"),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
}

export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: () => postData("/auth/logout")
    })
}

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: (data: ForgotPasswordFormData) => postData("/auth/reset-password-request", data)
    })
}

export const useResetpasswordMutation = () => {
    return useMutation({
        mutationFn: (data: {
            token: string,
            password: string
        }) => postData("/auth/reset-passowrd", data)
    })
}