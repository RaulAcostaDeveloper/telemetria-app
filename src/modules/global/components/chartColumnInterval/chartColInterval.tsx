"use client";
import { useMemo } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface rangeNVehicles {
  lastRange: number;
  range: number;
  vehicles: number;
}
interface langObj {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
}
interface Props {
  langSelection: langObj;
  rangesArray: rangeNVehicles[];
}

const ChartColInterval = ({ langSelection, rangesArray }: Props) => {
  const measureData = useMemo(
    () =>
      rangesArray.map((r) => ({
        x: r.range,
        y: r.vehicles,
        custom: { lastRange: r.lastRange },
      })),
    [rangesArray]
  );

  const chartOptions: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "column",
        height: 300,
        width: 340,
        spacingLeft: 0,
        spacingRight: 30,
      },
      series: [
        {
          type: "column",
          name: langSelection.title,
          yAxis: 0,
          color: "#4ec516",
          data: measureData,
        },
      ],
      xAxis: {
        type: "linear",
        labels: { style: { fontSize: "12px" } },
        formatter: undefined, // elimina esta línea si no la necesitas
        title: {
          text: langSelection.xAxisTitle,
          style: { fontSize: "1.5rem", fontWeight: "bold" },
        },
      },
      yAxis: {
        labels: { style: { fontSize: "1rem", fontWeight: "bold" } },
        title: {
          text: langSelection.yAxisTitle,
          style: { fontSize: "1.5rem", fontWeight: "bold" },
        },
        opposite: false,
      },
      tooltip: {
        split: false,
        useHTML: true,
        shared: false,
        borderRadius: 6,
        padding: 10,
        shadow: true,
        style: { pointerEvents: "none" },
        formatter: function () {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lastRange = (this as any).point?.custom?.lastRange;
          return `
            <div style="width:100%;font-size:18px;display:flex;flex-direction:column;justify-content:space-between;">
              <strong style="margin-right:10px;">${langSelection.xAxisTitle}:</strong>
              <p style="padding-bottom:1em;">${lastRange} h - ${this.x} h</p>
              <strong style="margin-right:10px;">${langSelection.yAxisTitle}:</strong>
              <p>${this.y}</p>
            </div>
          `;
        },
      },
      plotOptions: {
        column: {
          pointWidth: 25,
          pointPadding: 0,
          groupPadding: 0,
          borderWidth: 0,
        },
      },
      credits: { enabled: false },
      accessibility: { enabled: false },
    }),
    [langSelection, measureData]
  );

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default ChartColInterval;
