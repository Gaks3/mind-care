import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { zValidator } from "@hono/zod-validator";
import {
  createChatMessage,
  createChatThread,
  updateChatThread,
} from "./chat.type";
import db from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { streamText } from "hono/streaming";
import ollama from "ollama";

const chats = new Hono()
  .get("/thread/:id", authMiddleware(), async (c) => {
    const id = c.req.param("id");
    const user = c.get("user")!;

    const chatThread = await db.chatThread.findUnique({
      where: {
        id,
      },
      include: {
        chatMessage: true,
      },
    });
    if (!chatThread)
      throw new HTTPException(404, { message: "Chat thread not found" });
    if (user.id !== chatThread?.userId)
      throw new HTTPException(403, { message: "Forbidden" });

    return c.json({
      data: chatThread,
    });
  })
  .get("/message/:id", authMiddleware(), async (c) => {
    const id = c.req.param("id");
    const user = c.get("user")!;

    const chatMessage = await db.chatMessage.findUnique({
      where: {
        id,
      },
      include: { chatThread: true },
    });
    if (!chatMessage)
      throw new HTTPException(404, { message: "Chat message not found" });
    if (chatMessage.chatThread.userId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    return c.json({ data: chatMessage });
  })
  .post(
    "/thread",
    authMiddleware(),
    zValidator("json", createChatThread),
    async (c) => {
      const { title } = c.req.valid("json");
      const user = c.get("user")!;

      await db.chatThread.create({
        data: {
          title,
          userId: user.id,
        },
      });

      return c.json({ message: "Successfully to create chat thread" });
    },
  )
  .post(
    "/message",
    authMiddleware(),
    zValidator("json", createChatMessage),
    async (c) => {
      const { threadId, content } = c.req.valid("json");

      const chatThread = await db.chatThread.findUnique({
        where: { id: threadId },
      });
      if (!chatThread)
        throw new HTTPException(404, { message: "Chat thread not found" });

      await db.chatMessage.create({
        data: {
          content,
          role: "USER",
          threadId,
        },
      });

      const aiChatMessage = await db.chatMessage.create({
        data: {
          content: "",
          role: "ASSISTANT",
          threadId,
        },
      });

      return streamText(c, async (stream) => {
        let fullResponse = "";

        try {
          const generateStream = await ollama.generate({
            model: "deepseek-r1:7b",
            prompt: content,
            stream: true,
          });

          for await (const chunk of generateStream) {
            if (chunk.response) {
              await stream.write(chunk.response);

              fullResponse += chunk.response;
            }
          }

          await db.chatMessage.update({
            where: { id: aiChatMessage.id },
            data: { content: fullResponse },
          });

          await stream.write(`\n\n[DONE] Message ID: ${aiChatMessage.id}`);
        } catch (error) {
          console.error("Streaming error:", error);
          if (error instanceof Error) {
            await stream.write(`\n\n[ERROR] ${error.message}`);
          }
        }
      });
    },
  )
  .patch(
    "/thread/:id",
    authMiddleware(),
    zValidator("json", updateChatThread),
    async (c) => {
      const id = c.req.param("id");
      const user = c.get("user")!;
      const data = c.req.valid("json");

      const chatThread = await db.chatThread.findUnique({
        where: {
          id,
        },
      });
      if (!chatThread)
        throw new HTTPException(404, { message: "Chat thread not found" });
      if (chatThread.userId !== user.id)
        throw new HTTPException(403, { message: "Forbidden" });

      await db.chatThread.update({
        where: {
          id,
        },
        data,
      });
    },
  )
  .delete("/thread/:id", authMiddleware(), async (c) => {
    const id = c.req.param("id");
    const user = c.get("user")!;

    const chatThread = await db.chatThread.findUnique({
      where: {
        id,
      },
    });
    if (!chatThread)
      throw new HTTPException(404, { message: "Chat thread not found" });
    if (chatThread.userId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    await db.chatThread.delete({ where: { id } });

    return c.json({ message: "Successfully to delete chat thread" });
  })
  .delete("/message/:id", authMiddleware(), async (c) => {
    const id = c.req.param("id");
    const user = c.get("user")!;

    const chatMessage = await db.chatMessage.findUnique({
      where: {
        id,
      },
      include: {
        chatThread: true,
      },
    });
    if (!chatMessage)
      throw new HTTPException(404, { message: "Chat thread not found" });
    if (chatMessage.chatThread.userId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    await db.chatMessage.delete({ where: { id } });

    return c.json({ message: "Successfully to delete chat thread" });
  });

export default chats;
