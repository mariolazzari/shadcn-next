import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from "lucide-react";
import Link from "next/link";

export function EmployeesStats() {
  const totalEmployees = 100;
  const employeesPresent = 70;
  const percentage = (employeesPresent / totalEmployees) * 100;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Total Employees</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2">
            <UserIcon />
            <span className="text-5xl font-bold">{totalEmployees}</span>
          </div>
          <div>
            <Button size="xs" asChild>
              <Link href="/dashboard/employees">View All</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Employees Present</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex gap-2">
            {percentage > 75 ? <UserCheck2Icon /> : <UserRoundXIcon />}
            <span className="text-5xl font-bold">{employeesPresent}</span>
          </div>
          <div>
            <Button size="xs" asChild>
              <Link href="/dashboard/employees">View All</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          {percentage > 75 ? (
            <span className="text-xs text-green-500 flex items-center gap-2">
              <BadgeCheckIcon />
              {percentage} of employees are present
            </span>
          ) : (
            <span className="text-xs text-red-500 flex items-center gap-2">
              <AlertTriangleIcon />
              Only {percentage} of employees are present
            </span>
          )}
        </CardFooter>
      </Card>

      <Card className="border-pink-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Employee of the month</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
