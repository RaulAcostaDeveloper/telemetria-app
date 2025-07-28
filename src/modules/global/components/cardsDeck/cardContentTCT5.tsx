import ChartColInterval from "../chartColumnInterval/chartColInterval";
import styles from "./cardContentTCT5.module.css";
import { dataTable } from "@/modules/global/components/table/table.model";

interface Props {
  title: string;
  data: dataTable;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

/** TCT5: Title, Chart, Top 5.
 * Contenido a usarse dentro de un contenedor carta general
 * como cardWThird o cardGeneric.
 */
export default function CardContentTCT5({
  data,
  title,
  xAxisTitle,
  yAxisTitle,
}: Props) {
  //TO-DO: jalar la información de tabla del mock
  //TO-DO: crear la tabla a partir del modulo de tabla e invocarlo aqui
  //pero alimentado desde props, como el tercer valor de informacion en props (title, chartData, tableData)
  return (
    <div className={styles.distribution}>
      <ChartColInterval
        objData={data}
        title={title}
        xAxisTitle={xAxisTitle}
        yAxisTitle={yAxisTitle}
      />
    </div>
  );
}
