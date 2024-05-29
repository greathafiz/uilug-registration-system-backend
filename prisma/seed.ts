import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const admin1 = await prisma.admins.upsert({
    where: { username: process.env.ADMIN1_USERNAME },
    update: {},
    create: {
      username: process.env.ADMIN1_USERNAME,
      password: process.env.ADMIN1_PASSWORD,
    },
  });

  const admin2 = await prisma.admins.upsert({
    where: { username: process.env.ADMIN2_USERNAME },
    update: {},
    create: {
      username: process.env.ADMIN2_USERNAME,
      password: process.env.ADMIN2_PASSWORD,
    },
  });
  console.log({ admin1, admin2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
