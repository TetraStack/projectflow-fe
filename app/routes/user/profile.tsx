import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import BackButton from "@/components/ui/back-button";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import {Separator} from "@/components/ui/separator";
import {Spinner} from "@/components/ui/spinner";
import {
  useChangePassword,
  useUpdateUserProfile,
  useUserProfileQuery,
} from "@/hooks/use-user";
import {useAuth} from "@/provider/auth-context";
import type {User} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {toast} from "sonner";
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

export type ChnagePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

const Profile: React.FC<Props> = () => {
  const avatarUpload = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const {data: user, isPending} = useUserProfileQuery() as {
    data: User;
    isPending: boolean;
  };
  const {mutate: updateUserProfile, isPending: isUserProfileUpdating} =
    useUpdateUserProfile();

  const {mutate: updatePassword, isPending: isPasswordUpdating} =
    useChangePassword();

  const {logout} = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
    },
    values: {
      name: user?.name || "",
      profilePicture: user?.profilePicture || "",
    },
  });

  const handleProfileFormSubmit = (values: ProfileFormData) => {
    updateUserProfile(
      {
        name: values.name,
        profilePicture: values.profilePicture || "",
      },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
        },
        onError: (error) => toast.error("" + error),
      }
    );
  };

  const handlePasswordChange = (values: ChnagePasswordFormData) => {
    updatePassword(values, {
      onSuccess: () => {
        toast.success(
          "Password updated Successfully. You will be logged out. Please login again"
        );
        form.reset();

        setTimeout(() => {
          logout();
          navigate("/sign-in");
        }, 3000);
      },
      onError: (error) => toast.error("" + error),
    });
  };

  const handleAvatarChange = () => {};

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="px-4 md:px-0 flex gap-3">
        <BackButton />
        <div>
          <h3 className="text-lg font-medium">Profile Information</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              className="grid gap-4"
              onSubmit={profileForm.handleSubmit(handleProfileFormSubmit)}
            >
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="size-20 bg-foreground/50">
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback className="text-xl">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <input
                    ref={avatarUpload}
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    // disabled={uploading || isUserProfileUpdating}
                    style={{display: "none"}}
                  />

                  <Button
                    type="button"
                    size="sm"
                    variant={"outline"}
                    // disabled={uploading || isUserProfileUpdating}
                    onClick={() => avatarUpload.current?.click()}
                  >
                    Change Avatar
                  </Button>

                  {avatarFile && (
                    <div>
                      Selected:{" "}
                      <span className="font-medium">{avatarFile.name}</span>(
                      {Math.round(avatarFile.size / 1024)} KB)
                    </div>
                  )}

                  {/* {uploading && (
                    <div className="w-full bg-muted rounded h-2 mt-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded"
                        style={{width: `${uploadProgress}%`}}
                      />
                    </div>
                  )} */}
                </div>
              </div>

              <FormField
                control={profileForm.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  Your email address cannot be changed
                </p>
              </div>
              <Button
                type="submit"
                className="w-fit"
                disabled={isUserProfileUpdating || isPending}
              >
                {isUserProfileUpdating ? (
                  <>
                    <Spinner />
                    Saving
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form
              className="grid gap-4"
              onSubmit={profileForm.handleSubmit(handlePasswordChange)}
            >
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="current-password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="new-password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          id="confirm-password"
                          placeholder="*******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-fit"
                disabled={isPasswordUpdating || isPending}
              >
                {isPasswordUpdating ? (
                  <>
                    <Spinner />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
