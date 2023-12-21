import { getCaloriesHistory, getWeightHistory } from '@/controller/History';
import express from 'express';
import asyncHandler from 'express-async-handler';

const historyRouter = express.Router();
historyRouter.get('/weight', asyncHandler(getWeightHistory));
historyRouter.get('/calories', asyncHandler(getCaloriesHistory));

export default historyRouter;
