import { z } from "zod";

export const createTopicSchema = z.object({
  name: z.string().trim().min(1),
});

export const updateTopicSchema = z.object({
  name: createTopicSchema.shape.name,
});

export const createUserTopicSchema = z.object({
  topics: z.number().or(z.array(z.object({ topicId: z.number() }))),
});

export const deleteUserTopicSchema = z.object({
  topics: z.number().or(z.array(z.number())),
});
