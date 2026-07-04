import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const updated = await prisma.user.update({
      where: { id: 'user-1' },
      data: { resumeName: 'Rahul_SWE_Resume.pdf' }
    });
    console.log('User profile updated successfully with default resumeName:', updated);
  } catch (error) {
    console.error('Failed to update user profile default resumeName:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
