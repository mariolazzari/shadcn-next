import { Separator } from "@radix-ui/react-select";
import { MenuTitle } from "./menu-title";

export function MainMenu() {
  return (
    <div className="overflow-auto p-4">
      <MenuTitle />
      <Separator className="my-4 dark:bg-black bg-zinc-300" />
      Main Menu
    </div>
  );
}
