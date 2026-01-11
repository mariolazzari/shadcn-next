"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { Input } from "./input";
import { EyeIcon, EyeOff } from "lucide-react";

export function PasswordInput({
  ref,
  className,
  ...props
}: ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  function hideText() {
    setShowPassword(false);
  }

  function showText() {
    setShowPassword(true);
  }

  return (
    <div className="relative">
      <Input
        ref={ref}
        className={cn("pr-10", className)}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <span className="absolute top-1.75 right-1 cursor-pointer select-none">
        {showPassword ? (
          <EyeIcon onClick={hideText} />
        ) : (
          <EyeOff onClick={showText} />
        )}
      </span>
    </div>
  );
}
