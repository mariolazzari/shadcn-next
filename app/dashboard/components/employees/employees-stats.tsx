import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  AlertTriangleIcon,
  BadgeCheckIcon,
  LaptopIcon,
  PartyPopperIcon,
  UserCheck2Icon,
  UserIcon,
  UserRoundXIcon,
} from "lucide-react";
import Link from "next/link";
import { WorkLocationTrends } from "./work-location-trends";

export function EmployeesStats() {
  const totalEmployees = 100;
  const employeesPresent = 80;
  const percentage = (employeesPresent / totalEmployees) * 100;

  return (
    <>
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

        <Card className="border-pink-500 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Employee of the month</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className="rounded-full"
                src="/cm.jpg"
                alt="Employee of the month2"
              />
              <AvatarFallback>CM</AvatarFallback>
            </Avatar>
            <span className="text-2xl">Colin Nurray</span>
          </CardContent>
          <CardFooter className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
            <PartyPopperIcon className="text-pink-500" />
            <span>Congratulations Colin!</span>
          </CardFooter>
        </Card>
      </div>

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LaptopIcon /> <span>Employee work location trends</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pl-0">
          <WorkLocationTrends />
        </CardContent>
      </Card>
    </>
  );
}
