import express from 'express';
import asyncHander from 'express-async-handler';
import * as MLService from '@service/MLService';

const rootRouter = express.Router();

rootRouter.get(
  '/',
  asyncHander(async (_, res) => {
    res.json({
      status: 'success',
      message: 'server is running',
      data: null,
    });
  })
);

rootRouter.get(
  '/healthcheck',
  asyncHander(async (_, res) => {
    const result = await MLService.healthCheck();

    res.json({
      status: 'success',
      message: 'server is running',
      data: {
        ml: result,
        api: true,
      },
    });
  })
);

export default rootRouter;
