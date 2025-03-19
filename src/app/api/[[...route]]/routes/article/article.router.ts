import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
import { UserRole } from "@/types";
import type { Prisma } from "@prisma/client";
import {
  createArticleSchema,
  queryArticleSchema,
  updateArticleSchema,
} from "./article.type";
import { generateSlugArticle, hasRole, uploadFile } from "../../lib/utils";

const articles = new Hono()
  .get("/", zValidator("query", queryArticleSchema), async (c) => {
    const { createdby, search, sort } = c.req.valid("query");

    const where: Prisma.ArticleWhereInput = {
      createdBy: createdby,
      title: {
        contains: search,
      },
    };

    const articles = await db.article.findMany({
      where,
      orderBy: { createdAt: sort || "desc" },
      include: {
        user: true,
      },
    });

    return c.json({
      data: articles,
    });
  })
  .get("/bookmark", authMiddleware(), async (c) => {
    const user = c.get("user")!;

    const bookmarks = await db.bookmarkArticle.findMany({
      where: {
        userId: user.id,
      },
    });

    return c.json({ data: bookmarks });
  })
  .get("/bookmark/:id", authMiddleware(), async (c) => {
    const { id } = c.req.param();
    const user = c.get("user")!;

    if (isNaN(Number(id)))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const bookmark = await db.bookmarkArticle.findUnique({
      where: {
        userId_articleId: {
          articleId: Number(id),
          userId: user.id,
        },
      },
    });

    if (!bookmark)
      throw new HTTPException(404, { message: "Bookmark not found" });

    return c.json({ data: bookmark });
  })
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

    if (!data) throw new HTTPException(404, { message: "Article not found" });

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
  .post("/:id/bookmark", authMiddleware(), async (c) => {
    const { id } = c.req.param();
    const user = c.get("user")!;
    const articleId = Number(id);

    if (isNaN(articleId))
      throw new HTTPException(400, { message: "Param id must be a number" });

    await db.bookmarkArticle.upsert({
      where: {
        userId_articleId: {
          articleId,
          userId: user.id,
        },
      },
      update: {
        articleId,
        userId: user.id,
      },
      create: {
        articleId,
        userId: user.id,
      },
    });

    return c.json({ message: "Successfully to bookmark article" });
  })
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
      if (!article)
        throw new HTTPException(404, { message: "Article not found" });

      if (article.createdBy !== user.id && !hasRole(user, UserRole.ADMIN))
        throw new HTTPException(401, { message: "Unauthorized" });

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
      if (!article)
        throw new HTTPException(404, { message: "Article not found" });

      if (article.createdBy === user.id && !hasRole(user, UserRole.ADMIN))
        throw new HTTPException(401, { message: "Unauthorized" });

      await db.article.delete({
        where: {
          id: article.id,
        },
      });

      return c.json({
        message: "Successfully to delete article",
      });
    },
  )
  .delete("/:id/bookmark", authMiddleware(), async (c) => {
    const { id } = c.req.param();
    const user = c.get("user")!;
    const articleId = Number(id);

    if (isNaN(articleId))
      throw new HTTPException(400, { message: "Param id must be a number" });

    const bookmark = await db.bookmarkArticle.findUnique({
      where: {
        userId_articleId: {
          articleId,
          userId: user.id,
        },
      },
    });
    if (!bookmark)
      throw new HTTPException(404, { message: "Bookmark not found" });

    await db.bookmarkArticle.delete({
      where: {
        userId_articleId: {
          articleId,
          userId: user.id,
        },
      },
    });

    return c.json({ message: "Successfully to delete bookmark article" });
  });
export default articles;
