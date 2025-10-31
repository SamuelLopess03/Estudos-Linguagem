import path from "node:path";
import url from "node:url";

import { glob } from "glob";
import type { FastifyInstance } from "fastify";

export function routerLoader() {
  return {
    async load(fastify: FastifyInstance) {
      const routesPath = path.resolve(
        path.dirname(""),
        "src",
        "features",
        "**/*route.{ts,js}"
      );

      const routes = await glob(routesPath, { windowsPathsNoEscape: true });

      for (const route of routes) {
        const urlRoute = url.pathToFileURL(route).href;
        const routeDefinition = await import(urlRoute);
        fastify.route(routeDefinition.default);
      }
    },
  };
}
