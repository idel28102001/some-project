<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ title }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: { title: { type: String, required: true } },
  name: "BaseCheckboxDecorator",
});
</script>

<style scoped></style>
