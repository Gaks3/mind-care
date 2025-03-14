import { Hono } from "hono";
import { handle } from "hono/vercel";
import { ZodError, ZodIssue } from "zod";
import { routes } from "./routes";

export const runtime = "nodejs";

export const app = new Hono().basePath("/api");

routes(app);

app.onError((error, c) => {
  if (error instanceof ZodError) {
    const errors = error.errors.map((err) => {
      if (err?.["unionErrors"]) {
        return err["unionErrors"].flatMap((unionErr) =>
          unionErr.issues.map((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
            path: issue.path,
          }))
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
  return c.json(
    { error, message: error.message || "Internal Server Error" },
    500
  );
});

app.notFound((c) => {
  return c.text("404 Not Found", 404);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
