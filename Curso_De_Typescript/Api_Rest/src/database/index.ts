import { QuickDB } from "quick.db";

import { TaskSchema } from "#schemas/tasks.js";

export const db = {
  tasks: new QuickDB<TaskSchema>({
    table: "tasks",
    filePath: "localdb.sqlite",
  }),
};
