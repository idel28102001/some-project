export default (value: number) => {
  return new Intl.NumberFormat().format(value);
};
