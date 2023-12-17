import { InferType, date, number, object } from 'yup';

export const AddDietSchema = object({
  foodId: number().required(),
  foodItemWeight: number().required(),
});

export type AddDiet = InferType<typeof AddDietSchema>;
