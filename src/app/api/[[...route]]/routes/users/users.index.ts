import { createRouter } from "../../lib/create-app";
import * as routes from "./users.routes";
import * as handlers from "./users.handlers";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.listPsychologists, handlers.listPsychologists)
  .openapi(routes.getOnePsychologist, handlers.getOnePsychologist)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
