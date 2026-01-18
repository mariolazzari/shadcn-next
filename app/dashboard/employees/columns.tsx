"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  teamName: string;
  isTeamLeader: boolean;
  avatar?: string;
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "avatar",
    header: "",
    cell: ({ row }) => {
      const { avatar, firstName, lastName } = row.original;
      const fullName = `${firstName} ${lastName}`;
      const initials = `${firstName[0]} ${lastName[0]}`;

      if (avatar) {
        return (
          <Image
            className="rounded-full"
            src={avatar}
            alt={fullName}
            width={32}
            height={32}
          />
        );
      }

      return (
        <span className="uppercase bg-muted p-2 rounded-full">{initials}</span>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "teamName",
    header: "Team",
  },
  {
    accessorKey: "isTeamLeader",
    header: "",
    cell: ({ row }) => {
      return row.original.isTeamLeader ? (
        <Badge variant="success">Leader</Badge>
      ) : null;
    },
  },
];
