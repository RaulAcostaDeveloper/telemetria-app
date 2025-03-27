"use client";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./tableDownloadCSV.module.css";
import { GeneralButton } from "../generalButton/generalButton";

export const TableDownloadCSV = () => {
  return (
    <GeneralButton
      Icon={<DownloadIcon />}
      buttonStyle={styles.tableDownloadCSV}
      callback={() => {}}
      title="Download CSV"
      type={2}
    />
  );
};
