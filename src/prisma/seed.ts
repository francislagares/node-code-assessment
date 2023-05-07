import { PrismaClient } from '@prisma/client';
import { clients } from './clients';
import { policies } from './policies';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: clients,
  });

  await prisma.policy.createMany({
    data: policies,
  });
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
