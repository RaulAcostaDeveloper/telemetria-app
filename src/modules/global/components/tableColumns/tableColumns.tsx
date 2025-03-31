import { LanguageSelector } from "../../language/utils/languageSelector";
import { columnsTable } from "../table/table.model";
import styles from "./tableColumns.module.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface Props {
  columns: columnsTable;
  showActions?: boolean;
}

export const TableColumns = ({ columns, showActions }: Props) => {
  const LANGUAGE = LanguageSelector();
  return (
    <div className={`${styles.columns}`}>
      {columns.map((el, index) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        // Control de columnas ordenables
        return el.orderColumn ? (
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
          <div
            key={el.columnName}
            className={styles.column}
            style={defaultSpace}
          >
            <span className={styles.columnTitle}>{el.columnName}</span>
          </div>
        );
      })}
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

//
