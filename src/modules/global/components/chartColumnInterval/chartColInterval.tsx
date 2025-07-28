"use client";
import { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";

//Tipado
import { LanguageInterface } from "../../language/constants/language.model";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface rangeNVehicles {
  range: number;
  vehicles: number;
}
interface Props {
  LANGUAGE: LanguageInterface;
  rangesArray: rangeNVehicles[];
}

const ChartColInterval = ({ LANGUAGE, rangesArray }: Props) => {
  const [isReady, setIsReady] = useState(false);

  const distanceData = useMemo(() => {
    return rangesArray.map((r) => ({
      x: r.range,
      y: r.vehicles,
    }));
  }, [rangesArray]);

  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: "column",
        height: 300,
        width: 340,
      },
      title: { text: LANGUAGE.teleOBD.charts.driveDistance },
      series: [
        {
          type: "column",
          name: LANGUAGE.teleOBD.charts.driveDistance,
          yAxis: 0,
          color: "#4ec516",
          data: distanceData,
        },
      ],
      xAxis: {
        type: "linear",
        labels: {
          style: {
            fontSize: "12px",
          },
          formatter: function () {
            return this.value.toString();
          }, // Evita que malinterprete la gráfica que es un valor de fecha.
        },
        title: {
          text: LANGUAGE.teleOBD.charts.xAxis,
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
      },
      yAxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        title: {
          text: LANGUAGE.teleOBD.charts.yAxis,
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        opposite: false,
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return `
            <div style="font-size: 20px">
              <div>Distancia: <b>${this.x}</b><br/>Vehículos: <b>${this.y}</b><div>
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
      rangeSelector: {
        enabled: false,
      },
      /* rangeSelector: { selected: 1 }, */
      navigator: { enabled: false },
      scrollbar: { enabled: false },
      credits: {
        enabled: false,
      },
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await import("highcharts/highcharts-more");
        await import("highcharts/modules/solid-gauge");
        setIsReady(true);
      } catch (err) {
        console.warn(err);
        setIsReady(false);
      }
    })();
  }, []);

  return (
    <>
      {isReady && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={chartOptions}
        />
      )}
    </>
  );
};

export default ChartColInterval;
