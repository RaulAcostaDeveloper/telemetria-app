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
  columns: string[];
  data: any[];
  showCreateButton?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
  showView?: boolean;
  title?: string;
}

// Columnas y su configuración
const columns: columnsTable = [
  {
    columnName: "Zona",
    defaultSpace: 3,
    orderColumn: true,
    filterOptions: true,
  },
  {
    columnName: "Perfil",
    defaultSpace: 2,
    orderColumn: true,
    filterOptions: true,
    showTotal: true,
  },
  { columnName: "País", defaultSpace: 2 },
  {
    columnName: "Estado",
    defaultSpace: 2,
    filterOptions: true,
    orderColumn: true,
    showTotal: true,
  },
];

const data = [
  {
    zone: "Principal name",
    profile: "Perfil name",
    country: "Country name",
    state: "Estado ",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    state: "Estado 2",
  },
  {
    zone: "Principal name 3",
    profile: "Perfil name 3",
    country: "Country name 3",
    state: "Estado 3",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
  {
    zone: "Principal name 4",
    profile: "Perfil name 4",
    country: "Country name 4",
    state: "Estado 4",
  },
];

export const Table = ({
  showCreateButton,
  showDelete,
  showEdit,
  showView,
  title,
}: Props) => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.inside}`}>
        {title && <h4 className={`${styles.title}`}>{title}</h4>}
        <div className={`${styles.topActions}`}>
          {showCreateButton && <TableAddNewButton />}
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
            />
          </div>
        </div>
        <TableDataSummatory columns={columns} data={data} />
      </div>
    </div>
  );
};
