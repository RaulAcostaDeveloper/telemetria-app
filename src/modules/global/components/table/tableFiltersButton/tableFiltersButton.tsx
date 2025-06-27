"use client";
import { useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./tableFiltersButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableFilters } from "../tableFilters/tableFilters";
import { columnsTable, dataTable } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  handleSelectorFilter: (propIndex: number, value: string) => void;
  setMinHeight: (height: number) => void;
}

export const TableFiltersButton = ({
  LANGUAGE,
  columns,
  data,
  handleSelectorFilter,
  setMinHeight,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filtersRef.current) {
      const height = filtersRef.current.offsetHeight;
      setMinHeight(height + 100);
    }
    resetSelectedOptions();
  }, []);

  const resetSelectedOptions = () => {
    // Obtener las columnas con filterSelector y también conocer su indice (para reiniciar los filtros)
    const filterableColumns = columns
      .map((col, indexCol) => ({ col, indexCol }))
      .filter(({ col }) => col.filterSelector);

    // Reiniciar los selectores
    setSelectedOptions(filterableColumns.map(() => ""));

    // Reiniciar los filtros
    filterableColumns.forEach(({ indexCol }) => {
      handleSelectorFilter(indexCol, "");
    });
  };

  return (
    <div className={styles.container}>
      <GeneralButton
        type={ButtonTypes.CONFIRM}
        callback={() => {
          setIsOpen(!isOpen);
        }}
        title={LANGUAGE.table.buttons.filtersButton}
        buttonStyle={styles.button}
        placeholder={LANGUAGE.table.buttons.filtersButton}
        Icon={<FilterAltIcon />}
      />
      <div
        ref={filtersRef}
        className={`${styles.filtersContent} ${isOpen ? styles.show : ""}`}
      >
        <TableFilters
          LANGUAGE={LANGUAGE}
          columns={columns}
          data={data}
          handleSelectorFilter={handleSelectorFilter}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className={styles.buttonsContainer}>
          <GeneralButton
            type={ButtonTypes.WARNING}
            callback={() => resetSelectedOptions()}
            title={LANGUAGE.table.actions.cleanFilters}
            placeholder={LANGUAGE.table.actions.cleanFilters}
          />
          <GeneralButton
            type={ButtonTypes.NEUTRAL}
            callback={() => setIsOpen(!isOpen)}
            title={LANGUAGE.table.actions.close}
            placeholder={LANGUAGE.table.actions.close}
          />
        </div>
      </div>
      {/* Agregar "no hay filtros disponibles para esta tabla" */}
    </div>
  );
};
