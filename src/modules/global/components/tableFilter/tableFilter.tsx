import styles from "./tableFilter.module.css";
interface Props {
  columnName: string;
}
export const TableFilter = ({ columnName }: Props) => {
  return (
    <div className={`${styles.selector}`}>
      <select id="options" className={`${styles.selectInput}`}>
        <option value="">{columnName}</option>
        <option value="opcion1">Opción 1</option>
        <option value="opcion2">Opción 2</option>
        <option value="opcion3">Opción 3</option>
      </select>
    </div>
  );
};
