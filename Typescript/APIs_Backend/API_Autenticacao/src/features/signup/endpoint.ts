import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../lib/prisma";
import { hash } from "../../lib/argon2";

interface SignupBody {
  name: string;
  username: string;
  password: string;
}

export async function endpoint(
  request: FastifyRequest<{ Body: SignupBody }>,
  reply: FastifyReply
) {
  const { name, username, password } = request.body;

  const isUsernameAvailable =
    (await prisma.user.count({
      where: { username },
    })) === 0;

  console.log(isUsernameAvailable);

  if (!isUsernameAvailable) {
    return reply.code(400).send({ error: "Username not Available!" });
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
      password: await hash(password),
    },
  });

  return reply.code(201).send({ id: user.id.toString() });
}
