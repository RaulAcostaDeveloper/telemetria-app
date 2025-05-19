interface column {
  columnName: string;
  defaultSpace: number;
  filterSelector?: boolean;
  orderColumn?: boolean;
  showTotal?: boolean;
}

export type columnsTable = column[];

export type dataTable = Record<string, string>[];
