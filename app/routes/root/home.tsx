import React from "react";
import type {Route} from "./+types/home";
import {Button} from "@/components/ui/button";
import {Link} from "react-router";
import Countdown from "@/components/countdown";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "ProjectFlow"},
    {name: "description", content: "Welcome to React Router!"},
  ];
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Homepage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4 bg-background">
      <Countdown />
      {/* <Link to="/sign-in">
        <Button className="bg-primary text-background cursor-pointer">
          Login
        </Button>
      </Link>
      <Link to="/sign-up">
        <Button className="bg-primary text-background cursor-pointer">
          Sign Up
        </Button>
      </Link> */}
    </div>
  );
};

export default Homepage;
