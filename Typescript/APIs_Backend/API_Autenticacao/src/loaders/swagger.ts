import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

export function swaggerLoader() {
  return {
    async load(fastify: FastifyInstance) {
      await fastify.register(fastifySwagger, {
        openapi: {
          info: {
            title: "API de Autenticação",
            description: "API de Autenticação utilizando Fastify e TypeScript",
            version: "1.0.0",
          },
          components: {
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
          },
        },
      });

      await fastify.register(fastifySwaggerUi, {
        routePrefix: "/docs",
        uiConfig: {
          docExpansion: "full",
          deepLinking: false,
        },
        uiHooks: {
          onRequest: function (_, _reply, next) {
            next();
          },
          preHandler: function (_, _reply, next) {
            next();
          },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, _request, _reply) =>
          swaggerObject,
        transformSpecificationClone: true,
      });
    },
  };
}
