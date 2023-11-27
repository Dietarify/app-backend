import express from 'express';

// Dummy endpoint for testing
export async function getUserDetails(
  req: express.Request,
  res: express.Response
) {
  res.json({
    data: req.user,
    status: 'success',
    message: 'ok',
  });
}
