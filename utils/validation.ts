import * as z from "zod";

export const emailSchema = z
  .string({
    required_error: "Please enter your email address.",
    invalid_type_error: "Email must be text (e.g. example@mail.com).",
  })
  .email("The email you entered is not valid. Please try again.");
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters.")
  .max(100, "Name cannot exceed 100 characters.");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password cannot exceed 100 characters.");
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters.")
    .max(100, "Category name cannot exceed 100 characters."),
});
