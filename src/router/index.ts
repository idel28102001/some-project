import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import ProductPage from "@/pages/ProductPage.vue";

const routes: Array<RouteRecordRaw> = [
  { name: "main", component: MainPage, path: "/" },
  { name: "product", component: ProductPage, path: "/product/:id" },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
