"use client";
import { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";

//Tipado
import { dataTable } from "@/modules/global/components/table/table.model";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface Props {
  objData: dataTable;
  title: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}
interface rangeNVehicles {
  range: number;
  vehicles: number;
}

const ChartColInterval = ({
  objData,
  title,
  xAxisTitle,
  yAxisTitle,
}: Props) => {
  const [isReady, setIsReady] = useState(false);

  const magnitudes: number[] = objData.map(
    (value) => value.totalDistance as number
  );
  const average =
    magnitudes.reduce(function (a, b) {
      return a + b;
    }) / magnitudes.length;
  const totalVehiculos = magnitudes.length;
  const minDistance = magnitudes.sort()[0];
  const maxDistance = magnitudes.sort().reverse()[0];
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
    rangesArray.map((category, index) => {
      if (mag < category.range) {
        return (rangesArray[index].vehicles = rangesArray[index].vehicles + 1);
      }
    });
  });

  const distanceData = useMemo(() => {
    return rangesArray.map((r) => ({
      x: r.range,
      y: r.vehicles,
    }));
  }, []);

  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: "column",
        height: 300,
        width: 340,
      },
      title: { text: title },
      series: [
        {
          type: "column",
          name: title,
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
          text: xAxisTitle,
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
          text: yAxisTitle,
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
