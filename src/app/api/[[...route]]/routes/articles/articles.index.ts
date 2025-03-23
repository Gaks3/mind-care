import { createRouter } from "../../lib/create-app";
import * as routes from "./articles.routes";
import * as handlers from "./articles.handlers";

export const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.listBookmarkByUserId, handlers.listBookmarkByUserId)
  .openapi(routes.getOneBookmark, handlers.getOneBookmark)
  .openapi(routes.getOneById, handlers.getOneById)
  .openapi(routes.getOneBySlug, handlers.getOneBySlug)
  .openapi(routes.create, handlers.create)
  .openapi(routes.createBookmark, handlers.createBookmark)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.removeBookmark, handlers.removeBookmark);

export default router;
