import ChartColInterval from "../chartColumnInterval/chartColInterval";
import styles from "./cardContentTCT5.module.css";
import { dataTable } from "@/modules/global/components/table/table.model";

//Tipado
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import TableInCardT5 from "./tableInCardT5";

interface Props {
  data: dataTable;
  LANGUAGE: LanguageInterface;
}
interface rangeNVehicles {
  range: number;
  vehicles: number;
}

/** TCT5: Title, Chart, Top 5.
 * Contenido a usarse dentro de un contenedor carta general
 * como cardWThird o cardGeneric.
 */
export default function CardContentTCT5({ data, LANGUAGE }: Props) {
  const magnitudes: number[] = data.map(
    (value) => value.totalDistance as number
  );

  const ascendingDistance = magnitudes.toSorted();
  const descendingDistance = ascendingDistance.toReversed();
  const top5Distance = descendingDistance.slice(0, 5);
  /*   const average =
    magnitudes.reduce(function (a, b) {
      return a + b;
    }) / totalVehiculos; */
  const minDistance = ascendingDistance[0];
  const maxDistance = descendingDistance[0];
  const evalRange = maxDistance - minDistance;
  const rangeSize = evalRange / 10;

  // Array de objetos con 1. rango a usar. 2. vehiculos que entran en dicho rango.
  // Se usa el limite superior como numérico de cada rango.
  const rangesArray: rangeNVehicles[] = [];
  for (let index = 0; index < 10; index++) {
    rangesArray.push({
      range: rangeSize * (index + 1) + minDistance,
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
      totalDistance: pivot.totalDistance as number,
    };
    top5DistanceData.push(pivotClean);
  }

  return (
    <div className={styles.distribution}>
      <ChartColInterval LANGUAGE={LANGUAGE} rangesArray={rangesArray} />
      <TableInCardT5 LANGUAGE={LANGUAGE} data={top5DistanceData} />
    </div>
  );
}
