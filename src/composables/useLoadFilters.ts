import { CheckboxType, CheckboxType2 } from "@/types/custom/checkbox-type";
import { reactive, ref } from "vue";
import {
  ApiCategories,
  ApiColors,
  ApiMaterials,
  ApiSeasons,
} from "@/types/api-types";
import axios from "axios";
import { API_BASIC_URL } from "@/others/basic-url";
import { CategoryType } from "@/types/basic/category-type";
import { ApiProductBody } from "@/types/basic/api-product-body";

export default function (filter: ApiProductBody) {
  const minPrice = ref(filter.minPrice);
  const maxPrice = ref(filter.maxPrice);
  const categoryId = ref(filter.categoryId);
  const materials = reactive<Array<CheckboxType2>>([]);
  const seasons = reactive<Array<CheckboxType2>>([]);
  const colors = reactive<Array<CheckboxType>>([]);
  const categories = reactive<Array<CategoryType>>([]);
  type newType<T> = T extends ApiMaterials | ApiSeasons
    ? CheckboxType2
    : CheckboxType;
  const loadForCheckboxes = <D extends ApiMaterials | ApiSeasons | ApiColors>(
    array: Array<newType<D>>,
    link: string,
    filtered: Array<number> = []
  ) => {
    axios.get<D>(link, { baseURL: API_BASIC_URL }).then((e) => {
      array.push(
        ...(e.data.items.map((e) => {
          return Object.assign(e, { checked: filtered.includes(e.id) });
        }) as Array<newType<D>>)
      );
    });
  };
  const loadCategories = () => {
    axios
      .get<ApiCategories>("api/productCategories", { baseURL: API_BASIC_URL })
      .then((e) => categories.push(...e.data.items));
  };
  loadCategories();
  loadForCheckboxes<ApiColors>(colors, "/api/colors", filter.colorIds);
  loadForCheckboxes<ApiSeasons>(seasons, "/api/seasons", filter.seasonIds);
  loadForCheckboxes<ApiMaterials>(
    materials,
    "/api/materials",
    filter.materialIds
  );
  return {
    minPrice,
    maxPrice,
    categoryId,
    seasons,
    colors,
    materials,
    categories,
  };
}
