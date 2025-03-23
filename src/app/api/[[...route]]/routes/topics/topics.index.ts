import { createRouter } from "../../lib/create-app";
import * as routes from "./topics.routes";
import * as handlers from "./topics.handlers";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.listPsychologistTopics, handlers.listPsychologistTopics)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.create, handlers.create)
  .openapi(routes.createPsychologistTopics, handlers.createPsychologistTopics)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.removePsychologistTopic, handlers.removePsychologistTopic)
  .openapi(routes.remove, handlers.remove);

export default router;
