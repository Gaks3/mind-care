import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import { UserRole } from "@/types";
import db from "@/lib/db";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import {
  createScheduleSchema,
  createSessionSchema,
  updateScheduleSchema,
  updateSessionSchema,
} from "./booking.type";

const bookings = new Hono()
  .get("/schedules", authMiddleware(), async (c) => {
    const bookings = await db.bookingSchedule.findMany();

    return c.json({ data: bookings });
  })
  .get("/schedules/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const booking = await db.bookingSchedule.findUnique({
      where: {
        id,
      },
    });

    return c.json({ data: booking });
  })
  .get("/schedules/psychology/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const bookings = await db.bookingSchedule.findMany({
      where: {
        id: Number(id),
      },
    });

    return c.json({
      data: bookings,
    });
  })
  .get("/sessions", authMiddleware(), async (c) => {
    const user = c.get("user")!;

    const sessions = await db.bookingSession.findMany({
      where: {
        userId: user.id,
      },
    });

    return c.json({ data: sessions });
  })
  .get("/sessions/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const user = c.get("user")!;

    const session = await db.bookingSession.findUnique({
      where: { id, userId: user.id },
    });

    return c.json({ data: session });
  })
  .post(
    "/schedules",
    authMiddleware(UserRole.PSYCHOLOGY),
    zValidator("json", createScheduleSchema),
    async (c) => {
      const user = c.get("user")!;
      const data = c.req.valid("json");

      await db.bookingSchedule.create({
        data: {
          ...data,
          psychologistId: user.id,
        },
      });

      return c.json(
        { message: "Successfully to create booking schedule" },
        201,
      );
    },
  )
  .post(
    "/sessions",
    authMiddleware(),
    zValidator("json", createSessionSchema),
    async (c) => {
      const data = c.req.valid("json");
      const user = c.get("user")!;

      await db.bookingSession.create({
        data: {
          bookingId: data.bookingId,
          userId: user.id,
        },
        include: {
          bookingSchedule: {
            include: {
              psychologist: true,
            },
          },
        },
      });

      return c.json({ message: "Successfully to create booking session" }, 201);
    },
  )
  .patch(
    "/schedules/:id",
    authMiddleware(UserRole.PSYCHOLOGY),
    zValidator("json", updateScheduleSchema),
    async (c) => {
      const id = Number(c.req.param().id);
      if (isNaN(id))
        throw new HTTPException(400, { message: "Param id must be a number" });

      const data = c.req.valid("json");
      const user = c.get("user")!;

      const schedule = await db.bookingSchedule.findUnique({
        where: { id },
      });
      if (!schedule)
        throw new HTTPException(404, { message: "Booking schedule not found" });

      if (schedule.psychologistId !== user.id)
        throw new HTTPException(403, { message: "Forbidden" });

      await db.bookingSchedule.update({
        where: {
          id,
        },
        data,
      });

      return c.json({ message: "Successfully to update booking schedule" });
    },
  )
  .patch(
    "/sessions/:id",
    authMiddleware(),
    zValidator("json", updateSessionSchema),
    async (c) => {
      const id = Number(c.req.param().id);
      if (isNaN(id))
        throw new HTTPException(400, { message: "Param id must be a number" });

      const data = c.req.valid("json");
      const user = c.get("user")!;

      const session = await db.bookingSession.findUnique({
        where: {
          id,
        },
      });
      if (!session)
        throw new HTTPException(404, { message: "Booking session not found" });

      if (session.userId !== user.id)
        throw new HTTPException(403, { message: "Forbidden" });

      await db.bookingSession.update({
        where: {
          id,
        },
        data,
      });

      return c.json({ message: "Successfully to update booking session" });
    },
  )
  .delete("/schedules/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const user = c.get("user")!;

    const schedule = await db.bookingSchedule.findUnique({
      where: {
        id,
      },
    });
    if (!schedule)
      throw new HTTPException(404, { message: "Booking schedule not found" });

    if (schedule.psychologistId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    await db.bookingSchedule.delete({
      where: {
        id,
      },
    });

    return c.json({ message: "Successfully to delete booking schedule" });
  })
  .delete("/sessions/:id", authMiddleware(), async (c) => {
    const id = Number(c.req.param().id);
    if (isNaN(id))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const user = c.get("user")!;

    const schedule = await db.bookingSession.findUnique({
      where: {
        id,
      },
    });
    if (!schedule)
      throw new HTTPException(404, { message: "Booking session not found" });

    if (schedule.userId !== user.id)
      throw new HTTPException(403, { message: "Forbidden" });

    await db.bookingSession.delete({
      where: {
        id,
      },
    });

    return c.json({ message: "Successfully to delete booking session" });
  });

export default bookings;
