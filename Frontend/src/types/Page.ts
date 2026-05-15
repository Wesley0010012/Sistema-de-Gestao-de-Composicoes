export type Page<T = any> = {
  quantity: number;
  totalPages: number;
  actualPage: number;
  data: T;
};
