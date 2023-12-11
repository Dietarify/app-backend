import axios from 'axios';
import logger from '@service/log';
import { GoogleAuth } from 'google-auth-library';

const ML_API_URL = process.env.ML_API_URL ?? 'localhost:8000';
const auth = new GoogleAuth();

const mlService = axios.create();

mlService.interceptors.request.use(
  async (config) => {
    logger.debug('setup request token');
    const client = await auth.getIdTokenClient(ML_API_URL);
    const token = await client.idTokenProvider.fetchIdToken(ML_API_URL);

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export async function healthCheck() {
  try {
    const url = ML_API_URL;
    logger.info(`checking ml api health: ${url}`);

    await mlService.get(url);
    return true;
  } catch (err) {
    logger.error(`failed to get healthcheck response: ${err}`);
    return false;
  }
}
