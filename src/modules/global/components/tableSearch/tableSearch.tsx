import SearchIcon from "@mui/icons-material/Search";

import styles from "./tableSearch.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const TableSearch = ({ LANGUAGE }: Props) => {
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
