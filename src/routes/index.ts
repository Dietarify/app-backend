import express from 'express';
import asyncHander from 'express-async-handler';
import logger from '@service/log';
import ResponseError from '@util/ResponseError';
import { UserMiddleware } from '@middleware/UserMiddleware';
import rootRouter from './root';
import userRouter from './users';
import { ValidationError } from 'yup';

const router = express.Router();

router.use(asyncHander(UserMiddleware));
router.use(rootRouter);
router.use('/profile', userRouter);

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

    if (err instanceof ValidationError) {
      logger.warn(err.message);

      res.status(400).json({
        status: 'failed',
        message: 'invalid payload',
        data: err.errors,
      });
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
