import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
export const signupSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(100),
    email: z.string().email().min(2).max(100),
    password: z.string().min(2).max(100),
  }),
);
export const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
);
