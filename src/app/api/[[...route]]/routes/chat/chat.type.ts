import { z } from "zod";

export const createChatThread = z.object({
  title: z.string().trim().min(1, { message: "Title required" }),
});

export const updateChatThread = z.object({
  title: createChatThread.shape.title,
});

export const createChatMessage = z.object({
  content: z.string().trim().min(1, { message: "Content required" }),
  threadId: z.string().trim().min(1, { message: "Thread Id required" }),
});
