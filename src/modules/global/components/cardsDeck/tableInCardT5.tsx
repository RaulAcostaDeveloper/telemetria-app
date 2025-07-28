import { dataTable } from "@/modules/global/components/table/table.model";
import styles from "./tableInCardT5.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface TableDistancesProps {
  data: dataTable;
  LANGUAGE: LanguageInterface;
}

const TableInCardT5 = ({ LANGUAGE, data }: TableDistancesProps) => {
  const headers = Object.keys(data[0]);

  const table = (
    <div className={styles["t-wrapper"]}>
      <table className={styles["t-main"]}>
        <thead>
          <tr>
            <th>{LANGUAGE.teleOBD.tableColumns.plate}</th>
            <th>{LANGUAGE.teleOBD.tableColumns.name}</th>
            <th>{LANGUAGE.teleOBD.tableColumns.totalDistance}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr key={rowIdx}>
              {headers.map((clave) => (
                <td key={clave}>{item[clave]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  return table;
};

export default TableInCardT5;
