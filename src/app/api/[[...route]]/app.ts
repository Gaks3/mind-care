import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import users from "./routes/users/users.index";
import topics from "./routes/topics/topics.index";
import bookings from "./routes/bookings/bookings.index";

const app = createApp().basePath("/api");

configureOpenAPI(app);

const routes = [users, topics, bookings] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];

export default app;
