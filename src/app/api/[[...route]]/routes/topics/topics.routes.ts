import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { UserRole } from "@/types";
import { authMiddleware } from "../../middlewares/auth";
import {
  badRequestSchema,
  forbiddenSchema,
  notFoundSchema,
} from "../../lib/constants";
import StringIdParamsSchema from "../../lib/id-params-schema";
import {
  insertPsychologistTopicSchema,
  insertTopicSchema,
  removePsychologistTopicSchema,
  selectPsychologistTopicSchema,
  selectTopicSchema,
} from "./topics.schemas";

const tags = ["Topics"];

export const list = createRoute({
  path: "/topics",
  method: "get",
  tags,
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectTopicSchema) }),
      "The list of topics",
    ),
  },
});

export const listPsychologistTopics = createRoute({
  path: "/topics/psychologists/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectPsychologistTopicSchema) }),
      "The requested topic by psyhologist id",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const getOne = createRoute({
  path: "/topics/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectTopicSchema }),
      "The requested topic",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Topic not found"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const create = createRoute({
  path: "/topics",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertTopicSchema, "The topic to create"),
  },
  middleware: authMiddleware(UserRole.ADMIN),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectTopicSchema }),
      "The created topic",
    ),
  },
});

export const createPsychologistTopics = createRoute({
  path: "/topics/psychologists",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(
      z.object({
        topics: insertPsychologistTopicSchema,
      }),
      "The psychologist topic to create",
    ),
  },
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: insertPsychologistTopicSchema.shape.topics }),
      "The psychologist topic created",
    ),
    [HTTPStatusCodes.BAD_REQUEST]: jsonContent(
      badRequestSchema,
      "The request is bad",
    ),
  },
});

export const patch = createRoute({
  path: "/topics/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContent(insertTopicSchema, "The topic to update"),
  },
  middleware: authMiddleware(UserRole.ADMIN),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectTopicSchema }),
      "The updated topic",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Topic not found"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const remove = createRoute({
  path: "/topics/{id}",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(UserRole.ADMIN),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Topic deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Topic not found"),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const removePsychologistTopic = createRoute({
  path: "/topics/psyhologists",
  method: "delete",
  tags,
  request: {
    body: jsonContent(
      removePsychologistTopicSchema,
      "The psychologist topic(s) to delete",
    ),
  },
  middleware: authMiddleware(UserRole.PSYCHOLOGY),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Psychology topic deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Psychology topic not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export type ListRoute = typeof list;
export type ListPsychologistTopicsRoute = typeof listPsychologistTopics;
export type GetOneRoute = typeof getOne;
export type CreateRoute = typeof create;
export type CreatePsychologistsTopicsRoute = typeof createPsychologistTopics;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
export type RemovePsychologistTopicRoute = typeof removePsychologistTopic;
