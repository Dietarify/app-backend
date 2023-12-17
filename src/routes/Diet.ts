import { addDiet, getDietHistory } from '@/controller/Diet';
import express from 'express';
import asyncHandler from 'express-async-handler';

const dietRouter = express.Router();
dietRouter.get('/', asyncHandler(getDietHistory));
dietRouter.post('/', asyncHandler(addDiet));

export default dietRouter;
