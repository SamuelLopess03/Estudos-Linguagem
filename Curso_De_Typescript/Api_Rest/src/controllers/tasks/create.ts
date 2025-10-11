import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

import { CreateTaskSchema } from "#schemas/tasks.js";
import { tasksServices } from "#services/tasks.js";

const schema = z.object({
  name: z.string().min(3),
}) satisfies z.ZodType<CreateTaskSchema>;

async function controller(req: FastifyRequest, reply: FastifyReply) {
  const data = schema.parse(req.body);

  const newTask = await tasksServices.create(data);

  return reply.status(StatusCodes.CREATED).send({
    message: "Task Created Successfully!",
    task: newTask,
  });
}

export { controller as createTaskController };
