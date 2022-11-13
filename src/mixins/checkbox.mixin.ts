import { defineComponent, PropType } from "vue";
import { CheckboxType, CheckboxType2 } from "@/types/custom/checkbox-type";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<Array<CheckboxType | CheckboxType2>>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
