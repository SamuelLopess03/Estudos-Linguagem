import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";

import { tasksServices } from "#services/tasks.js";
import { notFoundTask } from "./helpers.js";

async function getAll(_req: FastifyRequest, reply: FastifyReply) {
  const tasks = await tasksServices.getAll();

  return reply.status(StatusCodes.OK).send({
    message: `Tasks: ${tasks.length}`,
    tasks,
  });
}

interface GetByIdRoute {
  Params: {
    id: string;
  };
}

async function getById(req: FastifyRequest<GetByIdRoute>, reply: FastifyReply) {
  const { id } = req.params;

  const task = await tasksServices.getById(id);

  if (!task) {
    return notFoundTask(id, reply);
  }

  return reply.status(StatusCodes.OK).send(task);
}

export { getAll as getAllTaskController, getById as getByIdTaskController };
