<template>
  <aside class="filter">
    <form
      action="#"
      class="filter__form form"
      method="get"
      @submit.prevent="doUpdateFilter"
    >
      <BaseCheckboxDecorator title="Цена">
        <label class="form__label form__label--price">
          <input
            v-model.number="minPrice"
            class="form__input"
            name="minPrice"
            type="text"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            v-model.number="maxPrice"
            class="form__input"
            name="maxPrice"
            type="text"
          />
          <span class="form__value">До</span>
        </label>
      </BaseCheckboxDecorator>
      <BaseCheckboxDecorator title="Категория">
        <label class="form__label form__label--select">
          <select v-model="categoryId" class="form__select" name="category">
            <option value="0">Все категории</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :selected="categoryId === category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </BaseCheckboxDecorator>

      <BaseCheckboxDecorator title="Цвет">
        <BaseCheckBox v-if="colors" v-model="colors" name="colorIds" />
      </BaseCheckboxDecorator>

      <BaseCheckboxDecorator title="Материал">
        <BaseCheckBox2 v-model="materials" name="materialIds" />
      </BaseCheckboxDecorator>

      <BaseCheckboxDecorator title="Коллекция">
        <BaseCheckBox2 v-model="seasons" name="seasonIds" />
      </BaseCheckboxDecorator>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click.prevent="doResetFilter"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseCheckBox from "@/components/Base/BaseCheckBox.vue";
import BaseCheckBox2 from "@/components/Base/BaseCheckBox2.vue";
import BaseCheckboxDecorator from "@/components/Base/Decorators/BaseCheckboxDecorator.vue";
import useLoadFilters from "@/composables/useLoadFilters";
import { ApiProductBody } from "@/types/basic/api-product-body";
import { useFilterClass } from "@/composables/useFilterClass";

export default defineComponent({
  props: {
    modelValue: { required: true, type: Object as PropType<ApiProductBody> },
  },
  setup(
    props,
    { emit }: { emit: (event: string, arg: ApiProductBody) => void }
  ) {
    const {
      colors,
      seasons,
      materials,
      categories,
      categoryId,
      minPrice,
      maxPrice,
    } = useLoadFilters(props.modelValue);
    const doUpdateFilter = () => {
      emit(
        "update:modelValue",
        Object.assign(props.modelValue, {
          categoryId: categoryId.value,
          limit: 12,
          minPrice: minPrice.value,
          maxPrice: maxPrice.value,
          page: 1,
          colorIds: colors.filter((e) => e.checked).map((e) => e.id),
          materialIds: materials.filter((e) => e.checked).map((e) => e.id),
          seasonIds: seasons.filter((e) => e.checked).map((e) => e.id),
        })
      );
    };
    const doResetFilter = () => {
      emit(
        "update:modelValue",
        Object.assign(props.modelValue, useFilterClass())
      );
    };
    return {
      colors,
      materials,
      seasons,
      categories,
      doResetFilter,
      doUpdateFilter,
      categoryId,
      minPrice,
      maxPrice,
    };
  },
  components: { BaseCheckBox, BaseCheckBox2, BaseCheckboxDecorator },
  name: "ProductFilter",
});
</script>

<style scoped></style>
