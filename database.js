const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exitCode = 1;
  }
}

module.exports = { prisma, connectDatabase };