import { z } from "zod";

export const addBookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.url("Enter a valid url"),
  description: z.string().optional(),
  tags: z.array(z.string()),
});

export type AddBookmarkFormValues = z.infer<typeof addBookmarkSchema>;