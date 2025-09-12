import { PUBLIC_AUTH_PATHS } from "@/constants";
import { useAuth } from "@/provider/auth-context";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader className="size-10 animate-spin text-primary"></Loader>
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
