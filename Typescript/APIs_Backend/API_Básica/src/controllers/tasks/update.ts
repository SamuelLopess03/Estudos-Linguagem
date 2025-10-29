import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { taskStatus, UpdateTaskSchema } from "#schemas/tasks.js";
import { tasksServices } from "#services/tasks.js";
import { notFoundTask } from "./helpers.js";

const schema = z
  .object({
    name: z.string().min(3).optional(),
    status: z.enum(taskStatus).optional(),
  })
  .refine(({ name, status }) => status !== undefined || name !== undefined, {
    message:
      'At Least One of the Properties "status" or "name" Must be Provided',
  }) satisfies z.ZodType<UpdateTaskSchema>;

interface UpdateRoute {
  Params: {
    id: string;
  };
  Body: UpdateTaskSchema;
}

async function controller(
  req: FastifyRequest<UpdateRoute>,
  reply: FastifyReply
) {
  const { id } = req.params;

  const exists = await tasksServices.exists(id);

  if (!exists) {
    return notFoundTask(id, reply);
  }

  const data = schema.parse(req.body);

  const updatedTask = await tasksServices.update(id, data);

  return reply.status(StatusCodes.OK).send({
    message: "Task Updated Successfully!",
    task: updatedTask,
  });
}

export { controller as updateTaskController };
