import { Ref } from "vue";

export interface Status {
  isLoading: Ref<boolean>;
  isLoadingFailed: Ref<boolean>;
  loadTimer: Ref<number>;
}
