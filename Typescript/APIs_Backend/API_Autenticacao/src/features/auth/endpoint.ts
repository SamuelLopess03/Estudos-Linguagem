import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../lib/prisma";
import { User } from "../../generated/prisma/client";
import { verify } from "../../lib/argon2";
import { sign } from "../../lib/jwt";

interface AuthBody {
  username: string;
  password: string;
}

export async function endpoint(
  request: FastifyRequest<{ Body: AuthBody }>,
  reply: FastifyReply
) {
  const { username, password } = request.body;

  const user = await prisma.user.findFirst({
    where: { username },
  });

  const isValidCredentials = await validateUserAndPassword(user, password);

  if (!isValidCredentials) {
    return reply.code(400).send({ error: "Invalid Credentials!" });
  }

  const accessToken = await sign({ id: user!.id });

  return reply.code(200).send({ accessToken });
}

const validateUserAndPassword = async (
  user: User | null,
  password: string
): Promise<boolean> => {
  return user !== null && (await verify(user.password, password));
};
