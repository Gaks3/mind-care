import { createMiddleware } from "hono/factory";
import { hasRole } from "../../lib/utils";
import { UserRole } from "@/types";

export const authMiddleware = (roles: UserRole[] | UserRole = []) => {
  return createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user || !hasRole(user, roles))
      return c.json({ error: "Unauthorized" }, 401);

    await next();
  });
};
