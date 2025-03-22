import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import db from "@/lib/db";
import { hasRole, uploadFile } from "../../lib/utils";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "./user.type";
import { generateId } from "better-auth";
import { hashPassword } from "better-auth/crypto";
import { UserRole } from "@/types";

const users = new Hono()
  .get("/", authMiddleware(UserRole.ADMIN), async (c) => {
    const users = await db.user.findMany();

    return c.json({
      data: users,
    });
  })
  .get("/psychologists", authMiddleware(), async (c) => {
    const psychologists = await db.user.findMany({
      where: {
        role: "PSYCHOLOGY",
      },
    });

    if (psychologists.length === 0)
      return c.json({ message: "Psychologists not found" }, 404);

    return c.json({
      data: psychologists,
    });
  })
  .get("/:id", authMiddleware(), async (c) => {
    const { id } = c.req.param();
    const session = c.get("user")!;

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return c.json({ message: "User not found" }, 404);

    if (id !== session.id && !hasRole(session, UserRole.ADMIN))
      return c.json({ error: "Unauthorized" }, 401);

    return c.json({
      data: user,
    });
  })
  .post(
    "/",
    authMiddleware(UserRole.ADMIN),
    zValidator("json", createUserSchema),
    async (c) => {
      const data = c.req.valid("json");

      const alreadyExist = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (alreadyExist) return c.json({ error: "Email already exist" }, 400);

      const user = await db.user.create({
        data: {
          id: generateId(),
          email: data.email,
          name: data.name,
          role: data.role,
          emailVerified: false,
          description: data.description,
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

      return c.json({ message: "Sucessfully to create user" }, 200);
    },
  )
  .patch(
    "/:id",
    authMiddleware(),
    zValidator("form", updateUserSchema),
    async (c) => {
      const { id } = c.req.param();
      const data = c.req.valid("form");
      const session = c.get("user")!;

      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) return c.json({ message: "User not found" }, 404);

      if (
        (id !== session!.id || data.role) &&
        !hasRole(session!, UserRole.ADMIN)
      )
        return c.json({ error: "Unauthorized" }, 401);

      let fileName: string | undefined;

      if (data.image) {
        const upload = await uploadFile(data.image);

        fileName = upload.fileName;
      }

      await db.user.update({
        where: {
          id,
        },
        data: {
          ...data,
          image: fileName,
          ...(data.educations && {
            education: {
              createMany: data.educations,
            },
          }),
        },
      });

      return c.json({ message: "Sucessfully to update user" }, 200);
    },
  )
  .delete("/:id", authMiddleware(), async (c) => {
    const { id } = c.req.param();
    console.log(id);
    const session = c.get("user")!;

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return c.json({ message: "User not found" }, 404);

    if (id !== session!.id && !hasRole(session!, [UserRole.ADMIN]))
      return c.json({ error: "Unauthorized" }, 401);

    await db.user.delete({
      where: {
        id,
      },
    });

    return c.json({ message: "Sucessfully to delete user" }, 200);
  });

export default users;
