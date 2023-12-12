import { UpdateProfileRequestSchema } from '@/model/request/ProfileRequest';
import { ProfileResponse } from '@/model/response/ProfileRespose';
import ResponseError from '@/util/ResponseError';
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
      userId: req.user.uid,
    },
  });

  res.json({
    status: 'success',
    message: 'data has been updated',
    data: result,
  });
}

export async function getProfile(req: express.Request, res: express.Response) {
  if (!req.user) {
    throw new ResponseError(401, 'authentication required');
  }

  const { ...result } = await prisma.profile.findFirst({
    where: {
      userId: req.user.uid,
    },
    select: {
      currentWeight: true,
      height: true,
      weightTarget: true,
    },
  });

  res.json({
    status: 'success',
    message: 'user data has been fetched',
    data: {
      ...(result ?? {}),
      email: req.user.email,
      name: req.user.name,
    } as ProfileResponse,
  });
}
