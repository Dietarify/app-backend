import prisma from '@/service/DBService';
import ResponseError from '@/util/ResponseError';
import express from 'express';

export async function getDietHistory(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const result = await prisma.dietHistory.findMany();

  res.json({
    status: 'success',
    message: 'success',
    data: result,
  });
}
