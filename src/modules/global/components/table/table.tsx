import styles from "./table.module.css";
import { TableAddNewButton } from "../tableAddNewButton/tableAddNewButton";
import { TableColumns } from "../tableColumns/tableColumns";
import { TableDataContent } from "../tableDataContent/tableDataContent";
import { TableDataSummatory } from "../tableDataSummatory/tableDataSummatory";
import { TableDownloadCSV } from "../tableDownloadCSV/tableDownloadCSV";
import { TableFilters } from "../tableFilters/tableFilters";
import { TableSearch } from "../tableSearch/tableSearch";
import { columnsTable, dataTable } from "./table.model";

interface Props {
  columns: columnsTable;
  data: dataTable;
  idKey?: string;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  title?: string;
  viewPath?: string;
  addFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
}

export const Table = ({
  addFormContent,
  columns,
  data,
  editFormContent,
  idKey,
  showCreateButton,
  showDelete,
  showEdit,
  showView,
  title,
  viewPath,
}: Props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        {/* Título */}
        {title && <h4 className={`${styles.title}`}>{title}</h4>}

        {/* Botones externos */}
        <div className={`${styles.topActions}`}>
          {showCreateButton && (
            <TableAddNewButton addFormContent={addFormContent} />
          )}
          <TableDownloadCSV />
        </div>

        {/* Búsqueda en la primer columna*/}
        <div className={`${styles.topActions}`}>
          <TableSearch />
        </div>

        {/* Filtros por columna */}
        <div className={`${styles.topActions}`}>
          <TableFilters columns={columns} />
        </div>

        {/* Tabla */}
        <div className={`${styles.tableContent}`}>
          <div>
            {/* Columnas */}
            <TableColumns
              columns={columns}
              showActions={showDelete || showEdit || showView}
            />

            {/* Registros de la tabla */}
            <TableDataContent
              columns={columns}
              data={data}
              showActions={showDelete || showEdit || showView}
              showDelete={showDelete}
              showEdit={showEdit}
              showView={showView}
              viewPath={viewPath}
              idKey={idKey}
              editFormContent={editFormContent}
            />
          </div>
        </div>

        {/* Suma de valores */}
        <TableDataSummatory columns={columns} data={data} />
      </div>
    </div>
  );
};
