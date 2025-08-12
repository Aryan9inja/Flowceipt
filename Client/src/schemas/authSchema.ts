import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Max name size is 30 charachters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be atleast 8 characters ling"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
