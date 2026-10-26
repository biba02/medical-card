const { prisma } = require("./database");

async function main() {
  await prisma.patient.createMany({
    data: [
      {
        firstName: "Олена",
        lastName: "Коваль",
        birthDate: new Date("1998-04-12"),
        email: "olena@example.com",
        diagnosis: "ГРВІ"
      },
      {
        firstName: "Андрій",
        lastName: "Мельник",
        birthDate: new Date("2001-09-25"),
        email: "andrii@example.com",
        diagnosis: "Бронхіт"
      }
    ],
    skipDuplicates: true
  });

  await prisma.doctor.createMany({
    data: [
      {
        firstName: "Ірина",
        lastName: "Шевченко",
        specialty: "Терапевт"
      },
      {
        firstName: "Олег",
        lastName: "Бондар",
        specialty: "Кардіолог"
      }
    ]
  });

  console.log("Test data added successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });