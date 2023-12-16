import { PrismaClient } from '@prisma/client';
import logger from './log';

const prisma = new PrismaClient();

export async function healthCheck() {
  try {
    logger.info('checking database health');
    await prisma.$queryRaw`SELECT 1=1;`;
    return true;
  } catch (e) {
    logger.error(`database healthcheck failed: ${e}`);
    return false;
  }
}

export default prisma;
