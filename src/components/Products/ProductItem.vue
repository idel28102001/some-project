<template>
  <li class="catalog__item">
    <router-link
      :to="{
        name: 'product',
        params: { id: product.id },
        query: { colorId: color },
      }"
      class="catalog__pic"
    >
      <img
        v-if="photo.gallery"
        :alt="product.title"
        :src="photo.gallery[0].file.url"
      />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ prettyPrice }} ₽ </span>

    <BaseColors v-model="color" :colors="product.colors" />
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { ItemType } from "@/types/basic/item-type";
import BaseColors from "@/components/Base/BaseColors.vue";
import { ColorType } from "@/types/basic/color-type";
import formatNumber from "@/helpers/formatNumber";

export default defineComponent({
  setup(props) {
    const currentColor = ref(props.product.colors[0].id);
    const photo = ref(
      props.product.colors.find((e) => e.id === currentColor.value) as ColorType
    );
    const prettyPrice = formatNumber(props.product.price);
    const color = computed({
      get: () => currentColor.value,
      set: (value: number) => {
        photo.value = props.product.colors.find(
          (e) => e.id === value
        ) as ColorType;
        currentColor.value = Number(value);
      },
    });
    return { color, photo, prettyPrice };
  },
  props: { product: { required: true, type: Object as PropType<ItemType> } },
  components: { BaseColors },
  name: "ProductItem",
});
</script>

<style scoped></style>
