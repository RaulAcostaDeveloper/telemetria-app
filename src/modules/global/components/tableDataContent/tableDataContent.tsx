import { columnsTable, dataTable } from "../table/table.model";
import { TableActions } from "../tableActions/tableActions";
import { TableDataProp } from "../tableDataProp/tableDataProp";
import styles from "./tableDataContent.module.css";

interface Props {
  columns: columnsTable;
  data: dataTable;
  showActions?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
}

export const TableDataContent = ({
  data,
  columns,
  showActions,
  showDelete,
  showEdit,
  showView,
}: Props) => {
  return (
    <>
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
          {showActions && (
            <TableActions
              showDelete={showDelete}
              showEdit={showEdit}
              showView={showView}
            />
          )}
        </div>
      ))}
    </>
  );
};
