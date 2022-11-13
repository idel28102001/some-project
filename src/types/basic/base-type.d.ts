export interface BaseType {
  id: number;
  title: string;
  code: string;
}

export interface ApiBase<T> {
  items: Array<T>;
}
