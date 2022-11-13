<template>
  <BaseStatus :do-on-load="loadItem" :status="loadStatus" />
  <main v-if="product" class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link
            :to="{ name: 'main', query: { categoryId: product.category.id } }"
            class="breadcrumbs__link"
          >
            {{ product.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div v-if="currColor" class="item__pics pics">
        <div class="pics__wrapper">
          <img
            :alt="product.title"
            :src="currColor.gallery[currPhoto].file.url"
            height="570"
            width="570"
          />
        </div>
        <ul class="pics__list">
          <li
            v-for="(photo, idx) in currColor.gallery"
            :key="idx"
            class="pics__item"
          >
            <a
              :class="{ 'pics__link--current': idx === currPhoto }"
              class="pics__link"
              href=""
              @click.prevent="currPhoto = idx"
            >
              <img
                :alt="product.title"
                :src="photo.file.url"
                height="98"
                width="98"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form
            action="#"
            class="form"
            method="POST"
            @submit.prevent="doSendToCart"
          >
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button
                  aria-label="Убрать один товар"
                  type="button"
                  @click.prevent="doChangeCount(false)"
                >
                  <svg fill="currentColor" height="12" width="12">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input v-model.number="currCount" name="count" type="text" />

                <button
                  aria-label="Добавить один товар"
                  type="button"
                  @click.prevent="doChangeCount(true)"
                >
                  <svg fill="currentColor" height="12" width="12">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price"> {{ product.prettyPrice }} ₽ </b>
            </div>

            <div class="item__row">
              <BaseCheckboxDecorator title="Цвет">
                <BaseColors v-model="color" :colors="product.colors" />
              </BaseCheckboxDecorator>

              <BaseCheckboxDecorator title="Размер">
                <label
                  class="form__label form__label--small form__label--select"
                >
                  <select
                    v-model="currSize"
                    class="form__select"
                    name="category"
                  >
                    <option
                      v-for="size in product.sizes"
                      :key="size.id"
                      :value="size.id"
                    >
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </BaseCheckboxDecorator>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li
            v-for="(info, idx) in ['Информация о товаре', 'Доставка и возврат']"
            :key="idx"
            class="tabs__item"
          >
            <a
              :class="{ 'tabs__link--current': currentInfo === idx }"
              class="tabs__link"
              @click.prevent="currentInfo = idx"
            >
              {{ info }}
            </a>
          </li>
        </ul>

        <ProductInfo :number="currentInfo" />
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { API_BASIC_URL } from "@/others/basic-url";
import useLoadAxios from "@/composables/useLoadAxios";
import { ApiItem } from "@/types/api-types";
import BaseStatus from "@/components/Base/BaseStatus.vue";
import { PrettyPrice } from "@/types/custom/pretty-price";
import formatNumber from "@/helpers/formatNumber";
import BaseCheckboxDecorator from "@/components/Base/Decorators/BaseCheckboxDecorator.vue";
import BaseColors from "@/components/Base/BaseColors.vue";
import { ColorType } from "@/types/basic/color-type";
import ProductInfo from "@/components/Products/ProductInfo.vue";

export default defineComponent({
  components: { BaseStatus, BaseCheckboxDecorator, BaseColors, ProductInfo },
  setup() {
    const currentInfo = ref(0);
    const count = ref(1 as string | number);
    const currCount = computed({
      get: () => count.value,
      set: (value: string | number) => {
        count.value = value;
      },
    });
    const doChangeCount = (isIncrement = true) => {
      if (isIncrement) {
        currCount.value = Number(currCount.value) + 1;
      } else {
        if (count.value > 1) {
          currCount.value = Number(currCount.value) - 1;
        }
      }
    };
    const currColor = ref(null as null | ColorType);
    const currSize = ref(0);
    const currPhoto = ref(0);
    const route = useRoute();
    const router = useRouter();
    const {
      loadStatus,
      doLoadData: loadItem,
      data: product,
    } = useLoadAxios<ApiItem & PrettyPrice>(
      () => `api/products/${route.params.id}`,
      () => ({
        baseURL: API_BASIC_URL,
      }),
      (value) =>
        Object.assign(value, { prettyPrice: formatNumber(value.price) })
    );
    const color = computed({
      get: () => {
        if (currColor.value) {
          return currColor.value.id;
        } else {
          return 0;
        }
      },
      set: (value: number) => {
        if (product.value && currColor.value) {
          const color = product.value.colors.find((e) => e.id === value);
          if (color) {
            router.push({ query: { colorId: color.id } });
            currColor.value = color;
          }
        }
      },
    });
    const doChangeColor = (colorId: number, currValue = product.value) => {
      if (currValue?.colors) {
        const current = Number(route.query.colorId || 0);
        currColor.value =
          currValue.colors.find((e) => e.id === current) || currValue.colors[0];
      }
    };
    watch(product, (currValue) => {
      if (currValue?.sizes) {
        currSize.value = currValue.sizes[0].id;
      }
      doChangeColor(Number(route.query.colorId || 0), currValue);
    });
    watch(
      () => route.params.id,
      () => {
        loadItem();
      }
    );
    watch(
      () => route.query.colorId,
      (value) => {
        doChangeColor(Number(value));
      }
    );
    const doSendToCart = () => {
      if (product.value && currColor.value) {
        console.log({
          productId: product.value.id,
          colorId: currColor.value.color.id,
          sizeId: currSize.value,
          quantity: currCount.value,
        });
      }
    };
    onBeforeMount(() => loadItem());
    return {
      doSendToCart,
      product,
      loadStatus,
      loadItem,
      color,
      currColor,
      currCount,
      doChangeCount,
      currPhoto,
      currentInfo,
      currSize,
    };
  },
  name: "ProductPage",
});
</script>

<style scoped></style>
