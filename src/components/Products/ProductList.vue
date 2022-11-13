<template>
  <ul v-if="products" class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ItemType } from "@/types/basic/item-type";
import ProductItem from "@/components/Products/ProductItem.vue";

export default defineComponent({
  props: {
    products: { required: true, type: Object as PropType<Array<ItemType>> },
  },
  components: { ProductItem },
  name: "ProductList",
});
</script>

<style scoped></style>
