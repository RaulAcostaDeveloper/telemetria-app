import styles from "./tableColumns.module.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type column = {
  columnName: string;
  defaultSpace: number;
  sortBy?: boolean;
  filter?: boolean;
};

interface Props {
  columns: column[];
}

export const TableColumns = ({ columns }: Props) => {
  return (
    <div className={`${styles.columns}`}>
      {columns.map((el) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        // Control de columnas ordenables
        return el.sortBy ? (
          <button
            key={el.columnName}
            className={`${styles.column} ${styles.columnButton}`}
            style={defaultSpace}
            title="Sort items"
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
    </div>
  );
};
