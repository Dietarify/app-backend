import { InferType, object } from 'yup';
import { Pagination, Search } from './generic';

export const GetFoodQuerySchema = Pagination.concat(Search);
export type GetFoodQuery = InferType<typeof GetFoodQuerySchema>;
