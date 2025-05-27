"use client";
import { useEffect, useState } from "react";

import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableServerContent } from "./tableServerContent/tableServerContent";
import {
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
  showView,
  title,
  viewPath,
}: Props) => {
  const [filteredData, setFilteredData] = useState<dataTable>(data);
  const [inputFilterValue, setInputFilterValue] = useState<string>("");
  const [filterSelectors, setFilterSelectors] = useState<SelectorFilter[]>([]);
  const [columnOrdered, setColumnOrdered] = useState<SelectorOrdered>({
    propIndex: 0,
    value: true,
  });

  // Ordenamiento ascendente y descendente
  useEffect(() => {
    if (filteredData.length === 0) return;

    const columnKey = Object.keys(filteredData[0])[columnOrdered.propIndex];
    if (!columnKey) return;

    const sorted = [...filteredData].sort((a, b) => {
      const valA = a[columnKey];
      const valB = b[columnKey];

      const numA = Number(valA);
      const numB = Number(valB);

      const bothAreNumbers = !isNaN(numA) && !isNaN(numB);

      let result: number;

      if (bothAreNumbers) {
        result = numA - numB;
      } else {
        result = valA.localeCompare(valB, undefined, { sensitivity: "base" });
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
      filterSelectors.forEach(({ propIndex, value }) => {
        result = result.filter((item) => {
          const keys = Object.keys(item);
          const key = keys[propIndex];
          const raw = item[key];

          const strValue = raw?.toString().toLowerCase().trim() ?? "";
          const target = value.toLowerCase().trim();

          return strValue === target;
        });
      });

      setFilteredData(result);
    };

    applyFilters();
  }, [data, inputFilterValue, filterSelectors]);

  // Actualiza filterSelectors
  const handleSelectorFilter = (propIndex: number, value: string) => {
    setFilterSelectors((filtros) => {
      if (value.trim() === "") {
        return filtros.filter((filtro) => filtro.propIndex !== propIndex);
      }

      const existing = filtros.find((filtro) => filtro.propIndex === propIndex);
      if (existing) {
        return filtros.map((filtro) =>
          filtro.propIndex === propIndex ? { ...filtro, value } : filtro
        );
      }

      return [...filtros, { propIndex, value }];
    });
  };

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        <TableServerContent
          LANGUAGE={LANGUAGE}
          columnOrdered={columnOrdered}
          columns={columns}
          createFormContent={createFormContent}
          data={data}
          deleteFunction={deleteFunction}
          editFormContent={editFormContent}
          filteredData={filteredData}
          handleSelectorFilter={handleSelectorFilter}
          idKey={idKey}
          setColumnOrdered={setColumnOrdered}
          setInputFilterValue={setInputFilterValue}
          showCreateButton={showCreateButton}
          showDelete={showDelete}
          showEdit={showEdit}
          showView={showView}
          title={title}
          viewPath={viewPath}
        />
      </div>
    </div>
  );
};
