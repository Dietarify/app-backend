import { getFoodsList, getRecomendation } from '@/controller/Food';
import express from 'express';
import asyncHandler from 'express-async-handler';

const dietRouter = express.Router();
dietRouter.get('/', asyncHandler(getFoodsList));
dietRouter.get('/recomendation', asyncHandler(getRecomendation));

export default dietRouter;
