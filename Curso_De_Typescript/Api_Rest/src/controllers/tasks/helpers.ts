import { FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";

export function notFoundTask(id: string, reply: FastifyReply) {
  return reply.status(StatusCodes.NOT_FOUND).send({
    message: `No Task Found With ID: ${id}`,
  });
}
