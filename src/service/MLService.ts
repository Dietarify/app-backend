import axios from 'axios';
import logger from '@service/log';
import { GoogleAuth } from 'google-auth-library';
import prisma from './DBService';
import { Gender } from '@prisma/client';

const ML_API_URL = process.env.ML_API_URL ?? 'http://localhost:8000';
const auth = new GoogleAuth();

const mlService = axios.create({
  baseURL: ML_API_URL,
});

mlService.interceptors.request.use(
  async (config) => {
    try {
      logger.debug('setup request token');
      const client = await auth.getIdTokenClient(ML_API_URL);
      const token = await client.idTokenProvider.fetchIdToken(ML_API_URL);

      config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      logger.error(`request token failed: ${err}`);
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export async function healthCheck() {
  try {
    logger.info(`checking ml api health: ${ML_API_URL}`);

    await mlService.get('/');
    return true;
  } catch (err) {
    logger.error(`failed to get healthcheck response: ${err}`);
    return false;
  }
}

export async function getFoodRecomendation(userid: string) {
  const result = await mlService.post('/models/food-recomendation');
  const recomendationId = result.data.data;

  const foodResult = await prisma.foods.findMany({
    where: {
      id: {
        in: recomendationId,
      },
    },
  });

  const breakfast = foodResult.filter((el) => el.id == recomendationId[0])[0];
  const lunch = foodResult.filter((el) => el.id == recomendationId[1])[0];
  const dinner = foodResult.filter((el) => el.id == recomendationId[2])[0];

  return {
    breakfast,
    lunch,
    dinner,
  };
}

// TODO: use the correct calculation
export async function calculateCaloriesNeeds(
  height: number,
  weight: number,
  gender: Gender
): Promise<number> {
  if (gender == Gender.Female) {
    return 2100;
  }

  return 2500;
}

export async function calculateBMI(
  weight: number,
  height: number
): Promise<number> {
  const mHeight = height / 100;
  const result = weight / (mHeight * mHeight);

  return result;
}
