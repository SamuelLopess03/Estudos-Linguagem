import type { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "../lib/jwt";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends FastifyRequest {
  user: { id: number };
}

export async function isAuthenticated(
  request: AuthenticatedRequest,
  reply: FastifyReply
) {
  const rawToken = request.headers?.authorization;
  const tokenParts = rawToken?.split("Bearer ");
  const accessToken = tokenParts?.[1];

  if (!accessToken) {
    return reply.status(401).send({ error: "Unauthorized" });
  }

  const payload = await verify(accessToken);

  if (!payload) {
    return reply.status(401).send({ error: "Invalid Token!" });
  }

  request.user = payload as JwtPayload & { id: number };
}
