import { number, object, string } from 'yup';

export const Pagination = object({
  limit: number().default(10),
  page: number().default(1),
});

export const Search = object({
  query: string().optional(),
});
