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

### Customize button

```tsx
  size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        xs: "text-xs py-2 px-3 tracking-normal",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
```

### Stacked bar chart

[Recharts](https://recharts.github.io/)

```sh
pnpm dlx shadcn@latest add chart
```

```tsx
"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    office: 82,
    wfh: 44,
  },
  {
    name: "Feb",
    office: 80,
    wfh: 40,
  },
  {
    name: "Mar",
    office: 83,
    wfh: 42,
  },
  {
    name: "Apr",
    office: 50,
    wfh: 50,
  },
  {
    name: "May",
    office: 40,
    wfh: 60,
  },
  {
    name: "Jun",
    office: 60,
    wfh: 40,
  },
  {
    name: "Jul",
    office: 55,
    wfh: 55,
  },
  {
    name: "Aug",
    office: 49,
    wfh: 61,
  },
  {
    name: "Sep",
    office: 44,
    wfh: 70,
  },
  {
    name: "Oct",
    office: 40,
    wfh: 40,
  },
  {
    name: "Nov",
    office: 50,
    wfh: 50,
  },
  {
    name: "Dec",
    office: 50,
    wfh: 50,
  },
];

export function WorkLocationTrends() {
  const legendFormatter = (val: string) => {
    let label = val;
    switch (val) {
      case "wfh":
        label = "From Home";
        break;

      case "office":
        label = "From Office";
        break;
    }

    return <div className="text-sm">{label}</div>;
  };

  const tooltipFormatter = (val: string, name: string) =>
    name === "wfh" ? [val, "Form Home"] : [val, "From Office"];

  return (
    <ResponsiveContainer height={350} width="100%">
      <BarChart
        className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"
        data={data}
      >
        <XAxis dataKey="name" stroke="#888888" fontSize={12} />
        <YAxis stroke="#888888" fontSize={12} />
        <Tooltip
          formatter={tooltipFormatter}
          separator=": "
          labelClassName="font-bold"
          wrapperClassName="!text-sm dark:!bg-black rounded-md !border-border"
        />
        <Legend iconType="circle" formatter={legendFormatter} />
        <Bar dataKey="office" stackId={1} fill="#ec4899" />
        <Bar dataKey="wfh" stackId={1} fill="#6b7280" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### Pie chart

```tsx
"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export function TeamDistributionChart() {
  const data = [
    {
      name: "Delta",
      value: 55,
      color: "#84cc16",
    },
    {
      name: "Alpha",
      value: 34,
      color: "#3b82f6",
    },
    {
      name: "Canary",
      value: 11,
      color: "#f97316",
    },
  ];

  return (
    <ResponsiveContainer height={150} width="100%">
      <PieChart>
        <Tooltip
          wrapperClassName="rounded-md border border-border bg-background shadow-md text-sm"
          labelClassName="font-semibold text-foreground"
        />
        <Pie dataKey="value" nameKey="name" data={data}>
          {data.map(d => (
            <Cell key={d.name} fill={d.color} values="value" />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
```

### Line graph

```tsx
"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SupportTicketsResolved() {
  const data = [
    {
      name: "Jan",
      delta: 40,
      alpha: 24,
      canary: 24,
    },
    {
      name: "Feb",
      delta: 30,
      alpha: 13,
      canary: 22,
    },
    {
      name: "Mar",
      delta: 20,
      alpha: 58,
      canary: 29,
    },
    {
      name: "Apr",
      delta: 14,
      alpha: 30,
      canary: 15,
    },
    {
      name: "May",
      delta: 29,
      alpha: 28,
      canary: 18,
    },
    {
      name: "Jun",
      delta: 19,
      alpha: 19,
      canary: 10,
    },
    {
      name: "Jul",
      delta: 34,
      alpha: 24,
      canary: 14,
    },
    {
      name: "Aug",
      delta: 21,
      alpha: 20,
      canary: 19,
    },
    {
      name: "Sep",
      delta: 49,
      alpha: 43,
      canary: 20,
    },
    {
      name: "Oct",
      delta: 43,
      alpha: 55,
      canary: 4,
    },
    {
      name: "Nov",
      delta: 39,
      alpha: 40,
      canary: 25,
    },
    {
      name: "Dec",
      delta: 34,
      alpha: 43,
      canary: 11,
    },
  ];

  const legendFormatter = (value: string) => (
    <span className="capitalize">{value}</span>
  );

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          wrapperClassName="rounded-md border border-border bg-background shadow-md text-sm"
          labelClassName="font-semibold text-foreground"
        />
        <XAxis fontSize={12} dataKey="name" stroke="#888888" />
        <YAxis fontSize={12} />
        <CartesianGrid strokeDasharray="3" />
        <Line type="monotone" dataKey="delta" stroke="#84cc16" />
        <Line type="monotone" dataKey="alpha" stroke="#3b8286" />
        <Line type="monotone" dataKey="canary" stroke="#f97316" />
        <Legend formatter={legendFormatter} />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

## Extras

### Drawer

```sh
pnpm dlx shadcn@latest add drawer
```
