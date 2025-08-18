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

interface rangeNHours {
  lastRange: number;
  range: number;
  vehicles: number;
}

export default function CardContentDrivenTime({ data, LANGUAGE }: Props) {
  const hours: number[] = data.map((value) => value.totalEngineHours as number);

  const average =
    hours.reduce((a, b) => {
      return a + b;
    }) / hours.length;

  const titleValueSubtitle = {
    text: LANGUAGE.teleOBD.charts.subtitleDriven,
    value: Math.trunc(average),
  };

  const compareNumbers = (a: number, b: number) => {
    return a - b;
  };

  const ascendingHours = hours.toSorted(compareNumbers);
  const descendingHours = ascendingHours.toReversed();
  const top5Hours = descendingHours.slice(0, 5);
  const minHours = ascendingHours[0];
  const maxHours = descendingHours[0];
  const evalRange = maxHours - minHours;
  const rangeSize = evalRange / 10;

  // Array de objetos con 1. rango a usar. 2. cantidad de vehiculos que entran en dicho rango.
  // Se usa el limite superior del bloque como numérico de cada rango.
  const rangesArray: rangeNHours[] = [];
  for (let index = 0; index < 10; index++) {
    let lastRange = 0;
    if (index !== 0) {
      lastRange = Math.ceil(rangeSize * index + minHours) + 1;
    }
    rangesArray.push({
      lastRange,
      range: Math.ceil(rangeSize * (index + 1) + minHours),
      vehicles: 0,
    });
  }

  // Incrementa contador de vehiculos que se encuentren en el rango.
  hours.map((h) => {
    rangesArray.map((category, index, arr) => {
      if (index > 0 && h <= category.range && h > arr[index - 1].range) {
        rangesArray[index].vehicles = arr[index].vehicles + 1;
      } else if (h <= category.range && 0 == index) {
        rangesArray[index].vehicles = arr[index].vehicles + 1;
      }
    });
  });

  const top5HoursData = [];
  for (let index = 0; index < top5Hours.length; index++) {
    const pivot = data.filter(
      (value) => top5Hours[index] === value.totalEngineHours
    )[0];
    const pivotClean = {
      plate: pivot.plate as string,
      name: pivot.name as string,
      totalEngineHours: format2DecimalsString(pivot.totalEngineHours as number),
    };
    top5HoursData.push(pivotClean);
  }

  const langSelection = {
    title: LANGUAGE.teleOBD.charts.titleDriven,
    xAxisTitle: LANGUAGE.teleOBD.charts.xAxisDriven,
    yAxisTitle: LANGUAGE.teleOBD.charts.yAxis,
  };
  const langInTable = {
    col1: LANGUAGE.teleOBD.tableColumns.plate,
    col2: LANGUAGE.teleOBD.tableColumns.name,
    col3: LANGUAGE.teleOBD.tableColumns.totalEngineHours,
  };

  return (
    <div className={styles.distribution}>
      <h3>{LANGUAGE.teleOBD.charts.titleDriven}</h3>
      <h4>
        {titleValueSubtitle.text}: <span>{titleValueSubtitle.value}</span> h
      </h4>
      <ChartColInterval
        langSelection={langSelection}
        rangesArray={rangesArray}
      />
      <TableInCardT5 langSelection={langInTable} data={top5HoursData} />
    </div>
  );
}
