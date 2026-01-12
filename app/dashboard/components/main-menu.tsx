import { Separator } from "@radix-ui/react-select";
import { MenuTitle } from "./menu-title";
import { MenuItem } from "./menu-item";

export function MainMenu() {
  return (
    <div className="overflow-auto p-4">
      <MenuTitle />
      <Separator className="my-4 dark:bg-black bg-zinc-300" />

      <div className="py-4">
        <MenuItem href="/dashboard">My Dashboard</MenuItem>
        <MenuItem href="/dashboard/teams">Teams</MenuItem>
        <MenuItem href="/dashboard/employees">Employees</MenuItem>
        <MenuItem href="/dashboard/account">Account</MenuItem>
        <MenuItem href="/dashboard/settings">Settings</MenuItem>
      </div>
    </div>
  );
}
