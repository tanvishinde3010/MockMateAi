
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const updated = await prisma.supportTicket.update({
      where: { id: 'TKT-502' },
      data: { status: 'Resolved' }
    });
    console.log('Ticket TKT-502 resolved successfully in database:', updated);
  } catch (error) {
    console.error('Failed to resolve ticket in database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
