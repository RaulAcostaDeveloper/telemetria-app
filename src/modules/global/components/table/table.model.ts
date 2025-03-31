interface column {
  columnName: string;
  defaultSpace: number;
  orderColumn?: boolean;
  filterOptions?: boolean;
  showTotal?: boolean;
}
export type columnsTable = column[];

export type dataTable = Record<string, string>[];
