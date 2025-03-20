import { z } from "zod";
import { imageSchema } from "../../type/image.type";

export const createArticleSchema = z.object({
  title: z.string().trim().min(1, { message: "Title required" }),
  content: z.string(),
  image: imageSchema,
  categories: z.string().trim().min(1, { message: "Categories required" }),
});

export const updateArticleSchema = z.object({
  title: createArticleSchema.shape.title.optional(),
  content: createArticleSchema.shape.content.optional(),
  image: createArticleSchema.shape.image.optional(),
  categories: createArticleSchema.shape.categories.optional(),
});

export const queryArticleSchema = z.object({
  createdby: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});
