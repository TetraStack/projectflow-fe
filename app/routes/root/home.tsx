import React from "react";
import type { Route } from "./+types/home";
import { Button } from "@/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProjectFlow" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Homepage = () => {
  return <div>Homepage
    <Button/>
  </div>;
};

export default Homepage;
