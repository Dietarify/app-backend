import express from 'express';
import asyncHander from 'express-async-handler';
import logger from '@service/log';
import ResponseError from '@util/ResponseError';
import { getUserDetails } from '@controller/UserTest';
import { UserMiddleware } from './middleware/UserMiddleware';
import { healthCheck } from './service/MLService';

const router = express.Router();

router.use(asyncHander(UserMiddleware));

router.get(
  '/',
  asyncHander(async (_, res) => {
    res.json({
      status: 'success',
      message: 'server is running',
      data: null,
    });
  })
);

router.get(
  '/healthz',
  asyncHander(async (_, res) => {
    const result = await healthCheck();

    res.json({
      status: 'success',
      message: 'server is running',
      data: {
        'ml-service': result,
        api: true,
      },
    });
  })
);

router.get('/users', asyncHander(getUserDetails));

// Error Handler
router.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (err instanceof ResponseError) {
      logger.warn(err.message);
      const [status, data] = err.getResponse();

      res.status(status).json(data);
      return;
    }

    logger.error(err.stack);
    res.status(500).json({
      status: 'failed',
      message: 'internal server error',
      data: null,
    });
  }
);

// Not Found handler
router.use((_, res) => {
  res.json({
    status: 'failed',
    message: 'not found',
    data: null,
  });
});

export default router;
