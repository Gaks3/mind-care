import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { authMiddleware } from "../../middlewares/auth";
import { forbiddenSchema, notFoundSchema } from "../../lib/constants";
import StringIdParamsSchema from "../../lib/id-params-schema";
import {
  insertReviewSchema,
  selectReviewByIdSchema,
  selectReviewByPsychologistSchema,
  selectReviewSchema,
  updateReviewSchema,
} from "./reviews.schemas";

const tags = ["Reviews"];

export const listByPsychologist = createRoute({
  path: "/reviews/psychologist/{id}",
  method: "get",
  tags,
  request: {
    params: StringIdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectReviewByPsychologistSchema }),
      "The list of review by psychologist",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(StringIdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const getOne = createRoute({
  path: "/reviews/{id}",
  method: "get",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({
        data: selectReviewByIdSchema,
      }),
      "The requested review",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Review not found",
    ),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const create = createRoute({
  path: "/reviews",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertReviewSchema, "The review to create"),
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.CREATED]: jsonContent(
      z.object({ data: selectReviewSchema }),
      "The created review",
    ),
  },
});

export const patch = createRoute({
  path: "/reviews/{id}",
  method: "patch",
  tags,
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(updateReviewSchema, "The review to update"),
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectReviewSchema }),
      "The updated review",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Review not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const remove = createRoute({
  path: "/reviews",
  method: "delete",
  tags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Review deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Review not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
    [HTTPStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListByPsychologistRoute = typeof listByPsychologist;
export type GetOneRoute = typeof getOne;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
