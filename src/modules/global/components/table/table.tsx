"use client";
import { useEffect, useState } from "react";

import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableServerContent } from "./tableServerContent/tableServerContent";
import {
  MinMaxFilter,
  PrimitiveValue,
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
  idKey?: string;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showGoFuel?: boolean;
  showGoOBT?: boolean;
  showView?: boolean;
  title?: string;
  viewPath?: string;
  createFormContent?: React.FC<{
    dataObject?: { [key: string]: PrimitiveValue };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: PrimitiveValue };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const Table = ({
  LANGUAGE,
  columns,
  createFormContent,
  data,
  deleteFunction,
  editFormContent,
  idKey,
  showCreateButton,
  showDelete,
  showEdit,
  showGoFuel,
  showGoOBT,
  showView,
  title,
  viewPath,
}: Props) => {
  const [columnOrdered, setColumnOrdered] = useState<SelectorOrdered>({
    colIndex: 0,
    value: true,
  });
  const [filterSelectors, setFilterSelectors] = useState<SelectorFilter[]>([]);
  const [minMaxFilters, setMinMaxFilters] = useState<MinMaxFilter[]>([]);

  const [filteredData, setFilteredData] = useState<dataTable>(data);
  const [inputFilterValue, setInputFilterValue] = useState<string>("");
  const [minHeight, setMinHeight] = useState(0);

  useEffect(() => {
    initFilters();
  }, []);

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
          const firstKey = Object.keys(item)[0];
          const raw = item[firstKey];

          const strValue = raw?.toString().toLowerCase() ?? "";
          return strValue.includes(inputFilterValue.toLowerCase());
        });
      }

      // Filtros por columna (selectors)
      filterSelectors.forEach(({ colIndex, value }) => {
        const target = value.toLowerCase().trim();

        if (target === "") return;

        result = result.filter((item) => {
          const keys = Object.keys(item);
          const key = keys[colIndex];
          const raw = item[key];

          const strValue = raw?.toString().toLowerCase().trim() ?? "";

          return strValue === target;
        });
      });

      setFilteredData(result);
    };

    applyFilters();
  }, [data, inputFilterValue, filterSelectors]);

  // Actualiza filterSelectors
  const handleSelectorFilter = ({ colIndex, value }: SelectorFilter) => {
    setFilterSelectors((filtros) => {
      if (value.trim() === "") {
        return filtros.filter((filtro) => filtro.colIndex !== colIndex);
      }

      const existing = filtros.find((filtro) => filtro.colIndex === colIndex);
      if (existing) {
        return filtros.map((filtro) =>
          filtro.colIndex === colIndex ? { ...filtro, value } : filtro
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
          filtro.colIndex === colIndex ? { ...filtro, min, max } : filtro
        );
      }
      return [...filtros, { colIndex, min, max }];
    });
  };

  const resetFilters = () => {
    setFilterSelectors((prev) =>
      prev.map((filter) => ({ ...filter, value: "" }))
    );

    setMinMaxFilters((prev) =>
      prev.map((filter) => ({ ...filter, min: undefined, max: undefined }))
    );
  };

  const initFilters = () => {
    const filterSelectorsEmpty: SelectorFilter[] = columns.map(
      (column, colIndex) => {
        return {
          colIndex,
          value: "",
        };
      }
    );
    const filterMinMaxEmpty: MinMaxFilter[] = columns.map(
      (column, colIndex) => {
        return {
          colIndex,
          min: undefined,
          max: undefined,
        };
      }
    );
    setFilterSelectors(filterSelectorsEmpty);
    setMinMaxFilters(filterMinMaxEmpty);
  };
  console.log("filteredData ", filteredData);

  return (
    <div
      className={`${styles.container}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <TableServerContent
        LANGUAGE={LANGUAGE}
        columnOrdered={columnOrdered}
        columns={columns}
        createFormContent={createFormContent}
        data={data}
        deleteFunction={deleteFunction}
        editFormContent={editFormContent}
        filterSelectors={filterSelectors}
        filteredData={filteredData}
        handleMinMaxFilter={handleMinMaxFilter}
        handleSelectorFilter={handleSelectorFilter}
        idKey={idKey}
        minMaxFilters={minMaxFilters}
        resetFilters={resetFilters}
        setColumnOrdered={setColumnOrdered}
        setInputFilterValue={setInputFilterValue}
        setMinHeight={setMinHeight}
        showCreateButton={showCreateButton}
        showDelete={showDelete}
        showEdit={showEdit}
        showGoFuel={showGoFuel}
        showGoOBT={showGoOBT}
        showView={showView}
        title={title}
        viewPath={viewPath}
      />
    </div>
  );
};
