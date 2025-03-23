import { z } from "zod";

export const selectTopicSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const selectPsychologistTopicSchema = z.object({
  userId: z.string(),
  topicId: z.number(),
  topic: selectTopicSchema,
});

export const insertTopicSchema = z.object({
  name: z.string().trim().min(1, "Name required"),
});

export const insertPsychologistTopicSchema = z.object({
  topics: z.number().or(z.array(z.object({ topicId: z.number() }))),
});

export const removePsychologistTopicSchema = z.object({
  topics: z.number().or(z.array(z.number())),
});
