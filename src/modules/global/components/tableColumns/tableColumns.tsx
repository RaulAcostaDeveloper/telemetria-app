import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import styles from "./tableColumns.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";
import { columnsTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
  showActions?: boolean;
}

export const TableColumns = ({ columns, showActions }: Props) => {
  const LANGUAGE = LanguageSelector();

  return (
    <div className={`${styles.columns}`}>
      {columns.map((el, index) => {
        {
          /* Espacio que se le indicó en la columna */
        }
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };

        return el.orderColumn ? (
          // Columnas que son ordenables
          <button
            key={el.columnName}
            className={`${styles.column} ${styles.columnButton} ${
              index === 0 ? styles.firstButton : ""
            }
            ${
              index === columns.length - 1 && showActions !== true
                ? styles.lastButton
                : ""
            }
            `}
            style={defaultSpace}
            title={`${LANGUAGE.table.actions.sortItems} \"${el.columnName}\"`}
          >
            <span className={styles.columnTitle}>{el.columnName}</span>
            <div className={styles.columnSortIcon}>
              <ArrowRightIcon sx={{ fontSize: "2rem", color: "white" }} />
            </div>
          </button>
        ) : (
          // Columnas que no son ordenables
          <div
            key={el.columnName}
            className={styles.column}
            style={defaultSpace}
          >
            <span className={styles.columnTitle}>{el.columnName}</span>
          </div>
        );
      })}

      {/* Columna para acciones de la tabla */}
      {showActions && (
        <div
          className={`${styles.column} ${styles.actions} ${styles.lastButton}`}
        >
          <span className={`${styles.columnTitle} `}>
            {LANGUAGE.table.elements.actions}
          </span>
        </div>
      )}
    </div>
  );
};
