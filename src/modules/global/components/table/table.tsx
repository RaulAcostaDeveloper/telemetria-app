import { TableAddNewButton } from "../tableAddNewButton/tableAddNewButton";
import { TableColumns } from "../tableColumns/tableColumns";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { TableDownloadCSV } from "../tableDownloadCSV/tableDownloadCSV";
import { TableFilter } from "../tableFilter/tableFilter";
import { TableFilters } from "../tableFilters/tableFilters";
import { TableSearch } from "../tableSearch/tableSearch";
import styles from "./table.module.css";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

type column = {
  columnName: string;
  defaultSpace: number;
  sortBy?: boolean;
  filter?: boolean;
};

interface Props {
  title: string;
  columns: column[];
  data: any[];
  showNew?: boolean;
}

export const Table = ({ title, columns, data, showNew }: Props) => {
  return (
    <div className={`${styles.defaultTable}`}>
      <div className={`${styles.inside}`}>
        <h2 className={`${styles.title}`}>{title}</h2>
        <div className={`${styles.topActions}`}>
          <TableSearch />
          {showNew && <TableAddNewButton />}
          <TableDownloadCSV />
        </div>
        <div className={`${styles.topActions}`}>
          <TableFilters columns={columns} />
        </div>
        <div className={`${styles.tableContent}`}>
          {/* Columnas */}
          <TableColumns columns={columns} />
          {/* Data */}
          <div>
            {data.map((dataObject, index) => (
              <div key={index} className={styles.dataObject}>
                {Object.entries(dataObject).map(([key, value], propIndex) => {
                  const defaultSpace = {
                    width: columns[propIndex].defaultSpace
                      ? `${columns[propIndex].defaultSpace * 50}px`
                      : "fit-content",
                  };
                  return (
                    <TableDataProp
                      key={key}
                      value={String(value)}
                      defaultSpace={defaultSpace}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
