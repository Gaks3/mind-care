import { createRouter } from "../../lib/create-app";
import * as routes from "./reviews.routes";
import * as handlers from "./reviews.handlers";

const router = createRouter()
  .openapi(routes.listByPsychologist, handlers.listByPsychologist)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
