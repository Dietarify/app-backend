import logger from '@/service/log';
import express from 'express';
import { getAuth } from 'firebase-admin/auth';
import { FirebaseError } from 'firebase-admin';

export async function UserMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { authorization } = req.headers as { authorization: string };

  if (authorization) {
    const [type, token] = authorization.split(' ');

    if (type != 'Bearer') {
      logger.info(
        `UserMiddleware: request with type '${type}' instead of 'Bearer'`
      );
      res.status(401).json({
        status: 'failed',
        message: 'authentication failed',
        data: null,
      });
      return;
    }

    try {
      const userData = await getAuth().verifyIdToken(token, true);

      req.user = userData;
    } catch (err: any) {
      if ('code' in err) {
        const firebaseErr = err as FirebaseError;

        switch (firebaseErr.code) {
          case 'auth/internal-error':
          case 'auth/insufficient-permission':
          case 'auth/invalid-credential':
          case 'app/invalid-credential':
          case 'auth/invalid-argument':
            logger.error(
              `UserMiddleware: firebase auth error: ${firebaseErr.code} - ${firebaseErr.message}`
            );
            res.status(500).json({
              status: 'failed',
              message: 'internal server error',
              data: null,
            });
            return;
          case 'auth/too-many-requests':
            logger.error(
              `UserMiddleware: firebase auth too many request: ${firebaseErr.code} - ${firebaseErr.message}`
            );
            res.status(429).json({
              status: 'failed',
              message: 'too many request',
              data: null,
            });
            return;
        }

        logger.info(
          `UserMiddleware: token error: ${firebaseErr.code} - ${firebaseErr.message}`
        );
        res.status(401).json({
          status: 'failed',
          message: 'invalid token',
          data: null,
        });
        return;
      }

      logger.error(`UserMiddleware: unknown error detected: ${err}`);
      res.status(500).json({
        status: 'failed',
        message: 'internal server error',
        data: null,
      });
      return;
    }
  }

  next();
}
