import { z } from "zod";
import { selectUserSchema } from "../users/users.schemas";
import { imageSchema } from "../../type/image.type";

export const ListParamsSchema = z.object({
  createdBy: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "createdBy",
        in: "path",
      },
      example: "XlX76DY20DEvVqUg2BX6JK3o8UtwrcXm",
    }),
  search: z
    .string()
    .optional()
    .openapi({
      param: {
        name: "search",
        in: "path",
      },
      example: "The title of article",
    }),
  sort: z
    .enum(["desc", "asc"])
    .optional()
    .openapi({
      param: {
        name: "sort",
        in: "path",
      },
      example: "desc",
    }),
});

export const selectArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  createdBy: z.string(),
  thumbnail: z.string(),
  view: z.number(),
  categories: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const selectArticlesSchema = z.object({
  ...selectArticleSchema.omit({ content: true }).shape,
  user: selectUserSchema,
});

export const selectBookmarkSchema = z.object({
  userId: z.string(),
  articleId: z.number(),
  article: selectArticleSchema.omit({ content: true }),
});

export const insertArticleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title required" }),
  content: z.string().trim().min(1, { message: "Content required" }),
  image: imageSchema,
  categories: z.string().trim().min(1, { message: "Categories required" }),
});

export const updateArticleSchema = insertArticleSchema.partial();
