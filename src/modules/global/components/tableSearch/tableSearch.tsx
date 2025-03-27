import styles from "./tableSearch.module.css";
import SearchIcon from "@mui/icons-material/Search";

export const TableSearch = () => {
  return (
    <div className={`${styles.tableSearch}`} title="Search by first column">
      <div className={`${styles.icon}`}>
        <SearchIcon />
      </div>
      <input className={`${styles.input}`} type="text" placeholder="Search" />
    </div>
  );
};
//
