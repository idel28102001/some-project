export const makeList = (value: string | Array<string> | undefined) => {
  if (!value) return [];
  if (typeof value === "string") {
    return [Number(value)];
  }
  return value.map(Number);
};
