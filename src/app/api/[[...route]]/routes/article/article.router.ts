import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
import { UserRole } from "@/types";
import type { Prisma } from "@prisma/client";
import { zValidator } from "@hono/zod-validator";
import { createArticleSchema, updateArticleSchema } from "./article.type";
import { generateSlugArticle, hasRole, uploadFile } from "../../lib/utils";

const articles = new Hono()
  .get(
    "/",
    authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
    async (c) => {
      const user = c.get("user")!;

      const where: Prisma.ArticleWhereInput = {};

      if (user.role === UserRole.PSYCHOLOGY) {
        where.createdBy = user.id;
      }

      const articles = await db.article.findMany({
        where,
      });

      return c.json({
        data: articles,
      });
    },
  )
  .get("/:id", async (c, next) => {
    const { id } = c.req.param();
    if (isNaN(Number(id))) return await next();

    const article = await db.article.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!article) return c.json({ message: "Article not found" }, 404);

    return c.json({
      data: article,
    });
  })
  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const data = await db.article.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            description: true,
          },
        },
      },
    });

    if (!data) return c.json({ message: "Article not found" }, 404);

    return c.json({
      data,
    });
  })
  .post(
    "/",
    authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
    zValidator("json", createArticleSchema),
    async (c) => {
      const { title, image, content, categories } = c.req.valid("json");
      const user = c.get("user")!;

      const { fileName } = await uploadFile(image);

      await db.article.create({
        data: {
          title,
          content,
          categories,
          slug: await generateSlugArticle(title),
          thumbnail: fileName,
          createdBy: user.id,
        },
      });

      return c.json({ message: "Successfully to create article" });
    },
  )
  .patch(
    "/:id",
    authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
    zValidator("form", updateArticleSchema),
    async (c) => {
      const { id } = c.req.param();
      const { title, image, content, categories } = c.req.valid("form");
      const user = c.get("user")!;

      const article = await db.article.findUnique({
        where: { id: Number(id) },
      });
      if (!article) return c.json({ message: "Article not found" }, 404);

      if (article.createdBy !== user.id && !hasRole(user, UserRole.ADMIN))
        return c.json({ message: "Unauthorized" }, 401);

      const data: Prisma.ArticleUpdateInput = {
        title,
        content,
        categories,
      };

      if (image) {
        const upload = await uploadFile(image);

        data.thumbnail = upload.fileName;
      }

      if (title) {
        data.slug = await generateSlugArticle(title);
      }

      await db.article.update({
        where: {
          id: article.id,
        },
        data,
      });

      return c.json({ message: "Successfully to update article" });
    },
  )
  .delete(
    "/:id",
    authMiddleware([UserRole.PSYCHOLOGY, UserRole.ADMIN]),
    async (c) => {
      const { id } = c.req.param();
      const user = c.get("user")!;

      const article = await db.article.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!article) return c.json({ message: "Article not found" }, 404);

      if (article.createdBy === user.id && !hasRole(user, UserRole.ADMIN))
        return c.json({ message: "Unauthorized" }, 401);

      await db.article.delete({
        where: {
          id: article.id,
        },
      });

      return c.json({
        message: "Successfully to delete article",
      });
    },
  );

export default articles;
