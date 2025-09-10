import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetpasswordMutation } from "@/hooks/use-auth";
import { resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Eye } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { mutate: resetPassword, isPending } = useResetpasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    if (!token) return;
    resetPassword(
      { token, password: data.newPassword },
      {
        onSuccess: () => toast.success("Password is changed."),
        onError: (error) => {
          toast.error(error + "");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">Enter your Password below</p>
        </div>

        <Card>
          <CardHeader>
            <Link to="/sign-in" className="flex gap-2 items-center">
              <ArrowLeft className="size-4" />
              <span>Back to sign in</span>
            </Link>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center">
                <CheckCircle2 className="size-10 text-green-500" />
                <h1 className="text-2xl font-bold">
                  Password reset successful
                </h1>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <div className="relative ">
                              <Input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="******"
                                {...field}
                              />
                              <Eye
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={() => {
                                  setShowNewPassword(!showNewPassword);
                                }}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative ">
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="******"
                                {...field}
                              />
                              <Eye
                                className="absolute right-2 top-2 cursor-pointer"
                                onClick={() => {
                                  setShowConfirmPassword(!showConfirmPassword);
                                }}
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <Button type="submit" className="w-full cursor-pointer">
                    {isPending ? "Please wait..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
