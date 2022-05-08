export interface Dependencies {
  item: string;
  quantity: number;
}

export interface Item {
  name: string;
  type: string;
  dependencies: Dependencies[];
}
