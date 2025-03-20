import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { createReviewSchema, updateReviewSchema } from "./review.type";

const reviews = new Hono()
  .get("/psychology/:id", async (c) => {
    const { id } = c.req.param();

    const reviews = await db.review.findMany({
      where: {
        psychologyId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
    const reviewRate = await db.review.aggregate({
      where: {
        psychologyId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      _avg: {
        rate: true,
      },
    });

    // const reviews = await db.user.findMany({
    //   where: {
    //     role: UserRole.PSYCHOLOGY,
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //     email: true,
    //     description: true,
    //     birthDate: true,
    //     gender: true,
    //     image: true,
    //     createdAt: true,
    //     phoneNumber: true,
    //     status: true,
    //     reviewPsychologyId: {
    //       include: {
    //         user: {
    //           select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             image: true,
    //             gender: true,
    //             createdAt: true,
    //             status: true,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });

    return c.json({
      data: {
        reviews,
        rate: reviewRate,
      },
    });
  })
  .get("/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const review = await db.review.findUnique({
      where: {
        id,
      },
      include: {
        psychology: true,
        user: true,
      },
    });
    if (!review) throw new HTTPException(404, { message: "Review not found" });

    return c.json({ data: review });
  })
  .post(
    "/",
    authMiddleware(),
    zValidator("json", createReviewSchema),
    async (c) => {
      const { psychologyId, rate, reviewText } = c.req.valid("json");
      const user = c.get("user")!;

      await db.review.create({
        data: {
          userId: user.id,
          psychologyId,
          rate,
          reviewText,
        },
      });

      return c.json({ message: "Successfully to create" });
    },
  )
  .patch(
    "/:id",
    authMiddleware(),
    zValidator("json", updateReviewSchema),
    async (c) => {
      const id = Number(c.req.param().id);
      if (isNaN(id))
        throw new HTTPException(400, { message: "Param id must be a number" });

      const data = c.req.valid("json");
      const user = c.get("user")!;

      const review = await db.review.findUnique({
        where: { id },
      });
      if (!review)
        throw new HTTPException(404, { message: "Review not found" });

      if (review.userId !== user.id)
        throw new HTTPException(403, { message: "Forbidden" });

      await db.review.update({
        where: {
          id,
        },
        data,
      });

      return c.json({ message: "Successfully to update review" });
    },
  )
  .delete("/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const user = c.get("user")!;

    const review = await db.review.findUnique({
      where: {
        id,
      },
    });
    if (!review) throw new HTTPException(404, { message: "Review not found" });

    if (review.userId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    await db.review.delete({
      where: {
        id,
      },
    });

    return c.json({ message: "Successfully to delete review" });
  });

export default reviews;
