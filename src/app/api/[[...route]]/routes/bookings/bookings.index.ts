import { createRouter } from "../../lib/create-app";
import * as routes from "./bookings.routes";
import * as handlers from "./bookings.handlers";

const router = createRouter()
  .basePath("/bookings")
  .openapi(routes.listSchedules, handlers.listSchedules)
  .openapi(routes.listSessions, handlers.listSessions)
  .openapi(
    routes.listSchedulesByPsychologist,
    handlers.listSchedulesByPsychologist,
  )
  .openapi(
    routes.listSessionsByPsychologist,
    handlers.listSessionsByPsychologist,
  )
  .openapi(routes.getOneSchedule, handlers.getOneSchedule)
  .openapi(routes.getOneSession, handlers.getOneSession)
  .openapi(routes.createSchedule, handlers.createSchedule)
  .openapi(routes.createSession, handlers.createSession)
  .openapi(routes.patchSchedule, handlers.patchSchedule)
  .openapi(routes.patchSession, handlers.patchSession)
  .openapi(routes.removeSchedule, handlers.removeSchedule)
  .openapi(routes.removeSession, handlers.removeSession);

export default router;
