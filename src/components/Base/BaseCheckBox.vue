<template>
  <ul class="colors colors--black">
    <li v-for="color in modelValue" :key="color.id" class="colors__item">
      <label class="colors__label">
        <input
          :checked="color.checked"
          :name="name"
          :value="color.id"
          class="colors__radio sr-only"
          type="checkbox"
          @change="changeArray"
        />
        <span :style="{ 'background-color': color.code }" class="colors__value">
        </span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import checkboxMixin from "@/mixins/checkbox.mixin";
import useCheckbox from "@/composables/useCheckbox";

export default defineComponent({
  setup(props, { emit }) {
    const { changeArray } = useCheckbox(props.modelValue, emit);
    return { changeArray };
  },
  mixins: [checkboxMixin],
  name: "BaseCheckBox",
});
</script>

<style scoped></style>
