"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./tableFiltersButton.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { TableFilters } from "../tableFilters/tableFilters";
import {
  MinMaxFilter,
  SelectorFilter,
  columnsTable,
  dataTable,
} from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  filterSelectors: SelectorFilter[];
  handleMinMaxFilter: ({ colIndex, min, max }: MinMaxFilter) => void;
  handleSelectorFilter: ({ colIndex, value }: SelectorFilter) => void;
  minMaxFilters: MinMaxFilter[];
  resetFilters: () => void;
  setMinHeight: (height: number) => void;
}

export const TableFiltersButton = ({
  LANGUAGE,
  columns,
  data,
  filterSelectors,
  handleMinMaxFilter,
  handleSelectorFilter,
  minMaxFilters,
  resetFilters,
  setMinHeight,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);
  const escFunction = useCallback((event: { key: string }) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (filtersRef.current) {
      const height = filtersRef.current.offsetHeight;
      setMinHeight(height + 100);
    }
    resetFilters();
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.addEventListener("keydown", escFunction, false);

      return () => {
        document.removeEventListener("keydown", escFunction, false);
      };
    }
  }, [escFunction]);

  const filtersOn: boolean = columns.some(
    (column) => "filterSelector" in column || "minMaxFilter" in column
  );

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
            {filtersOn ? (
              <>
                <TableFilters
                  LANGUAGE={LANGUAGE}
                  columns={columns}
                  data={data}
                  minMaxFilters={minMaxFilters}
                  handleMinMaxFilter={handleMinMaxFilter}
                  handleSelectorFilter={handleSelectorFilter}
                  filterSelectors={filterSelectors}
                />
                <div className={styles.buttonsContainer}>
                  <GeneralButton
                    type={ButtonTypes.WARNING}
                    callback={resetFilters}
                    title={LANGUAGE.table.actions.cleanFilters}
                    placeholder={LANGUAGE.table.actions.cleanFilters}
                  />
                  <GeneralButton
                    type={ButtonTypes.CONFIRM}
                    callback={() => setIsOpen(!isOpen)}
                    title={LANGUAGE.table.actions.agree}
                    placeholder={LANGUAGE.table.actions.agree}
                  />
                </div>
              </>
            ) : (
              <div className={styles.noFiltersContainer}>
                <p className={styles.noFiltersTitle}>
                  {LANGUAGE.table.actions.noFilters}
                </p>
                <div className={styles.closeButton}>
                  <GeneralButton
                    type={ButtonTypes.NEUTRAL}
                    callback={() => setIsOpen(!isOpen)}
                    title={LANGUAGE.table.actions.close}
                    placeholder={LANGUAGE.table.actions.close}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
