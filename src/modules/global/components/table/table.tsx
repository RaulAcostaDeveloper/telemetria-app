"use client";
import { useEffect, useState } from "react";

import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableServerContent } from "../tableServerContent/tableServerContent";
import { columnsTable, dataTable } from "./table.model";

type SelectorFilter = {
  propIndex: number;
  value: string;
};

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
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
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

  useEffect(() => {
    const applyFilters = () => {
      let result = data;

      // Filtro de texto
      if (inputFilterValue.trim() !== "") {
        result = result.filter((item) => {
          const firstKey = Object.keys(item)[0];
          return item[firstKey]
            .toLowerCase()
            .includes(inputFilterValue.toLowerCase());
        });
      }

      // Filtros por columna (selector)
      filterSelectors.forEach(({ propIndex, value }) => {
        result = result.filter((item) => {
          const keys = Object.keys(item);
          const key = keys[propIndex];
          return (
            key && item[key].toLowerCase().trim() === value.toLowerCase().trim()
          );
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
          setInputFilterValue={setInputFilterValue}
          LANGUAGE={LANGUAGE}
          columns={columns}
          createFormContent={createFormContent}
          data={data}
          deleteFunction={deleteFunction}
          editFormContent={editFormContent}
          filteredData={filteredData}
          idKey={idKey}
          handleSelectorFilter={handleSelectorFilter}
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
