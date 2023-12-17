import { AddDietSchema } from '@/model/request/DietRequest';
import { Pagination } from '@/model/request/generic';
import prisma from '@/service/DBService';
import { calculateCaloriesNeeds } from '@/service/MLService';
import ResponseError from '@/util/ResponseError';
import express from 'express';

export async function getDietHistory(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { limit, page } = await Pagination.validate(req.body);
  const result = await prisma.dietHistory.findMany({
    where: {
      userId: req.user.uid,
    },
    take: limit,
    skip: limit * (page - 1),
  });

  res.json({
    status: 'success',
    message: 'success',
    data: result,
  });
}

export async function addDiet(req: express.Request, res: express.Response) {
  await prisma.$transaction(async (tx) => {
    if (!req.user) {
      throw new ResponseError(401, 'authentication required');
    }

    const { foodId, foodItemWeight } = await AddDietSchema.validate(req.body);
    const userProfile = await tx.profile.findUnique({
      where: {
        userId: req.user.uid,
      },
    });

    if (!userProfile || !userProfile.height || !userProfile.currentWeight) {
      throw new ResponseError(404, "user hasn't initialized yet");
    }

    const { height, currentWeight } = userProfile;

    const foodData = await tx.foods.findUnique({
      where: {
        id: foodId,
      },
    });

    if (!foodData) {
      throw new ResponseError(404, 'food is not found');
    }

    const caloriesNeeds = await calculateCaloriesNeeds(currentWeight, height);
    const timestamp = new Date();

    const userLastCalories =
      (
        await tx.calorieHistory.findFirst({
          where: {
            userId: req.user.uid,
            timestamp,
          },
        })
      )?.consumedCalories ?? 0;

    const caloriesAddition =
      (foodData.caloriesPerHundredGram * foodItemWeight) / 100;

    await tx.calorieHistory.upsert({
      where: {
        timestamp_userId: {
          timestamp: new Date(),
          userId: req.user.uid,
        },
      },
      create: {
        caloriesNeeds,
        userId: req.user.uid,
        consumedCalories: caloriesAddition,
      },
      update: {
        consumedCalories: caloriesAddition + userLastCalories,
      },
    });

    await tx.dietHistory.create({
      data: {
        userId: req.user.uid,
        eatenFoodId: foodId,
        quantity: foodItemWeight,
      },
    });
  });

  res.json({
    status: 'success',
    message: 'data updated',
    data: null,
  });
}
