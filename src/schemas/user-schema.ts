import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username must be 30 characters or less"),

  avatarUrl: z.url("Please enter a valid URL").or(z.literal("")),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
