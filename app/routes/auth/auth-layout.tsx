import Loader from "@/components/ui/loader";
import { PUBLIC_AUTH_PATHS } from "@/constants";
import { useAuth } from "@/provider/auth-context";

import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader />
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
