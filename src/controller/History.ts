import { Pagination } from '@/model/request/generic';
import prisma from '@/service/DBService';
import ResponseError from '@/util/ResponseError';
import express from 'express';

export async function getWeightHistory(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { limit, page } = await Pagination.validate(req.query);
  const result = await prisma.weightHistory.findMany({
    where: {
      userId: req.user.uid,
    },
    take: limit,
    skip: limit * (page - 1),
    orderBy: {
      timestamp: 'desc',
    },
  });

  res.json({
    status: 'success',
    message: 'success',
    data: result,
  });
}

export async function getCaloriesHistory(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { limit, page } = await Pagination.validate(req.query);
  const result = await prisma.calorieHistory.findMany({
    where: {
      userId: req.user.uid,
    },
    take: limit,
    skip: limit * (page - 1),
    orderBy: {
      timestamp: 'desc',
    },
  });

  res.json({
    status: 'success',
    message: 'success',
    data: result,
  });
}
