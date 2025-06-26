"use client";
import { useMemo } from "react";

import styles from "./tableFilters.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableFilter } from "../tableFilter/tableFilter";
import { columnsTable, dataTable, PrimitiveValue } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  handleSelectorFilter: (propIndex: number, value: string) => void;
}

const getAllUniqueFilterValues = (
  columns: columnsTable,
  data: dataTable
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
  handleSelectorFilter,
}: Props) => {
  const uniqueFilterValues = useMemo(
    () => getAllUniqueFilterValues(columns, data),
    [columns, data]
  );

  return (
    <div className={styles.tableFilters}>
      {columns.map((col, index) => (
        <div key={index}>
          {col.filterSelector && (
            <TableFilter
              LANGUAGE={LANGUAGE}
              columnName={col.columnName}
              handleSelectorFilter={handleSelectorFilter}
              options={uniqueFilterValues[index]}
              propIndex={index}
            />
          )}
        </div>
      ))}
    </div>
  );
};
