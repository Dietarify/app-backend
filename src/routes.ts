import express from 'express';
import asyncHander from 'express-async-handler';
import logger from '@service/log';
import ResponseError from '@util/ResponseError';

const router = express.Router();

router.get(
  '/',
  asyncHander(async (_, res) => {
    res.json({
      status: 'success',
      message: 'ok',
      data: null,
    });
  })
);

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
