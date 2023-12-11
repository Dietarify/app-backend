import axios from 'axios';
import logger from './log';

const ML_API_URL = process.env.ML_API_URL ?? 'localhost:8000';

export async function healthCheck() {
  const url = ML_API_URL;
  logger.info(`checking ml api health: ${url}`);

  await axios.get(url);
  return true;
}
