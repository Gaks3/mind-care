import { z } from "zod";

import { selectUserSchema } from "../users/users.schemas";

export const selectReviewSchema = z.object({
  id: z.number(),
  userId: z.string(),
  psychologistId: z.string(),
  rate: z.number(),
  reviewText: z.string(),
  createdAt: z.string().datetime(),
});

export const selectReviewByPsychologistSchema = z.object({
  reviews: z.array(
    z.object({ ...selectReviewSchema.shape, user: selectUserSchema }),
  ),
  rate: z.number().nullable(),
});

export const selectReviewByIdSchema = selectReviewSchema.and(
  z.object({
    user: selectUserSchema,
    psychologist: selectUserSchema,
  }),
);

export const insertReviewSchema = z.object({
  psychologistId: z.string(),
  rate: z.number().max(5),
  reviewText: z.string().trim().min(1, "Review text required"),
});

export const updateReviewSchema = z.object({
  rate: z.number().max(5).optional(),
  reviewText: z.string().trim().min(1, "Review text required").optional(),
});
