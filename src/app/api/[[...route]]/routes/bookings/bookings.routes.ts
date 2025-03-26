import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { UserRole } from "@/types";
import { authMiddleware } from "../../middlewares/auth";
import StringIdParamsSchema from "../../lib/id-params-schema";
import {
  insertScheduleSchema,
  insertSessionSchema,
  selectScheduleSchema,
  selectSessionSchema,
  updateScheduleSchema,
  updateSessionSchema,
} from "./bookings.schemas";
import { forbiddenSchema, notFoundSchema } from "../../lib/constants";

const tags = ["Bookings"];

export const listSchedules = createRoute({
  path: "/schedules",
  method: "get",
  tags,
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectScheduleSchema) }),
      "The list of booking schedules",
    ),
  },
});

export const listSessions = createRoute({
  path: "/sessions",
  method: "get",
  tags,
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectSessionSchema) }),
      "The list of booking sessions",
    ),
  },
});

export const listSchedulesByPsychologist = createRoute({
  path: "/schedules/psychologist/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectScheduleSchema) }),
      "The list of schedules by psychologist",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const listSessionsByPsychologist = createRoute({
  path: "/sessions/psychologist",
  method: "get",
  tags,
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectSessionSchema) }),
      "The list of session by psychologist",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Session by pschologist not found",
    ),
  },
});

export const getOneSchedule = createRoute({
  path: "/schedules/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectScheduleSchema }),
      "The requested booking schedule",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Booking schedule not found",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const getOneSession = createRoute({
  path: "/sessions/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectSessionSchema }),
      "The requested booking session",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const createSchedule = createRoute({
  path: "/schedules",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      insertScheduleSchema,
      "The booking schedule to create",
    ),
  },
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: selectScheduleSchema }),
      "The created booking schedule",
    ),
  },
});

export const createSession = createRoute({
  path: "/sessions",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      insertSessionSchema,
      "The booking session to create",
    ),
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: selectSessionSchema }),
      "The created booking session",
    ),
  },
});

export const patchSchedule = createRoute({
  path: "/schedules/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      updateScheduleSchema,
      "The booking schedule to create",
    ),
  },
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectScheduleSchema }),
      "The updated booking schedule",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Booking schedule not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(updateScheduleSchema).or(
        createErrorSchema(IdParamsSchema),
      ),
      "The validation error(s)",
    ),
  },
});

export const patchSession = createRoute({
  path: "/sessions/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      updateSessionSchema,
      "The booking session to update",
    ),
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectSessionSchema }),
      "The updated booking session",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Booking session not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const removeSchedule = createRoute({
  path: "/schedules/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Booking schedule deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Booking schedule not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const removeSession = createRoute({
  path: "/sessions/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Booking session deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Booking schedule not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListSchedulesRoute = typeof listSchedules;
export type ListSessionsRoute = typeof listSessions;
export type ListSchedulesByPsychologistRoute =
  typeof listSchedulesByPsychologist;
export type ListSessionsByPsychologistRoute = typeof listSessionsByPsychologist;
export type GetOneScheduleRoute = typeof getOneSchedule;
export type GetOneSessionRoute = typeof getOneSession;
export type CreateScheduleRoute = typeof createSchedule;
export type CreateSessionRoute = typeof createSession;
export type PatchScheduleRoute = typeof patchSchedule;
export type PatchSessionRoute = typeof patchSession;
export type RemoveScheduleRoute = typeof removeSchedule;
export type RemoveSessionRoute = typeof removeSession;
