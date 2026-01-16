import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { EmployeesStats } from "./components/employees/employees-stats";
import { TeamStats } from "./components/team-stats";

function DashboardPage() {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employees Stats</TabsTrigger>
        <TabsTrigger value="team">Team Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeesStats />
      </TabsContent>
      <TabsContent value="team">
        <TeamStats />
      </TabsContent>
    </Tabs>
  );
}

export default DashboardPage;
