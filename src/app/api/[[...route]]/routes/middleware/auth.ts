import { createMiddleware } from "hono/factory";
import { hasRole } from "../../lib/utils";
import { UserRole } from "@/types";
import { HTTPException } from "hono/http-exception";

export const authMiddleware = (roles?: UserRole[] | UserRole) => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user || (roles && !hasRole(user, roles)))
      throw new HTTPException(401, { message: "Unauthorized" });

    await next();
  });
};
