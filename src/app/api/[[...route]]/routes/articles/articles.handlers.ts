import { Prisma } from "@prisma/client";
import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";

import db from "@/lib/db";
import { UserRole } from "@/types";
import { AppRouteHandler } from "../../lib/types";
import { generateSlugArticle, hasRole, uploadFile } from "../../lib/utils";
import {
  CreateBookmarkRoute,
  CreateRoute,
  GetOneBookmarkRoute,
  GetOneByIdRoute,
  GetOneBySlugRoute,
  ListBookmarkByUserIdRoute,
  ListRoute,
  PatchRoute,
  RemoveBookmarkRoute,
  RemoveRoute,
} from "./articles.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { createdBy, search, sort } = c.req.valid("query");

  const where: Prisma.ArticleWhereInput = {
    createdBy,
    title: {
      contains: search,
    },
  };

  const data = await db.article.findMany({
    where,
    orderBy: { createdAt: sort || "desc" },
    include: {
      user: true,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const listBookmarkByUserId: AppRouteHandler<
  ListBookmarkByUserIdRoute
> = async (c) => {
  const user = c.get("user")!;

  const data = await db.bookmarkArticle.findMany({
    where: {
      userId: user.id,
    },
    include: {
      article: {
        omit: {
          content: true,
        },
      },
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOneById: AppRouteHandler<GetOneByIdRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const data = await db.article.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!data)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOneBySlug: AppRouteHandler<GetOneBySlugRoute> = async (c) => {
  const { slug } = c.req.valid("param");

  const data = await db.article.findUnique({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });

  if (!data)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOneBookmark: AppRouteHandler<GetOneBookmarkRoute> = async (
  c,
) => {
  const { id: articleId } = c.req.valid("param");
  const user = c.get("user")!;

  const data = await db.bookmarkArticle.findUnique({
    where: {
      userId_articleId: {
        articleId,
        userId: user.id,
      },
    },
    include: {
      article: true,
    },
  });

  if (!data)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { title, image, content, categories } = c.req.valid("form");
  const user = c.get("user")!;

  const { fileName } = await uploadFile(image);

  const data = await db.article.create({
    data: {
      title,
      content,
      categories,
      slug: await generateSlugArticle(title),
      thumbnail: fileName,
      createdBy: user.id,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const createBookmark: AppRouteHandler<CreateBookmarkRoute> = async (
  c,
) => {
  const { id: articleId } = c.req.valid("param");
  const user = c.get("user")!;

  const data = await db.bookmarkArticle.upsert({
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
    include: {
      article: true,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const { title, image, content, categories } = c.req.valid("form");
  const user = c.get("user")!;

  const article = await db.article.findUnique({
    where: { id: Number(id) },
  });

  if (!article)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (article.createdBy !== user.id && !hasRole(user, UserRole.ADMIN))
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

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

  const updatedArticle = await db.article.update({
    where: {
      id: article.id,
    },
    data,
  });

  return c.json({ data: updatedArticle }, HTTPStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = c.get("user")!;

  const article = await db.article.findUnique({
    where: {
      id,
    },
  });

  if (!article)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (article.createdBy === user.id && !hasRole(user, UserRole.ADMIN))
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  await db.article.delete({
    where: {
      id,
    },
  });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};

export const removeBookmark: AppRouteHandler<RemoveBookmarkRoute> = async (
  c,
) => {
  const { id: articleId } = c.req.valid("param");
  const user = c.get("user")!;

  const bookmark = await db.bookmarkArticle.findUnique({
    where: {
      userId_articleId: {
        articleId,
        userId: user.id,
      },
    },
  });

  if (!bookmark)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  await db.bookmarkArticle.delete({
    where: {
      userId_articleId: {
        articleId,
        userId: user.id,
      },
    },
  });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
