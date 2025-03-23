import { z } from "@hono/zod-openapi";

const StringIdParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
      required: true,
    },
    required: ["id"],
    example: "XlX76DY20DEvVqUg2BX6JK3o8UtwrcXm",
  }),
});

export default StringIdParamsSchema;
