import styles from "./table.module.css";
import { TableAddNewButton } from "../tableAddNewButton/tableAddNewButton";
import { TableColumns } from "../tableColumns/tableColumns";
import { TableDataContent } from "../tableDataContent/tableDataContent";
import { TableDataSummatory } from "../tableDataSummatory/tableDataSummatory";
import { TableDownloadCSV } from "../tableDownloadCSV/tableDownloadCSV";
import { TableFilters } from "../tableFilters/tableFilters";
import { TableSearch } from "../tableSearch/tableSearch";
import { columnsTable } from "./table.model";

interface Props {
  addFormContent?: React.FC<{
    dataObject?: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  columns: string[];
  data: any[];
  editFormContent?: React.FC<{
    dataObject: { [key: string]: string | number };
    setIsDisabled: (val: boolean) => void;
    setSaveFunction: (cb: () => void) => void;
  }>;
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  title?: string;
  idKey?: string;
  viewPath?: string;
}

// Columnas y su configuración
const columns: columnsTable = [
  {
    columnName: "Zona",
    defaultSpace: 3,
    orderColumn: true,
  },
  {
    columnName: "Perfil",
    defaultSpace: 2,
    orderColumn: true,
    filterOptions: true,
  },
  {
    columnName: "País",
    defaultSpace: 2,
    orderColumn: true,
    filterOptions: true,
  },
  {
    columnName: "Id",
    defaultSpace: 2,
    orderColumn: true,
    showTotal: true,
  },
];

const data = [
  {
    zone: "Principal name",
    profile: "Perfil name",
    country: "Country name",
    idVehicle: "412",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    idVehicle: "521",
    statee: "Estado 2",
  },
];

export const Table = ({
  addFormContent,
  editFormContent,
  showCreateButton,
  showDelete,
  showEdit,
  showView,
  title,
  idKey,
  viewPath,
}: Props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        {title && <h4 className={`${styles.title}`}>{title}</h4>}
        <div className={`${styles.topActions}`}>
          {showCreateButton && (
            <TableAddNewButton addFormContent={addFormContent} />
          )}
          <TableDownloadCSV />
        </div>
        <div className={`${styles.topActions}`}>
          <TableSearch />
        </div>
        <div className={`${styles.topActions}`}>
          <TableFilters columns={columns} />
        </div>
        <div className={`${styles.tableContent}`}>
          <div>
            {/* Columnas */}
            <TableColumns
              columns={columns}
              showActions={showDelete || showEdit || showView}
            />
            {/* Datos de la tabla */}
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
        <TableDataSummatory columns={columns} data={data} />
      </div>
    </div>
  );
};
