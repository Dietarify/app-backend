import express from 'express';
import * as MLService from '@service/MLService';
import * as DBService from '@service/DBService';

export async function healthcheckController(
  req: express.Request,
  res: express.Response
) {
  if (process.env.ENABLE_HEALTH_CHECK !== 'true') {
    res.json({
      status: 'success',
      message: 'server is running',
      data: {
        api: true,
      },
    });
    return;
  }

  const result = await MLService.healthCheck();
  const dbResult = await DBService.healthCheck();

  res.json({
    status: 'success',
    message: 'server is running',
    data: {
      db: dbResult,
      ml: result,
      api: true,
    },
  });
}

export async function apiHealthcheck(
  req: express.Request,
  res: express.Response
) {
  res.json({
    status: 'success',
    message: 'server is running',
    data: null,
  });
}
