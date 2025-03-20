import { z } from "zod";

export const createReviewSchema = z.object({
  psychologyId: z.string(),
  rate: z.number().max(5),
  reviewText: z.string().trim().min(1, "Review text required"),
});

export const updateReviewSchema = z.object({
  rate: z.number().min(1).max(5),
  reviewText: z.string().trim().min(1, "Review text required"),
});
