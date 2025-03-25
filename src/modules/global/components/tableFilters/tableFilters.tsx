import { TableFilter } from "../tableFilter/tableFilter";
import styles from "./tableFilter.module.css";

type column = {
  columnName: string;
  defaultSpace: number;
  sortBy?: boolean;
  filter?: boolean;
};

interface Props {
  columns: column[];
}
export const TableFilters = ({ columns }: Props) => {
  return (
    <div className={`${styles.tableFilters}`}>
      {columns.map((el) => {
        const defaultSpace = {
          width: el.defaultSpace ? `${el.defaultSpace * 50}px` : "fit-content",
        };
        return (
          <>
            {el.filter && (
              <div key={el.columnName + "filter"} style={defaultSpace}>
                <TableFilter columnName={el.columnName} />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};
