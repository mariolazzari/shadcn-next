"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

type Props = {
  className?: string;
};

export function LightDarkToogle({ className }: Props) {
  const { setTheme, resolvedTheme } = useTheme();

  const onClick = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild className={className} onClick={onClick}>
        <Button variant="outline">
          <SunIcon className="block dark:hidden" />
          <MoonIcon className="hidden dark:block" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span className="hidden dark:inline">Eneble light mode</span>
        <span className="inline dark:hidden">Eneble dark mode</span>
      </TooltipContent>
    </Tooltip>
  );
}
