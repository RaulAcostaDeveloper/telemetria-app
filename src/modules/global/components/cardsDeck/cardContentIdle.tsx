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
  range: number;
  vehicles: number;
}

/**
 * Contenido a usarse dentro de un contenedor carta general
 * como cardGenThird.
 */
export default function CardContentIdle({ data, LANGUAGE }: Props) {
  const magnitudes: number[] = data.map(
    (value) => value.totalIdleHours as number
  );
  const compareNumbers = (a: number, b: number) => {
    return a - b;
  };
  const ascendingIdle = magnitudes.toSorted(compareNumbers);
  const descendingIdle = ascendingIdle.toReversed();
  const top5Idle = descendingIdle.slice(0, 5);
  const average =
    magnitudes.reduce((a, b) => {
      return a + b;
    }) / data.length;
  const titleValueSubtitle = {
    text: LANGUAGE.teleOBD.charts.subtitleIdle,
    value: Math.trunc(average),
  };
  const minIdle = ascendingIdle[0];
  const maxIdle = descendingIdle[0];
  const evalRange = maxIdle - minIdle;
  const rangeSize = evalRange / 10;

  // Array de objetos con 1. rango a usar. 2. vehiculos que entran en dicho rango.
  // Se usa el limite superior como numérico de cada rango.
  const rangesArray: rangeNVehicles[] = [];
  for (let index = 0; index < 10; index++) {
    rangesArray.push({
      range: Math.ceil(rangeSize * (index + 1) + minIdle),
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

  const top5IdleData = [];
  for (let index = 0; index < top5Idle.length; index++) {
    const pivot = data.filter(
      (value) => top5Idle[index] === value.totalIdleHours
    )[0];
    const pivotClean = {
      plate: pivot.plate as string,
      name: pivot.name as string,
      totalIdleHours: format2DecimalsString(pivot.totalIdleHours as number),
    };
    top5IdleData.push(pivotClean);
  }

  const langSelection = {
    title: LANGUAGE.teleOBD.charts.titleIdle,
    xAxisTitle: LANGUAGE.teleOBD.charts.xAxisIdle,
    yAxisTitle: LANGUAGE.teleOBD.charts.yAxis,
  };
  const langInTable = {
    col1: LANGUAGE.teleOBD.tableColumns.plate,
    col2: LANGUAGE.teleOBD.tableColumns.name,
    col3: LANGUAGE.teleOBD.tableColumns.totalIdleHours,
  };

  return (
    <div className={styles.distribution}>
      <h1>{LANGUAGE.teleOBD.charts.titleIdle}</h1>
      <h2>
        {titleValueSubtitle.text} <span>{titleValueSubtitle.value}</span> h.
      </h2>
      <ChartColInterval
        langSelection={langSelection}
        rangesArray={rangesArray}
      />
      <TableInCardT5 langSelection={langInTable} data={top5IdleData} />
    </div>
  );
}
