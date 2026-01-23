"use client";
import { useMemo } from "react";

import styles from "./tableFilters.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TableFilter } from "../tableFilter/tableFilter";
import { TableMinMaxFilter } from "../tableMinMaxFilter/tableMinMaxFilter";
import {
  columnsTable,
  dataTable,
  MinMaxFilter,
  PrimitiveValue,
  SelectorFilter,
} from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  filterSelectors: SelectorFilter[];
  handleMinMaxFilter: ({ colIndex, min, max }: MinMaxFilter) => void;
  handleSelectorFilter: ({ colIndex, value }: SelectorFilter) => void;
  minMaxFilters: MinMaxFilter[];
}

const getAllUniqueFilterValues = (
  columns: columnsTable,
  data: dataTable,
): PrimitiveValue[][] => {
  if (!data.length) {
    return columns.map(() => []);
  }

  const dataKeys = Object.keys(data[0]);

  return columns.map((col, index) => {
    if (!col.filterSelector) return [];

    const key = dataKeys[index];
    if (!key) return [];

    const uniqueValues = Array.from(new Set(data.map((row) => row[key])));

    return uniqueValues;
  });
};

export const TableFilters = ({
  LANGUAGE,
  columns,
  data,
  filterSelectors,
  handleMinMaxFilter,
  handleSelectorFilter,
  minMaxFilters,
}: Props) => {
  const uniqueFilterValues = useMemo(
    () => getAllUniqueFilterValues(columns, data),
    [columns, data],
  );

  // Índices de columnas que tienen filtro
  // const filteredColumnIndexes = useMemo(
  //   () =>
  //     columns
  //       .map((col, i) => (col.filterSelector ? i : null))
  //       .filter((i): i is number => i !== null),
  //   [columns]
  // );

  return (
    <div className={styles.tableFilters}>
      <div className={styles.tableFiltersBody}>
        {columns.map((col, colIndex) => (
          <div key={colIndex}>
            {(col.filterSelector || col.minMaxFilter) && (
              <div
                className={styles.filterContainer}
                title={`${LANGUAGE.table.actions.filterBy} "${columns[colIndex].columnName}"`}
              >
                <label className={styles.title}>
                  {columns[colIndex].columnName}
                </label>
                {col.filterSelector && (
                  <TableFilter
                    LANGUAGE={LANGUAGE}
                    colIndex={colIndex}
                    columnName={columns[colIndex].columnName}
                    filterSelectors={filterSelectors}
                    handleSelectorFilter={handleSelectorFilter}
                    options={uniqueFilterValues[colIndex]}
                  />
                )}
                {col.minMaxFilter && (
                  <TableMinMaxFilter
                    LANGUAGE={LANGUAGE}
                    colIndex={colIndex}
                    handleMinMaxFilter={handleMinMaxFilter}
                    minMaxFilters={minMaxFilters}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
