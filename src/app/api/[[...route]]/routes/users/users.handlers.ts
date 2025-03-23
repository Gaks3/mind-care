import { generateId } from "better-auth";
import { hashPassword } from "better-auth/crypto";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import db from "@/lib/db";
import { UserRole } from "@/types";
import { AppRouteHandler } from "../../lib/types";
import { hasRole, uploadFile } from "../../lib/utils";
import {
  CreateRoute,
  GetOne,
  GetOnePsychologist,
  ListRoute,
  ListRoutePsychologists,
  PatchRoute,
  RemoveRoute,
} from "./users.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const data = await db.user.findMany();

  return c.json(
    {
      data,
    },
    HttpStatusCodes.OK,
  );
};

export const listPsychologists: AppRouteHandler<
  ListRoutePsychologists
> = async (c) => {
  const data = await db.user.findMany({
    where: {
      role: "PSYCHOLOGY",
    },
  });

  return c.json(
    {
      data,
    },
    HttpStatusCodes.OK,
  );
};

export const getOne: AppRouteHandler<GetOne> = async (c) => {
  const { id } = c.req.valid("param");
  const user = c.get("user")!;

  const data = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!data)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );

  if (id !== user.id && !hasRole(user, UserRole.ADMIN))
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN,
    );

  return c.json(
    {
      data,
    },
    HttpStatusCodes.OK,
  );
};

export const getOnePsychologist: AppRouteHandler<GetOnePsychologist> = async (
  c,
) => {
  const { id } = c.req.valid("param");

  const data = await db.user.findUnique({
    where: {
      id,
      role: "PSYCHOLOGY",
    },
    include: {
      bookingSchedule: true,
      psychologyTopic: true,
      education: true,
      reviewPsychologyId: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!data)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );

  const rate = await db.review.aggregate({
    where: {
      psychologyId: data?.id,
    },
    _avg: {
      rate: true,
    },
  });

  return c.json(
    { data: { ...data, rate: rate._avg.rate } },
    HttpStatusCodes.OK,
  );
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");

  const alreadyExist = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (alreadyExist)
    return c.json(
      {
        success: false,
        message: HttpStatusPhrases.BAD_REQUEST,
        description: "User already exist",
      },
      400,
    );

  const user = await db.user.create({
    data: {
      id: generateId(),
      email: data.email,
      name: data.name,
      role: data.role,
      emailVerified: false,
      description: data.description,
      ...(data.educations && {
        education: {
          createMany: {
            data: data.educations,
          },
        },
      }),
    },
  });

  const hashedPassword = await hashPassword(data.password);

  await db.account.create({
    data: {
      id: generateId(),
      accountId: generateId(),
      providerId: "credential",
      userId: user.id,
      password: hashedPassword,
    },
  });

  return c.json({ data: user }, HttpStatusCodes.CREATED);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("form");
  const session = c.get("user")!;

  const user = await db.user.findUnique({ where: { id } });

  if (!user)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );

  if (id !== session.id && !hasRole(session, UserRole.ADMIN))
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN,
    );

  let fileName: string | undefined;

  if (data.image) {
    const upload = await uploadFile(data.image);

    fileName = upload.fileName;
  }

  const updatedUser = await db.user.update({
    where: {
      id,
    },
    data: {
      ...data,
      image: fileName,
      ...(data.educations && {
        education: {
          createMany: {
            data: data.educations,
          },
        },
      }),
    },
  });

  return c.json({ data: updatedUser }, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const session = c.get("user")!;

  if (id !== session.id && !hasRole(session, UserRole.ADMIN))
    return c.json(
      { message: HttpStatusPhrases.FORBIDDEN },
      HttpStatusCodes.FORBIDDEN,
    );

  const user = await db.user.findUnique({ where: { id } });

  if (!user)
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND,
    );

  await db.user.delete({
    where: {
      id,
    },
  });

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
