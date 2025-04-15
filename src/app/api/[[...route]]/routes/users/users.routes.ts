import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { UserRole } from "@/types";
import { authMiddleware } from "../../middlewares/auth";
import {
  badRequestSchema,
  forbiddenSchema,
  notFoundSchema,
} from "../../lib/constants";
import StringIdParamsSchema from "../../lib/id-params-schema";
import {
  insertUserSchema,
  selectPsyhologySchema,
  selectUserSchema,
  updateUserSchema,
} from "./users.schemas";
import { selectPsychologistTopicSchema } from "../topics/topics.schemas";

const tags = ["Users"];

export const list = createRoute({
  path: "/users",
  method: "get",
  tags,
  middleware: authMiddleware(UserRole.ADMIN),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectUserSchema) }),
      "The list of users",
    ),
  },
});

export const listPsychologists = createRoute({
  path: "/users/psychologists",
  method: "get",
  tags,
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({
        data: z.array(
          selectUserSchema.extend({
            psychologyTopic: z.array(selectPsychologistTopicSchema),
          }),
        ),
      }),
      "The list of psychologists",
    ),
  },
});

export const getOne = createRoute({
  path: "/users/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectUserSchema }),
      "The requested user",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const getOnePsychologist = createRoute({
  path: "/users/psychologists/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectPsyhologySchema }),
      "The requested psychologist",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Psychologist not found",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const create = createRoute({
  path: "/users",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUserSchema, "The user to create"),
  },
  middleware: authMiddleware(UserRole.ADMIN),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: selectUserSchema }),
      "The created user",
    ),
    [HTTPStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "The request is bad",
    ),
  },
});

export const patch = createRoute({
  path: "/users/{id}",
  method: "patch",
  tags,
  request: {
    params: StringIdParamsSchema,
    body: {
      content: {
        "multipart/form-data": {
          schema: updateUserSchema,
        },
      },
      required: true,
    },
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectUserSchema }),
      "The updated user",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const remove = createRoute({
  path: "/users/{id}",
  method: "delete",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "User deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type ListRoutePsychologists = typeof listPsychologists;
export type GetOne = typeof getOne;
export type GetOnePsychologist = typeof getOnePsychologist;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
