interface column {
  columnName: string;
  defaultSpace: number;
  filterSelector?: boolean;
  minMaxFilter?: boolean;
  orderColumn?: boolean;
  showTotal?: boolean;
  showView?: boolean;
}

export type columnsTable = column[];

export type PrimitiveValue = string | number | null;

export type dataTable = Record<string, PrimitiveValue>[];

export type SelectorOrdered = {
  colIndex: number;
  value: boolean;
};

export type SelectorFilter = {
  colIndex: number;
  value: string;
};

export type MinMaxFilter = {
  colIndex: number;
  min: number | undefined; // undefined significa sin límite o no filtrar
  max: number | undefined;
};
