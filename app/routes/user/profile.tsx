import React from "react";
import z from "zod";

interface Props {}

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, {message: "Current password is required"}),

    newPassword: z.string().min(8, {message: "New password is required"}),
    confirmPassword: z
      .string()
      .min(8, {message: "Confirm password is required"}),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const profileSchema = z.object({
  name: z.string().min(1, {message: "Name is required"}),
  profilePicture: z.string().optional(),
});

const Profile: React.FC<Props> = () => {
  return <div>Profile</div>;
};

export default Profile;
