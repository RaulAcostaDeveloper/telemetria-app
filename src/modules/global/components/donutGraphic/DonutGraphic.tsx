"use client";

import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";
import styles from "./DonutGraphic.module.css";

// Cargamos HighchartsReact dinámicamente para evitar SSR
const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

export interface Device {
  imei: string;
  lastFuelLevel: number; // “Inventario”
  fuelLoadCount: number; // futuro “Cargado”
  fuelUnloadCount: number; // futuro “Descargado”
}

type MetricOption = "Inventario" | "Cargado" | "Descargado";
type SegmentOption = 5 | 10 | 15;

interface DonutGraphicProps {
  devices: Device[];
}

const DonutGraphic: React.FC<DonutGraphicProps> = ({ devices }) => {
  const [selectedMetric, setSelectedMetric] =
    useState<MetricOption>("Inventario");
  const [segmentsCount, setSegmentsCount] = useState<SegmentOption>(10);
  const [is3DReady, setIs3DReady] = useState(false);

  // Cargamos highcharts 3D SOLO en el cliente; el simple `import()` parchea a Highcharts.

  useEffect(() => {
    (async () => {
      try {
        await import("highcharts/highcharts-3d.js");
        console.log("✔ Highcharts 3D cargado (efecto secundario).");
        setIs3DReady(true);
      } catch (err) {
        console.error(
          ' No se pudo importar "highcharts/highcharts-3d.js". El donut 3D no podrá mostrarse.',
          err
        );
        setIs3DReady(false);
      }
    })();
  }, []);

  const chartOptions: Highcharts.Options = useMemo(() => {
    if (!is3DReady) {
      return {
        title: { text: "Cargando gráfico 3D..." },
        series: [],
      };
    }

    const allValues: number[] =
      selectedMetric === "Inventario"
        ? devices.map((d) => d.lastFuelLevel)
        : [];

    if (allValues.length === 0) {
      return {
        title: { text: "No hay datos disponibles" },
        series: [],
      };
    }

    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);

    const step = (maxVal - minVal) / segmentsCount;

    const thresholds: number[] = [];
    for (let i = 0; i <= segmentsCount; i++) {
      thresholds.push(minVal + step * i);
    }

    type Bin = { label: string; count: number };
    const binsAsc: Bin[] = [];

    for (let i = 0; i < segmentsCount; i++) {
      const lower = thresholds[i];
      const upper = thresholds[i + 1];
      let label: string;
      let count = 0;

      if (i === 0) {
        label = `< ${upper.toFixed(2)}`;
        count = allValues.filter((v) => v < upper).length;
      } else if (i === segmentsCount - 1) {
        label = `> ${lower.toFixed(2)}`;
        count = allValues.filter((v) => v >= lower).length;
      } else {
        label = `${lower.toFixed(2)} - ${upper.toFixed(2)}`;
        count = allValues.filter((v) => v >= lower && v < upper).length;
      }

      binsAsc.push({ label, count });
    }

    const binsDesc = binsAsc.slice().reverse();

    const seriesData: Array<[string, number]> = binsDesc.map((b) => [
      b.label,
      b.count,
    ]);

    return {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
        backgroundColor: "transparent",
      },
      title: {
        text: "",
      },
      subtitle: {
        text: `Métrica: ${selectedMetric} · Segmentos: ${segmentsCount}`,
        style: {
          fontSize: "1rem",
          color: "#333",
        },
      },
      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "0.9rem",
              textOutline: "none",
            },
            formatter: function (this: any): string | null {
              if ((this.y as number) > 0) {
                return `${this.point.name}: ${this.y}`;
              }
              return null;
            },
          },
        },
      },
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          fontSize: "0.9rem",
          fontWeight: "400",
        },
        itemMarginTop: 4,
        itemMarginBottom: 4,
      },
      series: [
        {
          name: "Cantidad",
          type: "pie",
          data: seriesData,
        },
      ],
      credits: {
        enabled: false,
      },
      tooltip: {
        style: {
          fontSize: "1rem",
          fontWeight: "500",
        },
        pointFormat: "{point.name}: <b>{point.y} dispositivos</b>",
        backgroundColor: "rgba(255,255,255,0.95)",
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
      },
    };
  }, [devices, selectedMetric, segmentsCount, is3DReady]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="metric-select">Ordenar por:</label>
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as MetricOption)}
          >
            <option value="Inventario">Inventario</option>
            <option value="Cargado" disabled>
              Cargado (próximamente)
            </option>
            <option value="Descargado" disabled>
              Descargado (próximamente)
            </option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="segments-select">Segmentos:</label>
          <select
            id="segments-select"
            value={segmentsCount}
            onChange={(e) =>
              setSegmentsCount(Number(e.target.value) as SegmentOption)
            }
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      <div className={styles.chartWrapper}>
        {!is3DReady || !HighchartsReact ? (
          <div className={styles.loadingText}>Cargando gráfica 3D...</div>
        ) : (
          <div className={styles.highchartsContainer}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutGraphic;
