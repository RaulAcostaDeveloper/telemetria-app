import { dataTable } from "@/global/components/table/table.model";
import styles from "./tableInCardT5.module.css";

interface langObj {
  title: string;
  col1: string;
  col2: string;
  col3: string;
}
interface TableDistancesProps {
  data: dataTable;
  langSelection: langObj;
}

const TableInCardT5 = ({ langSelection, data }: TableDistancesProps) => {
  const headers = Object.keys(data[0]);

  const table = (
    <div className={styles["t-wrapper"]}>
      <h4>- {langSelection.title} -</h4>
      <table className={styles["t-main"]}>
        <thead>
          <tr>
            <th>{langSelection.col1}</th>
            <th>{langSelection.col2}</th>
            <th>{langSelection.col3}</th>
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
