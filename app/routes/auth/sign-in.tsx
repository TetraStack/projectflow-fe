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
import {Eye, ArrowRight, Sparkles, Shield, Users} from "lucide-react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {toast} from "sonner";
import * as z from "zod";
import {motion} from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{opacity: 0, x: 50}}
        animate={{opacity: 1, x: 0}}
        transition={{duration: 0.8, ease: "easeOut", delay: 0.2}}
        className="flex items-center justify-center p-8 lg:p-12"
      >
        <div className="w-full max-w-md">
          <motion.div
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.4}}
          >
            <Card className="w-full shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold ">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground px-0">
                  Sign in to your account to continue your journey
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
                          <FormLabel className="text-foreground font-medium">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              className="h-11 border-border/60 focus:border-primary transition-colors"
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
                            <FormLabel className="text-foreground font-medium">
                              Password
                            </FormLabel>
                            <Link
                              to="/forgot-password"
                              className="text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-11 pr-10 border-border/60 focus:border-primary transition-colors"
                                {...field}
                              />
                              <motion.button
                                type="button"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{scale: 1.02}}
                      whileTap={{scale: 0.98}}
                    >
                      <Button
                        type="submit"
                        className="w-full h-11  hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            Signing in...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            Sign in
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>

                <CardFooter className="pt-6">
                  <div className="flex items-center justify-center w-full">
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/sign-up"
                        className="text-primary hover:text-primary/80 underline cursor-pointer transition-colors font-medium"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.8, delay: 0.8}}
            className="mt-8 text-center"
          >
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link
                to="/terms"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
