import styles from "./table.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { TableAddNewButton } from "../tableAddNewButton/tableAddNewButton";
import { TableColumns } from "../tableColumns/tableColumns";
import { TableDataContent } from "../tableDataContent/tableDataContent";
import { TableDataSummatory } from "../tableDataSummatory/tableDataSummatory";
import { TableDownloadCSV } from "../tableDownloadCSV/tableDownloadCSV";
import { TableFilters } from "../tableFilters/tableFilters";
import { TableSearch } from "../tableSearch/tableSearch";
import { columnsTable, dataTable } from "./table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  data: dataTable;
  idKey?: string;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  title?: string;
  viewPath?: string;
  createFormContent?: React.FC<{
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
  createFormContent,
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
  LANGUAGE,
}: Props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        {/* Título */}
        {title && <h4 className={`${styles.title}`}>{title}</h4>}

        {/* Botones externos */}
        <div className={`${styles.topActions}`}>
          {showCreateButton && (
            <TableAddNewButton
              LANGUAGE={LANGUAGE}
              createFormContent={createFormContent}
            />
          )}
          <TableDownloadCSV LANGUAGE={LANGUAGE} />
        </div>

        {/* Búsqueda en la primer columna*/}
        <div className={`${styles.topActions}`}>
          <TableSearch LANGUAGE={LANGUAGE} />
        </div>

        {/* Filtros por columna */}
        <div className={`${styles.topActions}`}>
          <TableFilters LANGUAGE={LANGUAGE} columns={columns} />
        </div>

        {/* Tabla */}
        <div className={`${styles.tableContent}`}>
          <div>
            {/* Columnas */}
            <TableColumns
              LANGUAGE={LANGUAGE}
              columns={columns}
              showActions={showDelete || showEdit || showView}
            />

            {/* Registros de la tabla */}
            <TableDataContent
              LANGUAGE={LANGUAGE}
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
        <TableDataSummatory LANGUAGE={LANGUAGE} columns={columns} data={data} />
      </div>
    </div>
  );
};
