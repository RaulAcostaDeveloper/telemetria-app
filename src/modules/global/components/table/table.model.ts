interface column {
  columnName: string;
  defaultSpace: number;
  filterSelector?: boolean;
  minMaxFilter?: boolean;
  orderColumn?: boolean;
  showTotal?: boolean;
}

export type columnsTable = column[];

export type PrimitiveValue = string | number | null;

export type dataTable = Record<string, PrimitiveValue>[];

export type SelectorOrdered = {
  propIndex: number;
  value: boolean;
};

export type SelectorFilter = {
  propIndex: number;
  value: string;
};

export type MinMaxFilter = {
  propIndex: number;
  min: number;
  max: number;
};

export type MinMax = {
  min: number | null; //Null significa sin límite o no filtrar
  max: number | null;
};
