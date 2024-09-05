import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt");
const salts = 10;

const prisma = new PrismaClient();

async function main() {
    const testOne = await prisma.user.upsert({
        where: { email: 'testUserOne@prisma.io' },
        update: {},
        create: {
            email: 'testUserOne@prisma.io',
            name: 'Test User One',
            password: 'Password123',
        },
    })
    const bob = await prisma.user.upsert({
        where: { email: 'testUserTwo@prisma.io' },
        update: {},
        create: {
            email: 'testUserTwo@prisma.io',
            name: 'Test User Two',
            password: 'Password456'
        },
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })