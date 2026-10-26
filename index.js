const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const patient = await prisma.patient.create({
    data: {
      firstName: "Іван",
      lastName: "Петренко",
      birthDate: new Date("2000-05-15"),
      phone: "0991234567",
      email: "ivan@example.com",
      diagnosis: "ГРВІ",
    },
  });

  console.log("Пацієнта створено:", patient);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });