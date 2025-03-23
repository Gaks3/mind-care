import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import users from "./routes/users/users.index";
import topics from "./routes/topics/topics.index";
import bookings from "./routes/bookings/bookings.index";
import reviews from "./routes/reviews/reviews.index";
import articles from "./routes/articles/articles.index";

const app = createApp()
  .basePath("/api")
  .route("/", users)
  .route("/", topics)
  .route("/", bookings)
  .route("/", reviews)
  .route("/", articles);

configureOpenAPI(app);

export type AppType = typeof app;

export default app;
