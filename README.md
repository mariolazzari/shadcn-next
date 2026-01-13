# Shadcn UI & Next JS - Build beautiful dashboards with shadcn

## Introduction

### NextJS setup

[NextJS](https://ui.shadcn.com/docs/installation/next)

```sh
pnpx create-next-app@latest
```

### Shadcn setup

```js
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button
```

## Building the landing page

### Custom theme

[Theme](https://ui.shadcn.com/docs/dark-mode/next)

```sh
pnpm add next-themes
```

## Login page

### Login page card

[Card](https://ui.shadcn.com/docs/components/card)
[Form](https://ui.shadcn.com/docs/components/form)

```sh
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add input
```

### Account type (select component)

```sh
pnpm dlx shadcn@latest add select
```

[Select](https://ui.shadcn.com/docs/components/select)

### Date picker

```sh
pnpm dlx shadcn@latest add calendar
pnpm dlx shadcn@latest add popover
```

[Calendar](https://ui.shadcn.com/docs/components/calendar#date-of-birth-picker)

### Password fields

```ts
import { z } from "zod";

const accountTypeSchema = z
  .object({
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number<number>().optional(),
  })
  .superRefine((data, ctx) => {
    const { accountType, companyName, numberOfEmployees } = data;

    if (accountType === "company" && !companyName) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      accountType === "company" &&
      (!numberOfEmployees || numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["numberOfEmployees"],
        message: "Number of employees is required",
      });
    }
  });

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .refine(password => {
        // must contain at least 1 special character and 1 uppercase character
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });

const baseSchema = z.object({
  email: z.email(),
  dob: z.date().refine(date => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= eighteenYearsAgo;
  }, "You must be at least 18 years old"),
});

export const signupFormSchema = baseSchema
  .and(passwordSchema)
  .and(accountTypeSchema);

export type SignupForm = z.infer<typeof signupFormSchema>;
```

### Custom password component

```ts
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
```

### Checkbox

[Checkbox](https://ui.shadcn.com/docs/components/checkbox)

```sh
pnpm dlx shadcn@latest add checkbox
```

## Dashboard

### Dashboard layout

```tsx
import { Layout } from "@/types/Layout";

function DashboardLayout({ children }: Layout) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="bg-muted overflow-auto">side panel</div>
      <div className="overflow-auto p-4">
        <h1 className="pb-4">Welcome back, Mario!</h1>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
```

### Avatar

[Docs](https://ui.shadcn.com/docs/components/avatar)

```sh
pnpm dlx shadcn@latest add avatar
```

## Dashboard

### Team tabs

```sh
pnpm dlx shadcn@latest add tabs
```

### Data cards

```sh

```
