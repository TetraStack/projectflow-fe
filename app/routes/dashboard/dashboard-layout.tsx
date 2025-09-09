import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/hooks/use-auth";
import { useAuth } from "@/provider/auth-context";
import { LogOut } from "lucide-react";
import React, { use, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  const { user, logout, isLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("sign-in");
    }
  }, [user]);

  return (
    <div className="bg-background h-screen">
      <Button
        className="cursor-pointer"
        onClick={logout}
        disabled={isLoading}
      >
        Logout
        <LogOut className="size-4" />
      </Button>
      {children}
    </div>
  );
};

export default DashBoardLayout;
