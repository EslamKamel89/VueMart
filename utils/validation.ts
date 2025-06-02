import * as z from "zod";

export const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be string",
  })
  .email("The email you entered is not a valid email");
export const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  password: z.string().min(2).max(100),
});
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(2).max(50),
});

export const categorySchema = z.object({ name: z.string().min(2).max(100) });
