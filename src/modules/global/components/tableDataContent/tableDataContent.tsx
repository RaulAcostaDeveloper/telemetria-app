import styles from "./tableDataContent.module.css";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import { columnsTable, dataTable } from "../table/table.model";

interface Props {
  columns: columnsTable;
  data: dataTable;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  viewIdKey?: string;
  viewPath?: string;
}

export const TableDataContent = ({
  columns,
  data,
  showActions,
  showDelete,
  showEdit,
  showView,
  viewIdKey,
  viewPath,
}: Props) => {
  return (
    <div className={styles.dataContent}>
      {data.map((dataObject, dataIndex) => (
        <div key={dataIndex} className={styles.dataObject}>
          {columns.map((col, colIndex) => {
            const defaultSpace = {
              width: columns[colIndex].defaultSpace
                ? `${columns[colIndex].defaultSpace * 50}px`
                : "fit-content",
            };
            const dataValues = Object.values(dataObject);
            return (
              <div key={colIndex} style={defaultSpace}>
                <TableDataProp
                  value={String(dataValues[colIndex] ?? "-")}
                  defaultSpace={defaultSpace}
                />
              </div>
            );
          })}
          {showActions && (
            <TableActions
              showDelete={showDelete}
              showEdit={showEdit}
              showView={showView}
              viewPath={`${viewPath}${dataObject[viewIdKey ?? ""]}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};
