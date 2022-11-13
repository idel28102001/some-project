import { GalleryItemType } from "@/types/basic/gallery-type";
import { BaseType } from "@/types/basic/base-type";

export type ColorCodeType = BaseType;

export interface ColorType {
  id: number;
  color: ColorCodeType;
  gallery: Array<GalleryItemType>;
}
