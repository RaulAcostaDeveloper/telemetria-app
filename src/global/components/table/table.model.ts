interface column {
  columnName: string;
  defaultSpace: number;
  filterSelector?: boolean;
  minMaxFilter?: boolean;
  textFilter?: boolean; // aún no implementado pero mapeado para mostrar el botón
  orderColumn?: boolean;
  showTotal?: boolean;
}

export type columnsTable = column[];

export type PrimitiveValue = string | number | boolean | null | undefined;

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

export enum MODAL_OPTION {
  VEHICLES = "vehicles",
  GROUPS = "groups",
  ZONE = "zone",
  ZONELOAD = "zone-load",
  ZONEUNLOAD = "zone-unload",
  USER = "user",
}
