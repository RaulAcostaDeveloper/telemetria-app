import DownloadIcon from "@mui/icons-material/Download";
import styles from "./tableDownloadCSV.module.css";

export const TableDownloadCSV = () => {
  return (
    <button className={`${styles.tableDownloadCSV}`}>
      <span className={`${styles.title}`}>Download CSV</span>
      <DownloadIcon />
    </button>
  );
};
