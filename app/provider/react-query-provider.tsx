import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { Toaster } from "sonner";

export const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster richColors />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
