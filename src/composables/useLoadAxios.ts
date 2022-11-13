import { ref } from "vue";
import axios from "axios";

export default function <T>(
  link: () => string,
  config: () => {
    baseURL: string;
    params?: Record<string, Array<number> | number>;
  },
  callbackToTransform?: (value: T) => T
) {
  const data = ref(null as null | T);
  const loadStatus = {
    isLoading: ref(false),
    isLoadingFailed: ref(false),
    loadTimer: ref(0),
  };
  const doLoadData = () => {
    loadStatus.isLoading.value = true;
    loadStatus.isLoadingFailed.value = false;
    clearTimeout(loadStatus.loadTimer.value);
    loadStatus.loadTimer.value = setTimeout(() => {
      axios
        .get<T>(link(), config())
        .then((e) => {
          if (callbackToTransform) {
            (data.value as T | null) = callbackToTransform(e.data);
          } else {
            (data.value as T | null) = e.data;
          }
        })
        .catch(() => (loadStatus.isLoadingFailed.value = true))
        .then(() => (loadStatus.isLoading.value = false));
    }, 0);
  };
  return { doLoadData, loadStatus, data };
}
