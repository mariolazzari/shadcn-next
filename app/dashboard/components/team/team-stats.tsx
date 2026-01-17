import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ListCheckIcon, PartyPopperIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export function TeamStats() {
  return (
    <>
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total teams</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex gap-2">
              <UsersIcon />
              <span className="text-5xl font-bold">8</span>
            </div>
            <div>
              <Button size="xs" asChild>
                <Link href="/dashboard/teams">View All</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Team leaders</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between items-center"></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Team Distribution</CardTitle>
          </CardHeader>
          <CardFooter className="flex items-center gap-2 text-sm text-muted-foreground mt-auto">
            <PartyPopperIcon className="text-pink-500" />
            <span>Congratulations Colin!</span>
          </CardFooter>
        </Card>
      </div>

      <Card className="my-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ListCheckIcon /> <span>Support tickets resolved</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="pl-0">line graph</CardContent>
      </Card>
    </>
  );
}
