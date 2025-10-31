import { prisma } from "../../src/lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: "segredo",
    },
  });
}

main();
