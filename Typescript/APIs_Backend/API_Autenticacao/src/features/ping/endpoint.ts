import type { FastifyReply, FastifyRequest } from "fastify";

export async function endpoint(_: FastifyRequest, reply: FastifyReply) {
  return reply.code(200).send({ ping: "pong" });
}
