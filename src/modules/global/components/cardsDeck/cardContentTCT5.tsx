import styles from "./cardContentTCT5.module.css";

interface Props {
  title: string;
}

/** TCT5: Title, Chart, Top 5.
 * Contenido a usarse dentro de un contenedor carta general
 * como cardWThird o cardGeneric.
 */
export default function CardContentTCT5({ title }: Props) {
  //TO-DO: jalar la información de tabla del mock
  //TO-DO: crear la tabla a partir del modulo de tabla e invocarlo aqui
  //pero alimentado desde props, como el tercer valor de informacion en props (title, chartData, tableData)
  return (
    <div className={styles.distribution}>
      <h3 className={styles.title}>{title}</h3>
      <div>Chart</div>
      <table></table>
    </div>
  );
}
