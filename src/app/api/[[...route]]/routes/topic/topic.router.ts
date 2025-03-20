import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
import { UserRole } from "@/types";
import { zValidator } from "@hono/zod-validator";
import {
  createTopicSchema,
  createUserTopicSchema,
  deleteUserTopicSchema,
  updateTopicSchema,
} from "./topic.type";
import { HTTPException } from "hono/http-exception";

export const topics = new Hono()
  .get("/", authMiddleware(), async (c) => {
    const data = await db.topic.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return c.json({ data });
  })
  .get("/psychology/:id", authMiddleware(), async (c) => {
    const { id } = c.req.param();

    const data = await db.psychologyTopic.findMany({
      where: {
        userId: id,
      },
    });

    return c.json({ data });
  })
  .get("/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const data = await db.topic.findUnique({
      where: {
        id,
      },
    });

    return c.json({ data });
  })
  .post(
    "/psychology",
    authMiddleware(UserRole.PSYCHOLOGY),
    zValidator("json", createUserTopicSchema),
    async (c) => {
      const user = c.get("user")!;
      const { topics } = c.req.valid("json");

      if (Array.isArray(topics)) {
        const data = topics.map(({ topicId }) => ({
          userId: user.id,
          topicId,
        }));

        await db.psychologyTopic.createMany({
          data,
          skipDuplicates: true,
        });
      } else if (typeof topics === "number") {
        await db.psychologyTopic.upsert({
          where: {
            userId_topicId: {
              topicId: topics as number,
              userId: user.id,
            },
          },
          update: {
            topicId: topics as number,
          },
          create: {
            topicId: topics as number,
            userId: user.id,
          },
        });
      }

      return c.json({ message: "Successfully to create user topic" });
    },
  )
  .post(
    "/:id",
    authMiddleware(UserRole.ADMIN),
    zValidator("json", createTopicSchema),
    async (c) => {
      const id = Number(c.req.param().id);
      if (isNaN(id))
        throw new HTTPException(400, { message: "Param id must be a number" });

      const data = c.req.valid("json");

      await db.topic.create({
        data,
      });

      return c.json({ message: "Successfully to create topic" });
    },
  )
  .patch(
    "/:id",
    authMiddleware(UserRole.ADMIN),
    zValidator("json", updateTopicSchema),
    async (c) => {
      const id = Number(c.req.param().id);
      if (isNaN(id))
        throw new HTTPException(400, { message: "Param id must be a number" });

      const data = c.req.valid("json");

      const topic = await db.topic.findUnique({
        where: { id },
      });
      if (!topic) throw new HTTPException(404, { message: "Topic not found" });

      await db.topic.update({
        where: {
          id,
        },
        data,
      });

      return c.json({ message: "Successfully to update topic" });
    },
  )
  .delete(
    "/psychology",
    authMiddleware(UserRole.PSYCHOLOGY),
    zValidator("json", deleteUserTopicSchema),
    async (c) => {
      const user = c.get("user")!;
      const { topics } = c.req.valid("json");

      if (Array.isArray(topics)) {
        await db.psychologyTopic.deleteMany({
          where: {
            topicId: {
              in: topics,
            },
          },
        });
      } else if (typeof topics === "number") {
        const userTopic = await db.psychologyTopic.findUnique({
          where: {
            userId_topicId: {
              userId: user.id,
              topicId: topics,
            },
          },
        });
        if (!userTopic)
          throw new HTTPException(404, {
            message: "Psychology topic not found",
          });

        await db.psychologyTopic.delete({
          where: {
            userId_topicId: {
              userId: user.id,
              topicId: topics,
            },
          },
        });
      }

      return c.json({ message: "Successfully to delete psychology topic" });
    },
  )
  .delete("/:id", authMiddleware(UserRole.ADMIN), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const topic = await db.topic.findUnique({
      where: {
        id,
      },
    });
    if (!topic) throw new HTTPException(404, { message: "Topic not found" });

    await db.topic.delete({
      where: {
        id,
      },
    });
  });
