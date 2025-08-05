"use client";
import { useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./tableFiltersButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { TableFilters } from "../tableFilters/tableFilters";
import { columnsTable, dataTable, MinMax } from "../table.model";

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
  const [minMaxOptions, setMinMaxOptions] = useState<MinMax[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (filtersRef.current) {
      const height = filtersRef.current.offsetHeight;
      setMinHeight(height + 100);
    }
    resetSelectedOptions();
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, []);

  const resetSelectedOptions = () => {
    // Obtener las columnas con filterSelector y también conocer su indice (para reiniciar los filtros)
    const filterableColumns = columns
      .map((col, indexCol) => ({ col, indexCol }))
      .filter(({ col }) => col.filterSelector);

    const minMaxFilterableColumns = columns
      .map((col, indexCol) => ({ col, indexCol }))
      .filter(({ col }) => col.minMaxFilter);

    // Reiniciar los selectores
    setSelectedOptions(filterableColumns.map(() => ""));

    // Reiniciar los filtros
    filterableColumns.forEach(({ indexCol }) => {
      handleSelectorFilter(indexCol, "");
    });

    setMinMaxOptions(
      minMaxFilterableColumns.map(() => {
        return {
          min: null,
          max: null,
        };
      })
    );
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
      {isOpen && (
        <div className={styles.filtersContainer}>
          <div ref={filtersRef} className={`${styles.filtersContent}`}>
            {selectedOptions.length > 0 || minMaxOptions.length > 0 ? (
              <>
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
              </>
            ) : (
              <>
                <p className={styles.noFilters}>
                  {LANGUAGE.table.actions.noFilters}
                </p>
                <GeneralButton
                  type={ButtonTypes.NEUTRAL}
                  callback={() => setIsOpen(!isOpen)}
                  title={LANGUAGE.table.actions.close}
                  placeholder={LANGUAGE.table.actions.close}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
