import { StatusCodes } from "http-status-codes";

import { defineRoutes } from "#functions/utils.js";

export default defineRoutes((app) => {
  app.get("/", (_req, reply) => {
    reply.status(StatusCodes.OK).send({
      message: "Hello World",
    });
  });
});
