import type { CustomStore, State } from "@/types/store.type";
import type {
  RouteLocationNormalizedLoaded as Route,
  Router,
} from "vue-router";

declare module "@vue/runtime-core" {
  // Declare your own store states.

  export default interface ComponentCustomProperties {
    $store: CustomStore<State>;
    $router: Router;
    $route: Route;
  }
}
