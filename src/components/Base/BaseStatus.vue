<template>
  <div>
    <div v-if="status.isLoading.value">Загрузка товара...</div>
    <div v-if="status.isLoadingFailed.value">
      Ошибка загрузки...
      <button @click.prevent="doOnLoad">Попробовать ещё раз</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Status } from "@/types/custom/status";

export default defineComponent({
  name: "BaseStatus",
  props: {
    status: { type: Object as PropType<Status>, required: true },
    doOnLoad: { type: Function as PropType<() => void>, required: true },
  },
});
</script>

<style scoped></style>
