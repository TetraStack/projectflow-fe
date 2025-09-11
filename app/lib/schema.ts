import * as z from "zod"

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export const signUpSchema = z.object({
    email: z.string().email("Inavalid email address"),
    password: z.string().min(8, "Password must be 8 characters"),
    name: z.string().min(3, "name must be at least 3 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be 8 characters"),
}).refine(val => val.confirmPassword === val.password, {
    path: ["confirmPassword"],
    message: "Password do no match"
})

export const resetPasswordSchema = z.object({
    newPassword: z.string().min(8, "Password must be 8 characters"),
    confirmPassword: z.string().min(8, "ConfirmPassword must be 8 characters")
}).refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match"
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address")
})

export const workspaceSchema = z.object({
    name: z.string().min(1, "Please provide name"),
    color: z.string().min(3, "Color should be atlest 3 character"),
    description: z.string().optional()
})