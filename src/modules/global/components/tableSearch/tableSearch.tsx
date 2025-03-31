import SearchIcon from "@mui/icons-material/Search";

import styles from "./tableSearch.module.css";
import { LanguageSelector } from "../../language/utils/languageSelector";

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
        placeholder={LANGUAGE.table.actions.search}
        type="text"
      />
    </div>
  );
};
