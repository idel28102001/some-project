<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">Каталог</h1>
        <span v-if="products" class="content__info">
          {{ products.pagination.total }} товара
        </span>
      </div>
    </div>
    <div class="content__catalog">
      <ProductFilter v-model="filter" />

      <section class="catalog">
        <BaseStatus :do-on-load="loadProducts" :status="loadStatus" />
        <!--        <div v-if="loadStatus.isLoading.value">Загрузка товара...</div>-->
        <!--        <div v-if="loadStatus.isLoadingFailed.value">-->
        <!--          Ошибка загрузки...-->
        <!--          <button @click.prevent="loadProducts">Попробовать ещё раз</button>-->
        <!--        </div>-->
        <ProductList v-if="products" :products="products.items" />

        <BasePagination
          v-if="products"
          v-model:page="filter.page"
          :pages="products.pagination.pages"
        />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch } from "vue";
import ProductList from "@/components/Products/ProductList.vue";
import { API_BASIC_URL } from "@/others/basic-url";
import ProductFilter from "@/components/Products/ProductFilter.vue";
import { useRoute, useRouter } from "vue-router";
import { useFilterClass } from "@/composables/useFilterClass";
import BasePagination from "@/components/Base/BasePagination.vue";
import useLoadAxios from "@/composables/useLoadAxios";
import { ApiProducts } from "@/types/api-types";
import BaseStatus from "@/components/Base/BaseStatus.vue";

export default defineComponent({
  components: { ProductFilter, ProductList, BasePagination, BaseStatus },
  setup() {
    const route = useRoute();
    const filter = reactive(useFilterClass(route.query));
    const router = useRouter();
    const {
      loadStatus,
      doLoadData: loadProducts,
      data: products,
    } = useLoadAxios<ApiProducts>(
      () => "api/products",
      () => ({
        baseURL: API_BASIC_URL,
        params: {
          categoryId: filter.categoryId,
          page: filter.page,
          limit: filter.limit,
          colorIds: filter.colorIds,
          materialIds: filter.materialIds,
          seasonIds: filter.seasonIds,
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
        },
      })
    );
    onBeforeMount(() => loadProducts());
    watch(
      () => route.query,
      () => {
        Object.assign(filter, useFilterClass(route.query));
      }
    );
    watch(filter, (value) => {
      router.push({ query: value });
      loadProducts();
    });
    return { products, filter, loadStatus, loadProducts };
  },
  name: "MainPage",
});
</script>

<style scoped></style>
