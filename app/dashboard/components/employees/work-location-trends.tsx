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
