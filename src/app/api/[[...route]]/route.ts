import { Hono } from "hono";
import { handle } from "hono/vercel";
import { ZodError, ZodIssue } from "zod";
import users from "./routes/user/user.router";
import { logger } from "hono/logger";
import { auth } from "@/lib/auth";
import articles from "./routes/article/article.router";
import { HTTPException } from "hono/http-exception";
import bookings from "./routes/booking/booking.router";
import reviews from "./routes/review/review.router";

export const runtime = "nodejs";

export const app = new Hono()
  .basePath("/api")
  .use("*", logger())
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);

      return await next();
    }

    c.set("user", session.user);
    c.set("session", session.session);

    return await next();
  })
  .get("/health", (c) =>
    c.json({
      uptime: process.uptime,
      message: "OK",
      date: new Date(),
    }),
  )
  .route("/users", users)
  .route("/articles", articles)
  .route("/bookings", bookings)
  .route("/reviews", reviews);

export type AppType = typeof app;

app.onError((error, c) => {
  if (error instanceof HTTPException) return error.getResponse();

  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => {
      if (err?.["unionErrors"]) {
        return err["unionErrors"].flatMap((unionErr) =>
          unionErr.issues.map((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
            path: issue.path,
          })),
        );
      }

      return {
        message: err.message,
        errorCode: err.code,
        path: err.path,
      };
    });

    return c.json({ error: errors.flat(), message: "ZodError" }, 400);
  }

  console.error(error);
  return c.json({ message: "Internal Server Error" }, 500);
});

app.notFound((c) => {
  return c.text("404 Not Found", 404);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
