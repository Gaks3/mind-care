import { createRoute, z } from "@hono/zod-openapi";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { IdParamsSchema, SlugParamsSchema } from "stoker/openapi/schemas";

import { UserRole } from "@/types";
import { authMiddleware } from "../../middlewares/auth";
import { forbiddenSchema, notFoundSchema } from "../../lib/constants";
import { selectUserSchema } from "../users/users.schemas";
import {
  insertArticleSchema,
  ListParamsSchema,
  selectArticleSchema,
  selectArticlesSchema,
  selectBookmarkSchema,
  updateArticleSchema,
} from "./articles.schemas";

const articleTags = ["Articles"];
const bookmarkTags = ["Bookmarks"];

export const list = createRoute({
  path: "/articles",
  method: "get",
  tags: articleTags,
  request: {
    query: ListParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectArticlesSchema) }),
      "The list of articles",
    ),
  },
});

export const listBookmarkByUserId = createRoute({
  path: "/articles/bookmarks",
  method: "get",
  tags: bookmarkTags,
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: z.array(selectBookmarkSchema) }),
      "The list of bookmarks",
    ),
  },
});

export const getOneById = createRoute({
  path: "/articles/{id}",
  method: "get",
  tags: articleTags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({
        data: selectArticleSchema.extend({ user: selectUserSchema }),
      }),
      "The requested article",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Article not found",
    ),
  },
});

export const getOneBySlug = createRoute({
  path: "/articles/{slug}/slug",
  method: "get",
  tags: articleTags,
  request: {
    params: SlugParamsSchema,
  },
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({
        data: selectArticleSchema.extend({ user: selectUserSchema }),
      }),
      "The requested article",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Article not found",
    ),
  },
});

export const getOneBookmark = createRoute({
  path: "/articles/bookmarks/{id}",
  method: "get",
  tags: bookmarkTags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectBookmarkSchema }),
      "The requested bookmark",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Bookmark not found",
    ),
  },
});

export const create = createRoute({
  path: "/articles",
  method: "post",
  tags: articleTags,
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: insertArticleSchema,
        },
      },
    },
  },
  middleware: authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectArticleSchema }),
      "The created article",
    ),
  },
});

export const createBookmark = createRoute({
  path: "/articles/{id}/bookmark",
  method: "post",
  tags: bookmarkTags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectBookmarkSchema }),
      "The created bookmark",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Article not found",
    ),
  },
});

export const patch = createRoute({
  path: "/articles/{id}",
  method: "patch",
  tags: articleTags,
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "multipart/form-data": {
          schema: updateArticleSchema,
        },
      },
    },
  },
  middleware: authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
  responses: {
    [HTTPStatusCodes.OK]: jsonContent(
      z.object({ data: selectArticleSchema }),
      "The updated article",
    ),
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Article not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export const remove = createRoute({
  path: "/articles/{id}",
  method: "delete",
  tags: articleTags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Article deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Article not found",
    ),
  },
});

export const removeBookmark = createRoute({
  path: "/articles/bookmarks/{id}",
  method: "delete",
  tags: bookmarkTags,
  request: {
    params: IdParamsSchema,
  },
  middleware: authMiddleware(),
  responses: {
    [HTTPStatusCodes.NO_CONTENT]: {
      description: "Bookmark deleted",
    },
    [HTTPStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Bookmark not found",
    ),
    [HTTPStatusCodes.FORBIDDEN]: jsonContent(forbiddenSchema, "Forbidden"),
  },
});

export type ListRoute = typeof list;
export type ListBookmarkByUserIdRoute = typeof listBookmarkByUserId;
export type GetOneByIdRoute = typeof getOneById;
export type GetOneBySlugRoute = typeof getOneBySlug;
export type GetOneBookmarkRoute = typeof getOneBookmark;
export type CreateRoute = typeof create;
export type CreateBookmarkRoute = typeof createBookmark;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
export type RemoveBookmarkRoute = typeof removeBookmark;
