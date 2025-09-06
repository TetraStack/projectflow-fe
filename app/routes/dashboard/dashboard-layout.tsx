import React from "react";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return <div className="bg-background h-screen">{children}</div>;
};

export default DashBoardLayout;
