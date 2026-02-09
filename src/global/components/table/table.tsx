"use client";
import { useEffect, useState } from "react";

import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableServerContent } from "./tableServerContent/tableServerContent";
import {
  MODAL_OPTION,
  MinMaxFilter,
  SelectorFilter,
  SelectorOrdered,
  columnsTable,
  dataTable,
} from "./table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  deleteFunction?: (idElement: string | number) => void;
  idImei?: string;
  idKey?: string;
  modalOption?: MODAL_OPTION;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoGenericReport?: boolean;
  showGoPageView?: boolean;
  showViewModal?: boolean;
  title?: string;
  viewPath?: string;
  windowMaxSize?: number;
}

export const Table = ({
  LANGUAGE,
  columns,
  data,
  deleteFunction,
  idImei,
  idKey,
  modalOption,
  showCreateButton,
  showDelete,
  showEdit,
  showGoGenericReport,
  showGoPageView,
  showViewModal,
  title,
  viewPath,
  windowMaxSize,
}: Props) => {
  const [columnOrdered, setColumnOrdered] = useState<SelectorOrdered>({
    colIndex: 0,
    value: false,
  });
  const [filterSelectors, setFilterSelectors] = useState<SelectorFilter[]>([]);
  const [minMaxFilters, setMinMaxFilters] = useState<MinMaxFilter[]>([]);

  const [filteredData, setFilteredData] = useState<dataTable>(data);
  const [inputFilterValue, setInputFilterValue] = useState<string>("");
  const [minHeight, setMinHeight] = useState(0);
  const [tableHasFilters, setTableHasFilters] = useState<boolean>(false);

  useEffect(() => {
    initFilters();
  }, []);

  useEffect(() => {
    // Actualizar esto por si se añaden más filtros
    const hasFilters = columns.some(
      (column) =>
        column.filterSelector === true ||
        column.minMaxFilter === true ||
        column.textFilter === true,
    );
    setTableHasFilters(hasFilters);
  }, [columns]);

  // Ordenamiento ascendente y descendente
  useEffect(() => {
    if (filteredData.length === 0) return;

    const columnKey = Object.keys(filteredData[0])[columnOrdered.colIndex];
    if (!columnKey) return;

    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[columnKey];
      const valB = b[columnKey];

      const numA = Number(valA);
      const numB = Number(valB);

      const bothAreNumbers = !isNaN(numA) && !isNaN(numB);

      let result: number;

      if (bothAreNumbers) {
        result = numB - numA;
      } else {
        const strA = (valA ?? "").toString();
        const strB = (valB ?? "").toString();
        result = strA.localeCompare(strB, undefined, { sensitivity: "base" });
      }

      return columnOrdered.value ? result : -result;
    });

    setFilteredData(sorted);
  }, [columnOrdered]);

  // Filtros
  useEffect(() => {
    const applyFilters = () => {
      let result = data;

      // Filtro de texto (por la primera columna)
      if (inputFilterValue.trim() !== "") {
        result = result.filter((item) => {
          const filterText = inputFilterValue.toLowerCase().trim();

          return Object.values(item).some((value) => {
            const strValue = value?.toString().toLowerCase() ?? "";
            return strValue.includes(filterText);
          });
        });
      }

      // Filtros por columna (selectors)
      const keys = Object.keys(data[0] ?? {});

      filterSelectors.forEach(({ colIndex, value }) => {
        const target = value.toLowerCase().trim();
        if (target === "") return;

        const key = keys[colIndex];
        if (!key) return;

        result = result.filter((item) => {
          const raw = item[key];
          const strValue = raw?.toString().toLowerCase().trim() ?? "";
          return strValue === target;
        });
      });

      result = result.filter((item) => {
        return minMaxFilters.every(({ colIndex, min, max }) => {
          const key = keys[colIndex];
          if (!key) return true;

          // Si no hay filtro ni min ni max definidos, no filtrar
          if (min === undefined && max === undefined) return true;

          const raw = item[key];
          const num = typeof raw === "number" ? raw : Number(raw);
          if (Number.isNaN(num)) return false;

          if (min !== undefined && num < min) return false;
          if (max !== undefined && num > max) return false;

          return true;
        });
      });

      setFilteredData(result);
    };

    applyFilters();
  }, [data, inputFilterValue, filterSelectors, minMaxFilters]);

  // Actualiza filterSelectors
  const handleSelectorFilter = ({ colIndex, value }: SelectorFilter) => {
    setFilterSelectors((filtros) => {
      const existing = filtros.find((filtro) => filtro.colIndex === colIndex);
      if (existing) {
        return filtros.map((filtro) =>
          filtro.colIndex === colIndex ? { ...filtro, value } : filtro,
        );
      }

      return [...filtros, { colIndex, value }];
    });
  };

  const handleMinMaxFilter = ({ colIndex, min, max }: MinMaxFilter) => {
    setMinMaxFilters((filtros) => {
      const existing = filtros.find((filtro) => filtro.colIndex === colIndex);
      if (existing) {
        return filtros.map((filtro) =>
          filtro.colIndex === colIndex ? { ...filtro, min, max } : filtro,
        );
      }
      return [...filtros, { colIndex, min, max }];
    });
  };

  const resetFilters = () => {
    setFilterSelectors((prev) =>
      prev.map((filter) => ({ ...filter, value: "" })),
    );

    setMinMaxFilters((prev) =>
      prev.map((filter) => ({ ...filter, min: undefined, max: undefined })),
    );
  };

  const initFilters = () => {
    const filterSelectorsEmpty: SelectorFilter[] = columns.map(
      (column, colIndex) => {
        return {
          colIndex,
          value: "",
        };
      },
    );
    const filterMinMaxEmpty: MinMaxFilter[] = columns.map(
      (column, colIndex) => {
        return {
          colIndex,
          min: undefined,
          max: undefined,
        };
      },
    );
    setFilterSelectors(filterSelectorsEmpty);
    setMinMaxFilters(filterMinMaxEmpty);
  };

  return (
    <div
      className={`${styles.container}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <TableServerContent
        LANGUAGE={LANGUAGE}
        columnOrdered={columnOrdered}
        columns={columns}
        data={data}
        deleteFunction={deleteFunction}
        filterSelectors={filterSelectors}
        filteredData={filteredData}
        handleMinMaxFilter={handleMinMaxFilter}
        handleSelectorFilter={handleSelectorFilter}
        idImei={idImei}
        idKey={idKey}
        minMaxFilters={minMaxFilters}
        modalOption={modalOption}
        resetFilters={resetFilters}
        setColumnOrdered={setColumnOrdered}
        setInputFilterValue={setInputFilterValue}
        setMinHeight={setMinHeight}
        showCreateButton={showCreateButton}
        showDelete={showDelete}
        showEdit={showEdit}
        showGoGenericReport={showGoGenericReport}
        showGoPageView={showGoPageView}
        showViewModal={showViewModal}
        tableHasFilters={tableHasFilters}
        title={title}
        viewPath={viewPath}
        windowMaxSize={windowMaxSize}
      />
    </div>
  );
};
