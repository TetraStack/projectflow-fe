import {Button} from "@/components/ui/button";
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
import {Input} from "@/components/ui/input";
import {useSignInMutation} from "@/hooks/use-auth";
import {signInSchema} from "@/lib/schema";
import {useAuth} from "@/provider/auth-context";
import {zodResolver} from "@hookform/resolvers/zod";
import {Eye} from "lucide-react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {toast} from "sonner";
import * as z from "zod";

export type SignInFormData = z.infer<typeof signInSchema>;

const UserSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  name: z.string(),
  isEmailverified: z.boolean(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {login} = useAuth();
  const {mutate: signIn, isPending} = useSignInMutation();

  const onSubmit = (value: SignInFormData) => {
    signIn(value, {
      onSuccess: (data) => {
        const userData = UserSchema.parse(data);

        login(userData);
        toast.success("Login Successfully");
        navigate("/dashboard");
      },
      onError: (error) => toast.error(error as unknown as string),
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 flex-col items-center justify-center  p-4 h-screen bg-background gap-8">
      <div className="relative flex items-center justify-center h-screen overflow-hidden">
        <div
          className="h-full w-full bg-center bg-contain bg-no-repeat
               [mask-image:linear-gradient(to_right,transparent,black,transparent)]
               [-webkit-mask-image:linear-gradient(to_right,transparent,black,transparent)]
               [mask-repeat:no-repeat] [mask-size:100%_100%]"
          style={{backgroundImage: "url('/signin.png')"}}
        />
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-full shadow-xl max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold ">Welcome back</CardTitle>
            <CardDescription className="text-sm text-muted-foreground px-0">
              Sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
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
                  render={({field}) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-primary"
                        >
                          Forgot Passowrd?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative ">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="******"
                            {...field}
                            className="relative"
                          ></Input>
                          <Eye
                            className="absolute right-2 top-2 cursor-pointer"
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full cursor-pointer">
                  {isPending ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>

            <CardFooter>
              <div className="flex items-center justify-center w-full">
                <p className="text-sm  text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="text-primary underline cursor-pointer"
                  >
                    SignUp
                  </Link>
                </p>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
