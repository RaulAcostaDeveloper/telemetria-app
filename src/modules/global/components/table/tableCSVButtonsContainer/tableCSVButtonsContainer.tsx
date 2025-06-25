"use client";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
// import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import DownloadIcon from "@mui/icons-material/Download";

import styles from "./tableCSVButtonsContainer.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { columnsTable, dataTable } from "../table.model";
import { toKebabCase } from "@/modules/global/utils/utils";

type HeaderCSV = {
  label: string;
  key: string;
};

interface Props {
  LANGUAGE: LanguageInterface;
  columns: columnsTable;
  filteredData: dataTable;
  tableData: dataTable;
  title?: string;
}

export const TableCSVButtonsContainer = ({
  LANGUAGE,
  columns,
  // filteredData,
  tableData,
  title,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const headersCSV: HeaderCSV[] =
    tableData.length > 0
      ? columns.map((col, index) => ({
          label: col.columnName,
          key: Object.keys(tableData[0])[index],
        }))
      : [];

  if (!isClient) return null;

  return (
    <>
      <CSVLink
        className={styles.title}
        data={tableData}
        filename={title ? `${toKebabCase(title)}.csv` : "data-table.csv"}
        headers={headersCSV}
      >
        <GeneralButton
          Icon={<DownloadIcon />}
          buttonStyle={styles.tableDownloadCSV}
          callback={() => {}}
          title={""}
          placeholder={LANGUAGE.table.buttons.downloadCSV}
          type={ButtonTypes.SUCCESS}
        />
      </CSVLink>

      {/* Descomentar si se quiere el botón de descargar solo lo filtrado de regreso */}
      {/* <CSVLink
        className={styles.title}
        data={filteredData}
        filename={
          title ? `filtred-${toKebabCase(title)}.csv` : "data-table.csv"
        }
        headers={headersCSV}
      >
        <GeneralButton
          Icon={<BrowserUpdatedIcon />}
          buttonStyle={styles.tableDownloadCSV}
          callback={() => {}}
          title={LANGUAGE.table.buttons.filtered}
          placeholder={LANGUAGE.table.buttons.downloadFiltredCSV}
          type={ButtonTypes.SUCCESS}
        />
      </CSVLink> */}
    </>
  );
};
