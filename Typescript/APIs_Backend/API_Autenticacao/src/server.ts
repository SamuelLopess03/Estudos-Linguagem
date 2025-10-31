import { fastify } from "fastify";

import { routerLoader, swaggerLoader } from "./loaders/index";

const app = fastify({ logger: true });

try {
  await swaggerLoader().load(app);
  await routerLoader().load(app);

  await app.listen({ port: 3000 });
} catch (error) {
  console.error(error);
  process.exit(1);
}
