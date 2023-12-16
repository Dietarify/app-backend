import { GetFoodQuerySchema } from '@/model/request/FoodRequest';
import prisma from '@/service/DBService';
import { getFoodRecomendation } from '@/service/MLService';
import ResponseError from '@/util/ResponseError';
import express from 'express';

export async function getRecomendation(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }
  const result = await getFoodRecomendation(req.user.uid);

  res.json({
    status: 'success',
    message: 'success',
    data: result,
  });
}

export async function getFoodsList(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { limit, query, page } = await GetFoodQuerySchema.validate(req.query);

  if (!query) {
    const result = await prisma.foods.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalFoods = await prisma.foods.count();

    res.json({
      status: 'success',
      message: 'success',
      data: {
        foods: result,
        metadata: {
          limit,
          page,
          totalPage: totalFoods == 0 ? 0 : Math.floor(totalFoods / limit) + 1,
          totalItem: totalFoods,
        },
      },
    });

    return;
  }

  const result = await prisma.foods.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      _relevance: {
        fields: ['name'],
        search: query.split(' ').join(' & '),
        sort: 'desc',
      },
    },
  });
  const totalFoods = await prisma.foods.count();

  res.json({
    status: 'success',
    message: 'success',
    data: {
      foods: result,
      metadata: {
        limit,
        page,
        totalPage: totalFoods == 0 ? 0 : Math.floor(totalFoods / limit) + 1,
        totalItem: totalFoods,
      },
    },
  });
}
