import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/* async function main() {
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
} */

async function main() {
  await prisma.trainers.upsert({
    where: { trainer_id: 55 },
    update: {},
    create: {
      trainer_name: 'Mr. O. B. Onigba',
      email: 'onigba@outlook.com',
      phone_number: '07090356316',
      address: 'Technical & Entrepreneurship Centre, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 56 },
    update: {},
    create: {
      trainer_name: 'Mrs. H. O. Ande',
      email: 'ande@outlook.com',
      phone_number: '08014498897',
      address:
        'Aquaculture & Fisheries Department, Fac of Agriculture, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 57 },
    update: {},
    create: {
      trainer_name: 'Mrs. G. O. Adeyanju',
      email: 'adey@gmail.com',
      phone_number: '08022902533',
      address:
        'Home Economics & Food Science Department, Faculty of Agriculture',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 58 },
    update: {},
    create: {
      trainer_name: 'Mrs. Ahmed Khadijat Motunrayo',
      email: 'ahmedk@outlook.com',
      phone_number: '08058647654',
      address:
        'Home Economics & Food Science Department, Faculty of Agriculture',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 59 },
    update: {},
    create: {
      trainer_name: 'Prince Adesola Adesanya',
      email: 'princeade@outlook.com',
      phone_number: '08098331293',
      address:
        'The Bakery, SIDL, between Zamfara Hostel & SUG Building, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 60 },
    update: {},
    create: {
      trainer_name: 'Ahmed Akinbami',
      email: 'akinah@outlook.com',
      phone_number: '07040046283',
      address: 'C/O Technical & Entrepreneurship Centre, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 55 },
    update: {},
    create: {
      trainer_name: 'Soliu Ahmed',
      email: 'solahmed@aol.com',
      phone_number: '09140792627',
      address: 'C/O Technical & Entrepreneurship Centre, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 61 },
    update: {},
    create: {
      trainer_name: 'Miss Oluwadamilola O. Taiwo',
      email: 'taiwodami@gmail.com',
      phone_number: '07075133053',
      address: 'Dept of Microbiology, Faculty of Life Sciences, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 62 },
    update: {},
    create: {
      trainer_name: 'Mr. Sidiq Kabir',
      email: 'kabir@outlook.com',
      phone_number: '09067509064',
      address: 'Technical & Entrepreneurship Centre, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 63 },
    update: {},
    create: {
      trainer_name: 'Mrs. Ogunlade Oluwabunmi R.',
      email: 'ogunlade@aol.com',
      phone_number: '08143691013',
      address:
        'Library & Information Sciences Department, Faculty of Communication & Information Sciences, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 64 },
    update: {},
    create: {
      trainer_name: 'Mr. Yusuf N. O.',
      email: 'yusufno@outlook.com',
      phone_number: '08080614263',
      address:
        'Telecomunication Department, Faculty of Communication & Information Sciences, Unilorin',
    },
  });

  await prisma.trainers.upsert({
    where: { trainer_id: 65 },
    update: {},
    create: {
      trainer_name: 'Ben Da Poet',
      email: 'bendapoet@gmail.com',
      phone_number: '08097479698',
      address: 'C/O Technical & Entrepreneurship Centre, Unilorin',
    },
  });

  console.log('Success');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
