import { CheckboxType, CheckboxType2 } from "@/types/custom/checkbox-type";

export default function <T extends CheckboxType2 | CheckboxType>(
  modelValue: Array<T>,
  emit: (event: string, ...args: Array<Array<T>>) => void
) {
  const changeArray = (event: { target: HTMLInputElement }) => {
    const value = modelValue.find(
      (e) => e.id.toString() === event.target.value
    );
    if (value) {
      value.checked = event.target.checked;
      emit("update:modelValue", modelValue);
    }
  };
  return { changeArray };
}
