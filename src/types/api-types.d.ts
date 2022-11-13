import { Pagination } from "@/types/basic/pagination";
import { ItemType } from "@/types/basic/item-type";
import { MaterialType } from "@/types/basic/material-type";
import { CategoryType } from "@/types/basic/category-type";
import { SeasonsType } from "@/types/basic/seasons-type";
import { ApiBase } from "@/types/basic/base-type";
import { ColorCodeType } from "@/types/basic/color-type";
import { SizeType } from "@/types/basic/size-type";

export interface ApiProducts extends ApiBase<ItemType> {
  pagination: Pagination;
}

export type ApiMaterials = ApiBase<MaterialType>;
export type ApiCategories = ApiBase<CategoryType>;
export type ApiSeasons = ApiBase<SeasonsType>;
export type ApiColors = ApiBase<ColorCodeType>;

export interface ApiItem extends ItemType {
  category: CategoryType;
  sizes: Array<SizeType>;
  content: string;
}
