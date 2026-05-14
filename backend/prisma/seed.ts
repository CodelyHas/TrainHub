import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.ts";

async function main() {
  const passwordHash = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@trainhub.com",
    },
    update: {},
    create: {
      fullName: "System Administrator",
      email: "admin@trainhub.com",
      passwordHash,
      role: "ADMIN",
      isActive: true,
    },
  });

  console.log("Default admin account created/ready:");
  console.log({
    id: admin.id,
    fullName: admin.fullName,
    email: admin.email,
    role: admin.role,
    isActive: admin.isActive,
  });
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });