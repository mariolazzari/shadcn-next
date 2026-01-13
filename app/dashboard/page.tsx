import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

function DashboardPage() {
  return (
    <Tabs defaultValue="employees">
      <TabsList>
        <TabsTrigger value="employees">Employees Stats</TabsTrigger>
        <TabsTrigger value="team">Team Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">emplyees stas</TabsContent>
      <TabsContent value="team">team stats</TabsContent>
    </Tabs>
  );
}

export default DashboardPage;
