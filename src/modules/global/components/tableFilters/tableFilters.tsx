import styles from "./tableFilters.module.css";
import { TableFilter } from "../tableFilter/tableFilter";
import { columnsTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
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
            <div key={el.columnName + "filter"} style={defaultSpace}>
              {el.filterOptions && <TableFilter columnName={el.columnName} />}
            </div>
          </>
        );
      })}
    </div>
  );
};
//
