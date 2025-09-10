import type { User } from "@/types";
import { createContext, use, useContext, useEffect, useState } from "react";
import { queryClient } from "./react-query-provider";
import { useCheckUser, useLogoutMutation } from "@/hooks/use-auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useCheckUser();
  const logoutMutation = useLogoutMutation();

  const isAuthenticated = !!user && !error;

  const login = async (data: User) => {
    queryClient.setQueryData(["user"], data);
  };
  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user: (user as User) || null,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
