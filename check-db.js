const { prisma, connectDatabase } = require("./database");

async function main() {
  await connectDatabase();
  await prisma.$disconnect();
}

main();