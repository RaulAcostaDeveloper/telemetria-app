import { LanguageSelector } from "../../language/utils/languageSelector";
import styles from "./tableSearch.module.css";
import SearchIcon from "@mui/icons-material/Search";

export const TableSearch = () => {
  const LANGUAGE = LanguageSelector();

  return (
    <div
      className={`${styles.tableSearch}`}
      title={LANGUAGE.table.actions.searchTitle}
    >
      <div className={`${styles.icon}`}>
        <SearchIcon />
      </div>
      <input
        className={`${styles.input}`}
        type="text"
        placeholder={LANGUAGE.table.actions.search}
      />
    </div>
  );
};
