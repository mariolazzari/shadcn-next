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
