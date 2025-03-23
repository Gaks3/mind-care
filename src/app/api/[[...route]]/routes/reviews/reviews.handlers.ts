import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";

import db from "@/lib/db";
import { AppRouteHandler } from "../../lib/types";
import {
  CreateRoute,
  GetOneRoute,
  ListByPsychologistRoute,
  PatchRoute,
  RemoveRoute,
} from "./reviews.routes";

export const listByPsychologist: AppRouteHandler<
  ListByPsychologistRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const reviews = await db.review.findMany({
    where: {
      psychologistId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  const reviewRate = await db.review.aggregate({
    where: {
      psychologistId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    _avg: {
      rate: true,
    },
  });

  return c.json(
    {
      data: {
        rate: reviewRate._avg.rate,
        reviews,
      },
    },
    HTTPStatusCodes.OK,
  );
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const review = await db.review.findUnique({
    where: {
      id,
    },
    include: {
      psychologist: true,
      user: true,
    },
  });

  if (!review)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  return c.json({ data: review }, HTTPStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const review = await db.review.create({
    data: {
      userId: user.id,
      ...data,
    },
  });

  return c.json({ data: review }, HTTPStatusCodes.CREATED);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");
  const user = c.get("user")!;

  const review = await db.review.findUnique({
    where: { id },
  });

  if (!review)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (review.userId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  const updatedReview = await db.review.update({
    where: {
      id,
    },
    data,
  });

  return c.json({ data: updatedReview }, HTTPStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const user = c.get("user")!;

  const review = await db.review.findUnique({
    where: {
      id,
    },
  });

  if (!review)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  if (review.userId !== user.id)
    return c.json(
      { message: HTTPStatusPhrases.FORBIDDEN },
      HTTPStatusCodes.FORBIDDEN,
    );

  await db.review.delete({
    where: {
      id,
    },
  });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
