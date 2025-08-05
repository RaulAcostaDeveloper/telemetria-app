"use client";
import { useMemo } from "react";

import styles from "./tableFilters.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableFilter } from "../tableFilter/tableFilter";
import { TableMinMaxFilter } from "../tableMinMaxFilter/tableMinMaxFilter";
import { columnsTable, dataTable, PrimitiveValue } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
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
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  const uniqueFilterValues = useMemo(
    () => getAllUniqueFilterValues(columns, data),
    [columns, data]
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
      <div className={styles.tableFiltersTitle}>
        <h3>{LANGUAGE.table.formTitles.filters}</h3>
      </div>
      {columns.map((col, colIndex) => (
        <>
          {(col.filterSelector || col.minMaxFilter) && (
            <div
              key={colIndex}
              className={styles.filterContainer}
              title={`${LANGUAGE.table.actions.filterBy} "${columns[colIndex].columnName}"`}
            >
              <label className={styles.title}>
                {columns[colIndex].columnName}
              </label>
              {col.filterSelector && (
                <TableFilter
                  LANGUAGE={LANGUAGE}
                  columnName={columns[colIndex].columnName}
                  filterRenderIndex={colIndex}
                  handleSelectorFilter={handleSelectorFilter}
                  options={uniqueFilterValues[colIndex]}
                  propIndex={colIndex}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
              )}
              {col.minMaxFilter && <TableMinMaxFilter />}
            </div>
          )}
        </>
      ))}
    </div>
  );
};
