import { InferType, date, number, object, string } from 'yup';

export const UpdateProfileRequestSchema = object({
  height: number().optional(),
  currentWeight: number().optional(),
  weightTarget: number().optional(),
  gender: string().oneOf(['Male', 'Female']).optional(),
  birthDate: date().optional(),
  nickname: string().optional(),
  dateTarget: date().optional(),
});

export type UpdateProfileRequest = InferType<typeof UpdateProfileRequestSchema>;
