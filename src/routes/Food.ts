import { getFoodsList, getRecomendation } from '@/controller/Food';
import express from 'express';
import asyncHandler from 'express-async-handler';

const foodRouter = express.Router();
foodRouter.get('/', asyncHandler(getFoodsList));
foodRouter.get('/recomendation', asyncHandler(getRecomendation));

export default foodRouter;
