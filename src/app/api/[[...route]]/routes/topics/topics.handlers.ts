import * as HTTPStatusCodes from "stoker/http-status-codes";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";

import db from "@/lib/db";
import { AppRouteHandler } from "../../lib/types";
import {
  CreatePsychologistsTopicsRoute,
  CreateRoute,
  GetOneRoute,
  ListPsychologistTopicsRoute,
  ListRoute,
  PatchRoute,
  RemovePsychologistTopicRoute,
  RemoveRoute,
} from "./topics.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const data = await db.topic.findMany();

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const listPsychologistTopics: AppRouteHandler<
  ListPsychologistTopicsRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const data = await db.psychologyTopic.findMany({
    where: {
      userId: id,
    },
    include: {
      topic: true,
    },
  });

  return c.json({ data }, HTTPStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const data = await db.topic.findUnique({
    where: {
      id,
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
  const data = c.req.valid("json");

  const topic = await db.topic.create({
    data: {
      name: data.name,
    },
  });

  return c.json({ data: topic }, HTTPStatusCodes.OK);
};

export const createPsychologistTopics: AppRouteHandler<
  CreatePsychologistsTopicsRoute
> = async (c) => {
  const { topics } = c.req.valid("json");
  const user = c.get("user")!;

  if (Array.isArray(topics)) {
    const data = topics.map(({ topicId }) => ({
      userId: user.id,
      topicId,
    }));

    const createdTopics = await db.psychologyTopic.createManyAndReturn({
      data,
      skipDuplicates: true,
    });

    return c.json({ data: createdTopics }, HTTPStatusCodes.OK);
  } else if (typeof topics === "number") {
    const createdTopic = await db.psychologyTopic.upsert({
      where: {
        userId_topicId: {
          topicId: topics,
          userId: user.id,
        },
      },
      update: {
        topicId: topics,
      },
      create: {
        topicId: topics,
        userId: user.id,
      },
    });

    return c.json({ data: createdTopic.topicId }, HTTPStatusCodes.OK);
  }

  return c.json(
    { message: HTTPStatusPhrases.BAD_REQUEST },
    HTTPStatusCodes.BAD_REQUEST,
  );
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  const topic = await db.topic.findUnique({
    where: {
      id,
    },
  });

  if (!topic)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  const updatedTopic = await db.topic.update({
    where: {
      id,
    },
    data,
  });

  return c.json({ data: updatedTopic }, HTTPStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const topic = await db.topic.findUnique({
    where: {
      id,
    },
  });

  if (!topic)
    return c.json(
      { message: HTTPStatusPhrases.NOT_FOUND },
      HTTPStatusCodes.NOT_FOUND,
    );

  await db.topic.delete({ where: { id } });

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};

export const removePsychologistTopic: AppRouteHandler<
  RemovePsychologistTopicRoute
> = async (c) => {
  const { topics } = c.req.valid("json");
  const user = c.get("user")!;

  if (Array.isArray(topics)) {
    await db.psychologyTopic.deleteMany({
      where: {
        topicId: {
          in: topics,
        },
      },
    });
  } else if (typeof topics === "number") {
    const userTopic = await db.psychologyTopic.findUnique({
      where: {
        userId_topicId: {
          userId: user.id,
          topicId: topics,
        },
      },
    });
    if (!userTopic)
      return c.json(
        { message: HTTPStatusPhrases.NOT_FOUND },
        HTTPStatusCodes.NOT_FOUND,
      );

    await db.psychologyTopic.delete({
      where: {
        userId_topicId: {
          userId: user.id,
          topicId: topics,
        },
      },
    });
  }

  return c.body(null, HTTPStatusCodes.NO_CONTENT);
};
