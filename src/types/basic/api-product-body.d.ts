export interface ApiProductBody {
  categoryId: number;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
  colorIds: Array<number>;
  seasonIds: Array<number>;
  materialIds: Array<number>;
}
