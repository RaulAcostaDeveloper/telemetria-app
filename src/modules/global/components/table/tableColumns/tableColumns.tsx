import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import styles from "./tableColumns.module.css";
import { LanguageInterface } from "../../../language/constants/language.model";
import { columnsTable, SelectorOrdered } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnOrdered: SelectorOrdered;
  columns: columnsTable;
  setColumnOrdered: React.Dispatch<React.SetStateAction<SelectorOrdered>>;
  showActions?: boolean;
}

export const TableColumns = ({
  LANGUAGE,
  columnOrdered,
  columns,
  setColumnOrdered,
  showActions,
}: Props) => {
  const handleSelectorFilter = (colIndex: number) => {
    setColumnOrdered((prev) => {
      if (prev.colIndex !== colIndex) {
        // Nuevo ordenamiento ascendente
        return { colIndex, value: true };
      }
      // Invertir ascendente | descendente
      return { colIndex, value: !prev.value };
    });
  };

  return (
    <div className={styles.columns}>
      {columns.map((column, index) => {
        const widthStyle = {
          width: column.defaultSpace
            ? `${column.defaultSpace * 50}px`
            : "fit-content",
        };

        // Decisiones de renderizado
        const isFirstColumn = index === 0;
        const isLastColumn = index === columns.length - 1 && !showActions;
        const isOrderedSelected = columnOrdered.colIndex === index;
        const isAscendant = columnOrdered.value;

        const constructedClass = `
        ${styles.column} 
        ${column.orderColumn ? styles.columnButton : ""} 
        ${isFirstColumn ? styles.firstButton : ""} 
        ${isLastColumn ? styles.lastButton : ""}`;

        const renderSortIcon = () => {
          if (!column.orderColumn) return null;
          if (!isOrderedSelected)
            return <ArrowRightIcon sx={{ fontSize: "2rem", color: "white" }} />;
          return isAscendant ? (
            <ArrowDropUpIcon sx={{ fontSize: "2rem", color: "white" }} />
          ) : (
            <ArrowDropDownIcon sx={{ fontSize: "2rem", color: "white" }} />
          );
        };

        const content = (
          <>
            <span className={styles.columnTitle}>{column.columnName}</span>
            {column.orderColumn && (
              <div className={styles.columnSortIcon}>{renderSortIcon()}</div>
            )}
          </>
        );

        // Es columna de ordenamiento?
        return column.orderColumn ? (
          <button
            key={column.columnName}
            className={constructedClass}
            style={widthStyle}
            title={`${LANGUAGE.table.actions.sortItems} "${column.columnName}"`}
            onClick={() => handleSelectorFilter(index)}
          >
            {content}
          </button>
        ) : (
          <div
            key={column.columnName}
            className={constructedClass}
            style={widthStyle}
          >
            {content}
          </div>
        );
      })}

      {/* Mostrar acciones? */}
      {showActions && (
        <div className={`${styles.actions} ${styles.lastButton}`}>
          <span className={styles.columnTitle}>
            {LANGUAGE.table.elements.actions}
          </span>
        </div>
      )}
    </div>
  );
};
