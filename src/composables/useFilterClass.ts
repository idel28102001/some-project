import { makeList } from "@/helpers/make-list";
import { LocationQuery } from "vue-router";

export function useFilterClass(query?: LocationQuery) {
  return {
    categoryId: Number(query?.categoryId) || 0,
    minPrice: Number(query?.minPrice) || 0,
    maxPrice: Number(query?.maxPrice) || 0,
    page: Number(query?.page) || 1,
    limit: Number(query?.limit) || 12,
    colorIds: makeList(query?.colorIds as string) as Array<number>,
    seasonIds: makeList(query?.seasonIds as string) as Array<number>,
    materialIds: makeList(query?.materialIds as string) as Array<number>,
  };
}
