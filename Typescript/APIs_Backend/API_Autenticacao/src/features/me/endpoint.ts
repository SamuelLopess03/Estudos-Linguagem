import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../lib/prisma";

interface AuthenticatedRequest extends FastifyRequest {
  user: { id: number };
}

export async function endpoint(
  request: AuthenticatedRequest,
  reply: FastifyReply
) {
  const idUser = request.user.id;

  const user = await prisma.user.findUnique({
    where: { id: idUser },
  });

  return reply.code(200).send({
    id: user?.id,
    name: user?.name,
    username: user?.username,
  });
}
