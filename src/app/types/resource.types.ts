export interface Dependencies {
  item: string;
  quantity: number;
}

export interface Item {
  key: string;
  name: string;
  type: string;
  power?: number;
  heat?: number;
  pressure?: number;
  biomass?: number;
  oxygen?: number;
  dependencies: Dependencies[];
}
