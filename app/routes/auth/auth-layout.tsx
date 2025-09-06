import { useAuth } from "@/provider/auth-context";
import { Loader } from "lucide-react";
import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-5 animate-spin"></Loader>
      </div>
    );

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default AuthLayout;
