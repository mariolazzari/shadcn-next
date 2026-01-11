"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export const signupSchema = z
  .object({
    email: z.email(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    employees: z.coerce.number<number>().optional(),
    dob: z.date().refine(date => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date < eighteenYearsAgo;
    }, "You must be at least 18 years old"),
  })
  .superRefine((data, ctx) => {
    const { accountType, companyName, employees } = data;

    if (accountType === "company" && !companyName) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (accountType === "company" && (!employees || employees < 1)) {
      ctx.addIssue({
        code: "custom",
        path: ["employees"],
        message: "Employess must be greateer than 1",
      });
    }
  });

export type Signup = z.infer<typeof signupSchema>;

function SignupPage() {
  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      accountType: "personal",
      companyName: "",
      employees: 0,
    },
  });

  const onSubmit: SubmitHandler<Signup> = data => {
    console.log("Signup data", data);
  };

  const accountType = useWatch({
    control: form.control,
    name: "accountType",
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <PersonStandingIcon className="mx-auto" size={50} />

        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for new SupportMe account</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an account type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => {
                const dob = new Date();
                dob.setFullYear(dob.getFullYear() - 120);

                return (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Date of Born</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal pr-1"
                          >
                            Select date
                            <CalendarIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto overflow-hidden p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            defaultMonth={field.value}
                            selected={field.value}
                            onSelect={field.onChange}
                            fixedWeeks
                            weekStartsOn={1}
                            startMonth={dob}
                            captionLayout="dropdown"
                            disabled={[
                              {
                                after: new Date(),
                                before: dob,
                              },
                            ]}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {accountType === "company" && (
              <>
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employees"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employees</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Employees"
                          min={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <small>Already have an account? </small>
        <Button asChild variant="outline" size="sm">
          <Link href="/login">Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SignupPage;
