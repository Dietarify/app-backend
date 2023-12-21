import axios from 'axios';
import logger from '@service/log';
import { GoogleAuth } from 'google-auth-library';
import prisma from './DBService';
import { Gender } from '@prisma/client';
import ResponseError from '@/util/ResponseError';

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

export async function getFoodRecomendation(userId: string) {
  const userInfo = await prisma.profile.findFirst({
    where: { userId },
  });

  if (!userInfo) {
    throw new ResponseError(404, 'user not found');
  }

  if (
    !userInfo.gender ||
    !userInfo.height ||
    !userInfo.currentWeight ||
    !userInfo.birthDate
  ) {
    throw new ResponseError(404, 'user is not initialized');
  }

  const bmr = calculateBMR(
    userInfo.currentWeight,
    userInfo.height,
    userInfo.birthDate,
    userInfo.gender
  );
  const caloriesNeed = calculateCaloriesNeeds(bmr);
  const age = calculateAge(userInfo.birthDate);
  const sex = userInfo.gender == Gender.Male ? 'Male' : 'Female';

  const result = await mlService.post('/models/food-recomendation', {
    caloriesNeed,
    age,
    sex,
  });
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

// Asumsi: Bergerak cukup aktif
export function calculateCaloriesNeeds(bmr: number): number {
  return bmr * 1.55;
}

export function calculateBMI(weight: number, height: number): number {
  const mHeight = height / 100;
  const result = weight / (mHeight * mHeight);

  return result;
}

export function calculateBMR(
  weight: number,
  height: number,
  birthday: Date,
  gender: Gender
) {
  const age = calculateAge(birthday);

  if (gender == Gender.Female) {
    return 655.42 + 9.65 * weight + 1.85 * height - 4.68 * age;
  }

  return 66.42 + 13.75 * weight + 5 * height - 6.7 * age;
}

function calculateAge(birthdate: Date): number {
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthdate.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}
