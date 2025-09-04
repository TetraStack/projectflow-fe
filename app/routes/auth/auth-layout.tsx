import { useAuth } from "@/provider/auth-context";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader className="size-5 animate-spin"></Loader>;

  if (isAuthenticated) <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default AuthLayout;
