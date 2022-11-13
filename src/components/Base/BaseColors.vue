<template>
  <ul class="colors colors--black">
    <li v-for="item in colors" :key="item.id" class="colors__item">
      <label class="colors__label">
        <input
          v-model="colorId"
          :name="'color-' + item.id"
          :value="item.id"
          class="colors__radio sr-only"
          type="radio"
        />
        <span
          :style="{ 'background-color': item.color.code }"
          class="colors__value"
        >
        </span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ColorType } from "@/types/basic/color-type";

export default defineComponent({
  setup(props, { emit }) {
    const colorId = computed({
      get: () => props.modelValue,
      set: (value: number) => {
        emit("update:modelValue", value);
      },
    });
    return { colorId };
  },
  props: {
    colors: { type: Object as PropType<Array<ColorType>>, required: true },
    modelValue: { type: Number, required: true },
  },
  name: "BaseColors",
});
</script>

<style scoped></style>
