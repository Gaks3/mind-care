import { auth } from "@/lib/auth";
import { logger } from "hono/logger";
import users from "./user/user.router";
import { Hono } from "hono";

export const routes = (app: Hono) => {
  app.use("*", logger());

  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);

      return await next();
    }

    c.set("user", session.user);
    c.set("session", session.session);

    return await next();
  });

  app.get("/health", (c) =>
    c.json({
      uptime: process.uptime,
      message: "OK",
      date: new Date(),
    })
  );

  app.route("/users", users);
};
