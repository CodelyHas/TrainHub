import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const data = await prisma.trainSchedule.create({
    data: {
      trainName: "Test Train",
      departure: "Riyadh",
      arrival: "Dammam",
      departureTime: new Date(),
      arrivalTime: new Date(),
      price: 100,
      capacity: 50,
    },
  });

  console.log(data);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());