import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";

import db from "@/lib/db";
import { AppRouteHandler } from "../../lib/types";
import {
  CreateScheduleRoute,
  CreateSessionRoute,
  GetOneScheduleRoute,
  GetOneSessionRoute,
  ListSchedulesByPsychologistRoute,
  ListSchedulesRoute,
  ListSessionsRoute,
  PatchScheduleRoute,
  PatchSessionRoute,
  RemoveScheduleRoute,
  RemoveSessionRoute,
} from "./bookings.routes";

export const listSchedules: AppRouteHandler<ListSchedulesRoute> = async (c) => {
  const data = await db.bookingSchedule.findMany();

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const listSessions: AppRouteHandler<ListSessionsRoute> = async (c) => {
  const user = c.get("user")!;

  const data = await db.bookingSession.findMany({
    where: {
      userId: user.id,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const listSchedulesByPsychologist: AppRouteHandler<
  ListSchedulesByPsychologistRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const data = await db.bookingSchedule.findMany({
    where: {
      psychologistId: id,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOneSchedule: AppRouteHandler<GetOneScheduleRoute> = async (
  c,
) => {
  const { id } = c.req.valid("param");

  const data = await db.bookingSchedule.findUnique({
    where: {
      id,
    },
  });

  if (!data)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOneSession: AppRouteHandler<GetOneSessionRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const data = await db.bookingSession.findUnique({
    where: {
      id,
    },
  });

  if (!data)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const createSchedule: AppRouteHandler<CreateScheduleRoute> = async (
  c,
) => {
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const schedule = await db.bookingSchedule.create({
    data: {
      ...data,
      psychologistId: user.id,
    },
  });

  return c.json({ data: schedule }, HTTPStatusCodes.CREATED);
};

export const createSession: AppRouteHandler<CreateSessionRoute> = async (c) => {
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const session = await db.bookingSession.create({
    data: {
      bookingId: data.bookingId,
      userId: user.id,
    },
  });

  return c.json({ data: session }, HTTPStatusCodes.CREATED);
};

export const patchSchedule: AppRouteHandler<PatchScheduleRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const schedule = await db.bookingSchedule.findUnique({
    where: { id },
  });

  if (!schedule)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (schedule.psychologistId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  const updatedSchedule = await db.bookingSchedule.update({
    where: { id },
    data,
  });

  return c.json({ data: updatedSchedule }, HTTPStatusCodes.OK);
};

export const patchSession: AppRouteHandler<PatchSessionRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const session = await db.bookingSession.findUnique({
    where: {
      id,
    },
  });

  if (!session)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (session.userId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  const updatedSession = await db.bookingSession.update({
    where: {
      id,
    },
    data,
  });

  return c.json({ data: updatedSession }, HTTPStatusCodes.OK);
};

export const removeSchedule: AppRouteHandler<RemoveScheduleRoute> = async (
  c,
) => {
  const { id } = c.req.valid("param");
  const user = c.get("user")!;

  const schedule = await db.bookingSchedule.findUnique({
    where: {
      id,
    },
  });

  if (!schedule)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (schedule.psychologistId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  await db.bookingSchedule.delete({
    where: { id },
  });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};

export const removeSession: AppRouteHandler<RemoveSessionRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = c.get("user")!;

  const session = await db.bookingSession.findUnique({
    where: {
      id,
    },
  });

  if (!session)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (session.userId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  await db.bookingSession.delete({
    where: { id },
  });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
