<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        class="pagination__link pagination__link--arrow"
        @click.prevent="paginate(page - 1, page > 1)"
      >
        <svg fill="currentColor" height="14" width="8">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li v-for="link in pages" :key="link" class="pagination__item">
      <a
        :class="{ 'pagination__link--current': link === page }"
        class="pagination__link"
        href="#"
        @click.prevent="paginate(link, true)"
      >
        {{ link }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        :class="{ 'pagination__link--disabled': page === pages }"
        aria-label="Следующая страница"
        class="pagination__link pagination__link--arrow"
        @click.prevent="paginate(page + 1, page < pages)"
      >
        <svg fill="currentColor" height="14" width="8">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const paginate = (page: number, condition: boolean) => {
      if (!condition) return;
      emit("update:page", page);
    };
    return { paginate };
  },
  name: "BasePagination",
  props: {
    pages: { type: Number, required: true },
    page: { type: Number, required: true },
  },
});
</script>

<style scoped></style>
