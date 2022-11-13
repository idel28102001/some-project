import { ColorType } from "@/types/basic/color-type";
import { SeasonsType } from "@/types/basic/seasons-type";
import { MaterialType } from "@/types/basic/material-type";

export interface ItemType {
  id: number;
  title: string;
  slug: string;
  price: number;
  colors: Array<ColorType>;
  seasons: Array<SeasonsType>;
  materials: Array<MaterialType>;
}
