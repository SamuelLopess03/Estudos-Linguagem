import { isAuthenticated } from "../../shared/isAuthenticated";
import { endpoint } from "./endpoint";

export default {
  method: "GET",
  url: "/me",
  preHandler: isAuthenticated,
  handler: endpoint,
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          username: { type: "string" },
        },
      },
      401: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};
