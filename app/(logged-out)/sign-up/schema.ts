import { z } from "zod";

const accountTypeSchema = z
  .object({
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number<number>().optional(),
  })
  .superRefine((data, ctx) => {
    const { accountType, companyName, numberOfEmployees } = data;

    if (accountType === "company" && !companyName) {
      ctx.addIssue({
        code: "custom",
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      accountType === "company" &&
      (!numberOfEmployees || numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["numberOfEmployees"],
        message: "Number of employees is required",
      });
    }
  });

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .refine(password => {
        // must contain at least 1 special character and 1 uppercase character
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    const { password, passwordConfirm } = data;

    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
  });

const baseSchema = z.object({
  email: z.email(),
  dob: z.date().refine(date => {
    const today = new Date();
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    return date <= eighteenYearsAgo;
  }, "You must be at least 18 years old"),
  acceptTerms: z.boolean({ error: "You must accept terms & conditions" }),
});

export const signupFormSchema = baseSchema
  .and(passwordSchema)
  .and(accountTypeSchema);

export type SignupForm = z.infer<typeof signupFormSchema>;
