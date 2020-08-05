export const getQuery = (limit: number, page: number): string =>
  `limit=${limit}&offset=${page ? page * limit : 0}`;

export const getFilterQuery = (page: number, limit: number, order: string, sortBy: string): string =>
  `page=${page}&limit=${limit}&order=${order}$sortBy=${sortBy}`;