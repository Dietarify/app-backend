import { UpdateProfileRequestSchema } from '@/model/request/ProfileRequest';
import { ProfileResponse } from '@/model/response/ProfileRespose';
import { calculateBMI, calculateCaloriesNeeds } from '@/service/MLService';
import { dateToString } from '@/util/Date';
import ResponseError from '@/util/ResponseError';
import { Gender } from '@prisma/client';
import prisma from '@service/DBService';
import express from 'express';

export async function updateProfile(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }
  const data = await UpdateProfileRequestSchema.validate(req.body);

  const { userId: _, ...result } = await prisma.profile.upsert({
    where: {
      userId: req.user.uid,
    },
    update: data,
    create: {
      ...data,
      startWeight: data.currentWeight,
      userId: req.user.uid,
    },
  });

  if (data.currentWeight) {
    await prisma.weightHistory.upsert({
      where: {
        timestamp_userId: {
          userId: req.user.uid,
          timestamp: new Date(),
        },
      },
      update: {
        currentWeight: data.currentWeight,
      },
      create: {
        userId: req.user.uid,
        timestamp: new Date(),
        currentWeight: data.currentWeight,
      },
    });
  }

  res.json({
    status: 'success',
    message: 'data has been updated',
    data: {
      ...result,
      birthDate: dateToString(result.birthDate),
      dateTarget: dateToString(result.dateTarget),
    },
  });
}

export async function getProfile(req: express.Request, res: express.Response) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { ...result } = await prisma.profile.findUnique({
    where: {
      userId: req.user.uid,
    },
    select: {
      currentWeight: true,
      height: true,
      weightTarget: true,
      nickname: true,
      birthDate: true,
      gender: true,
      dateTarget: true,
    },
  });

  res.json({
    status: 'success',
    message: 'user data has been fetched',
    data: {
      ...(result ?? {}),
      birthDate: dateToString(result.birthDate),
      dateTarget: dateToString(result.dateTarget),
      email: req.user.email,
      name: req.user.name,
      picture: req.user.picture,
    } as ProfileResponse,
  });
}

export async function getUserCalNeeds(
  req: express.Request,
  res: express.Response
) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: req.user.uid,
    },
    select: {
      currentWeight: true,
      height: true,
      gender: true,
    },
  });

  if (!profile || !profile.currentWeight || !profile.height || profile.gender) {
    throw new ResponseError(404, "user hasn't been initialized");
  }

  const calNeeds = profile.gender
    ? await calculateCaloriesNeeds(
        profile.height,
        profile.currentWeight,
        profile.gender
      )
    : null;

  res.json({
    status: 'success',
    message: 'user data has been fetched',
    data: {
      calories: calNeeds,
    },
  });
}

export async function getUserBMI(req: express.Request, res: express.Response) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: req.user.uid,
    },
    select: {
      currentWeight: true,
      height: true,
    },
  });

  if (!profile || !profile.currentWeight || !profile.height) {
    throw new ResponseError(404, "user hasn't been initialized");
  }

  const bmiResult = await calculateBMI(profile.currentWeight, profile.height);

  res.json({
    status: 'success',
    message: 'user data has been fetched',
    data: {
      bmi: bmiResult,
    },
  });
}
