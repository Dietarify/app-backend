import {
  updateProfile,
  getProfile,
  getUserCalNeeds,
  getUserBMI,
} from '@/controller/Profile';
import express from 'express';
import asyncHander from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/', asyncHander(getProfile));
userRouter.get('/calories', asyncHander(getUserCalNeeds));
userRouter.get('/bmi', asyncHander(getUserBMI));
userRouter.patch('/', asyncHander(updateProfile));

export default userRouter;
