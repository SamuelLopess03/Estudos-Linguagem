import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { tasksServices } from "#services/tasks.js";
import { notFoundTask } from "./helpers.js";

interface DeleteRoute {
  Params: {
    id: string;
  };
}

async function controller(
  req: FastifyRequest<DeleteRoute>,
  reply: FastifyReply
) {
  const { id } = req.params;

  const exists = await tasksServices.exists(id);

  if (!exists) {
    return notFoundTask(id, reply);
  }

  await tasksServices.delete(id);

  return reply.status(StatusCodes.OK).send({
    message: "Task Deleted Successfully!",
  });
}

export { controller as deleteTaskController };
