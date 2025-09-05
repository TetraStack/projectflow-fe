import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Input } from "@/components/ui/input";
import { useSignUpMutation } from "@/hooks/use-auth";
import { signInSchema, signUpSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import * as z from "zod";

export type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  const { mutate: register, isPending } = useSignUpMutation();

  const onSubmit = (values: SignUpFormData) => {
    register(values, {
      onSuccess: () => {
        toast.success("Email Verifcation Required", {
          description:
            "Please check your email for a verification link. If you don't see it, Please check your spam folder.",
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="flex flex-col items-center justify-center  p-4 h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold ">Welcome back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground px-0">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? "Signing up..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <CardFooter>
            <div className="flex items-center justify-center w-full">
              <p className="text-sm  text-muted-foreground ">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-primary underline cursor-pointer"
                >
                  SignIn
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
