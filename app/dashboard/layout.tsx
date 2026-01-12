import { Layout } from "@/types/Layout";
import { MainMenu } from "./components/main-menu";

function DashboardLayout({ children }: Layout) {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen">
      <div className="bg-muted overflow-auto">
        <MainMenu />
      </div>
      <div className="overflow-auto p-4">
        <h1 className="pb-4">Welcome back, Mario!</h1>
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
