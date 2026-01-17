import { Separator } from "@radix-ui/react-select";
import { MenuTitle } from "./menu-title";
import { MenuItem } from "./menu-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { LightDarkToogle } from "@/components/light-dark-toggle";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function MainMenu({ className }: Props) {
  return (
    <nav
      className={cn("md:bg-muted overflow-auto p-4 flex flex-col", className)}
    >
      <header className="hidden md:block">
        <MenuTitle />
      </header>
      <Separator className="my-4 dark:bg-black bg-zinc-300" />

      <div className="py-4 grow">
        <MenuItem href="/dashboard">My Dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </div>

      <footer className="flex items-center justify-between">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            ML
          </AvatarFallback>
        </Avatar>
        <Link className="hover:underline" href="/">
          Logout
        </Link>
        <LightDarkToogle className="ml-auto" />
      </footer>
    </nav>
  );
}
