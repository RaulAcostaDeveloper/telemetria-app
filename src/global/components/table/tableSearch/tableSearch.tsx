import SearchIcon from "@mui/icons-material/Search";

import styles from "./tableSearch.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  setInputFilterValue: (value: string) => void;
  LANGUAGE: LanguageInterface;
}

export const TableSearch = ({ LANGUAGE, setInputFilterValue }: Props) => {
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
        onChange={(e) => setInputFilterValue(e.target.value)}
        placeholder={LANGUAGE.table.actions.search}
        type="text"
      />
    </div>
  );
};
