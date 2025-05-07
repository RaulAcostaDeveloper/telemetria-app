import styles from "./tableFilter.module.css";
import { LanguageInterface } from "../../language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  columnName: string;
}

export const TableFilter = ({ columnName, LANGUAGE }: Props) => {
  return (
    <div
      className={`${styles.selector}`}
      title={`${LANGUAGE.table.actions.filterBy} \"${columnName}\"`}
    >
      <select id="options" className={`${styles.selectInput}`}>
        <option value="">{columnName}</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>
    </div>
  );
};
//
