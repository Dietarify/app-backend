import { InferType, number, object } from 'yup';

export const UpdateProfileRequestSchema = object({
  height: number().required(),
  currentWeight: number().required(),
  weightTarget: number().required(),
});

export type UpdateProfileRequest = InferType<typeof UpdateProfileRequestSchema>;
