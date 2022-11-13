<template>
  <ul class="check-list">
    <li v-for="item in modelValue" :key="item.id" class="check-list__item">
      <label class="check-list__label">
        <input
          :checked="item.checked"
          :name="name"
          :value="item.id"
          class="check-list__check sr-only"
          type="checkbox"
          @change="changeArray"
        />
        <span class="check-list__desc">
          {{ item.title }}
          <span v-if="item.productsCount">({{ item.productsCount }})</span>
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
  name: "BaseCheckBox2",
});
</script>

<style scoped></style>
