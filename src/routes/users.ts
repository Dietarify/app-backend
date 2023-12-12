import { updateProfile, getProfile } from '@/controller/Profile';
import express from 'express';
import asyncHander from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/', asyncHander(getProfile));
userRouter.put('/', asyncHander(updateProfile));

export default userRouter;
