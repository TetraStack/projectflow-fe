import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const toogleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button onClick={toogleTheme} variant={"ghost"} className="cursor-pointer ">
      <Sun className="size-5 hidden dark:block" />
      <Moon className="size-5 block dark:hidden " />
    </Button>
  );
}
