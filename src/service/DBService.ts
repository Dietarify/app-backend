import { PrismaClient } from '@prisma/client';
import logger from './log';
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export async function healthCheck() {
  try {
    logger.info('checking database health');
    await prisma.$queryRaw`SELECT 1=1;`;
    return true;
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      logger.error(`database healthcheck failed: ${e.name} - ${e.message}`);
    } else {
      logger.error(`database healthcheck failed: ${e}`);
    }
    return false;
  }
}

export default prisma;
