import { getUserDetails } from '@/controller/UserTest';
import express from 'express';
import asyncHander from 'express-async-handler';

const userRouter = express.Router();

userRouter.get('/', asyncHander(getUserDetails));

export default userRouter;
