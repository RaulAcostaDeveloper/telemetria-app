import ChartColInterval from "../chartColumnInterval/chartColInterval";
import styles from "./cardContentStyle.module.css";
import { format2DecimalsString } from "../../utils/utils";
import TableInCardT5 from "./tableInCardT5";

//Tipado
import { dataTable } from "@/modules/global/components/table/table.model";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  data: dataTable;
  LANGUAGE: LanguageInterface;
}

interface rangeNVehicles {
  lastRange: number;
  range: number;
  vehicles: number;
}

/** TCT5: Title, Chart, Top 5.
 * Contenido a usarse dentro de un contenedor carta general
 * como cardGenThird.
 */
export default function CardContentTCT5({ data, LANGUAGE }: Props) {
  const magnitudes: number[] = data.map(
    (value) => value.totalDistance as number
  );
  const compareNumbers = (a: number, b: number) => {
    return a - b;
  };
  const ascendingDistance = magnitudes.toSorted(compareNumbers);
  const descendingDistance = ascendingDistance.toReversed();
  const top5Distance = descendingDistance.slice(0, 5);
  const average =
    magnitudes.reduce((a, b) => {
      return a + b;
    }) / data.length;
  const titleValueSubtitle = {
    text: LANGUAGE.teleOBD.charts.subtitleDistance,
    value: Math.trunc(average),
  };
  const minDistance = ascendingDistance[0];
  const maxDistance = descendingDistance[0];
  const evalRange = maxDistance - minDistance;
  const rangeSize = evalRange / 10;

  // Array de objetos con 1. rango a usar. 2. vehiculos que entran en dicho rango.
  // Se usa el limite superior como numérico de cada rango.
  const rangesArray: rangeNVehicles[] = [];
  for (let index = 0; index < 10; index++) {
    let lastRange = 0;
    if (index !== 0) {
      lastRange = Math.ceil(rangeSize * index + minDistance) + 1;
    }
    rangesArray.push({
      lastRange,
      range: Math.ceil(rangeSize * (index + 1) + minDistance),
      vehicles: 0,
    });
  }

  // Incrementa contador de vehiculos que se encuentren en el rango.
  magnitudes.map((mag) => {
    rangesArray.map((category, index, arr) => {
      if (index > 0 && mag <= category.range && mag > arr[index - 1].range) {
        rangesArray[index].vehicles = arr[index].vehicles + 1;
      } else if (mag <= category.range && 0 == index) {
        rangesArray[index].vehicles = arr[index].vehicles + 1;
      }
    });
  });

  const top5DistanceData = [];
  for (let index = 0; index < top5Distance.length; index++) {
    const pivot = data.filter(
      (value) => top5Distance[index] === value.totalDistance
    )[0];
    const pivotClean = {
      plate: pivot.plate as string,
      name: pivot.name as string,
      totalDistance: format2DecimalsString(pivot.totalDistance as number),
    };
    top5DistanceData.push(pivotClean);
  }

  const langSelection = {
    title: LANGUAGE.teleOBD.charts.titleDistance,
    xAxisTitle: LANGUAGE.teleOBD.charts.xAxisDistance,
    yAxisTitle: LANGUAGE.teleOBD.charts.yAxis,
  };
  const langInTable = {
    col1: LANGUAGE.teleOBD.tableColumns.plate,
    col2: LANGUAGE.teleOBD.tableColumns.name,
    col3: LANGUAGE.teleOBD.tableColumns.totalDistance,
  };

  return (
    <div className={styles.distribution}>
      <h3>{LANGUAGE.teleOBD.charts.titleDistance}</h3>
      <h4>
        {titleValueSubtitle.text}: <span>{titleValueSubtitle.value}</span> km
      </h4>
      <ChartColInterval
        langSelection={langSelection}
        rangesArray={rangesArray}
      />
      <TableInCardT5 langSelection={langInTable} data={top5DistanceData} />
    </div>
  );
}
