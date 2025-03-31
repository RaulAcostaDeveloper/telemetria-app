"use client";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./tableDownloadCSV.module.css";
import { GeneralButton } from "../generalButton/generalButton";
import { LanguageSelector } from "../../language/utils/languageSelector";

export const TableDownloadCSV = () => {
  const LANGUAGE = LanguageSelector();
  return (
    <GeneralButton
      Icon={<DownloadIcon />}
      buttonStyle={styles.tableDownloadCSV}
      callback={() => {}}
      title={LANGUAGE.table.buttons.downloadCSV}
      type={2}
    />
  );
};
