import { InferType, number, object, string } from 'yup';

export const GetFoodQuerySchema = object({
  query: string().optional(),
  limit: number().default(10),
  page: number().default(1),
});

export type GetFoodQuery = InferType<typeof GetFoodQuerySchema>;
