import {
  apiHealthcheck,
  healthcheckController,
} from '@/controller/Healthcheck';
import express from 'express';
import asyncHander from 'express-async-handler';

const rootRouter = express.Router();

rootRouter.get('/', asyncHander(apiHealthcheck));

rootRouter.get('/healthcheck', asyncHander(healthcheckController));

export default rootRouter;
