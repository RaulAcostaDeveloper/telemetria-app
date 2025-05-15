"use client";
import { useMemo } from "react";

import styles from "./tableFilters.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableFilter } from "../tableFilter/tableFilter";
import { columnsTable, dataTable } from "../table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  filteredData: dataTable;
  newSelectorFilter: (propIndex: number, value: string) => void;
}

const getAllUniqueFilterValues = (
  columns: columnsTable,
  filteredData: dataTable
): string[][] => {
  if (!filteredData.length) {
    return columns.map(() => []);
  }

  const dataKeys = Object.keys(filteredData[0]);

  return columns.map((col, index) => {
    if (!col.filterOptions) return [];

    const key = dataKeys[index];
    if (!key) return [];

    const uniqueValues = Array.from(
      new Set(filteredData.map((row) => row[key]))
    );

    return uniqueValues;
  });
};

export const TableFilters = ({
  columns,
  LANGUAGE,
  filteredData,
  newSelectorFilter,
}: Props) => {
  const uniqueFilterValues = useMemo(
    () => getAllUniqueFilterValues(columns, filteredData),
    [columns, filteredData]
  );

  return (
    <div className={styles.tableFilters}>
      {columns.map((col, index) => (
        <div
          key={col.columnName + index}
          style={{ width: `${(col.defaultSpace || 1) * 50}px` }}
        >
          {col.filterOptions && (
            <TableFilter
              LANGUAGE={LANGUAGE}
              columnName={col.columnName}
              newSelectorFilter={newSelectorFilter}
              options={uniqueFilterValues[index]}
              propIndex={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};
