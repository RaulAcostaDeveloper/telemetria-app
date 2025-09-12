"use client";

import React, { useState, useMemo, useEffect } from "react";
import Highcharts from "highcharts";
import dynamic from "next/dynamic";

import styles from "./donutGraphic.module.css";
import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { Devices } from "@/globalConfig/redux/slices/fuelSummarySlice";
import LoaderAnimation from "../loaderAnimation/loaderAnimation";

// Cargamos HighchartsReact dinámicamente para evitar que se cargue del lado del servidor
const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

type MetricOption = "Combustible" | "Cargado" | "Descargado";
type SegmentOption = 5 | 10 | 15;

interface DonutGraphicProps {
  devices: Devices[];
}

const DonutGraphic: React.FC<DonutGraphicProps> = ({ devices }) => {
  const LANGUAGE = useLanguage();
  const [selectedMetric, setSelectedMetric] =
    useState<MetricOption>("Combustible");
  const [segmentsCount, setSegmentsCount] = useState<SegmentOption>(10);
  const [is3DReady, setIs3DReady] = useState(false);

  // Nos aseguramos que highcharts 3d solo se cargue del lado del cliente
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
        title: { text: `${LANGUAGE.fuel.donutGrpahic.waitingMessage}` },
        series: [],
      };
    }

    let allValues: number[];
    if (selectedMetric === "Combustible") {
      allValues = devices.map((d) => d.lastFuelLevel);
    } else if (selectedMetric === "Cargado") {
      allValues = devices.map((d) => d.fuelLoaded);
    } else if (selectedMetric === "Descargado") {
      allValues = devices.map((d) => d.fuelUnloaded);
    } else {
      allValues = [];
    }

    if (allValues.length === 0) {
      return {
        title: { text: `${LANGUAGE.fuel.donutGrpahic.noDataMessage}` },
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
        label = `< ${upper.toFixed(2)}L`;
        count = allValues.filter((v) => v < upper).length;
      } else if (i === segmentsCount - 1) {
        label = `> ${lower.toFixed(2)}L`;
        count = allValues.filter((v) => v >= lower).length;
      } else {
        label = `${lower.toFixed(2)}L – ${upper.toFixed(2)}L`;
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
        options3d: { enabled: true, alpha: 45, beta: 0 },
        backgroundColor: "transparent",
        spacing: [20, 20, 20, 20],
        height: 300,
      },
      title: { text: "" },
      subtitle: {
        text: `${LANGUAGE.fuel.donutGrpahic.title}`,
        style: { fontSize: "1.3rem", color: "#333", fontWeight: "bold" },
      },

      plotOptions: {
        pie: {
          innerSize: 100,
          depth: 45,
        },
      },
      legend: {
        align: "right",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: { fontSize: "0.9rem", fontWeight: "400" },
        itemMarginTop: 4,
        itemMarginBottom: 4,
      },
      series: [
        {
          name: "Cantidad",
          type: "pie",
          innerSize: 100,
          depth: 45,
          data: seriesData,
          size: 220,

          dataLabels: {
            enabled: true,
            useHTML: true,
            inside: false,
            distance: 30,
            connectorWidth: 1,
            connectorColor: "#ccc",
            crop: false,
            allowOverlap: true,
            style: {
              fontSize: "2rem",
              color: "#000",
              textOutline: "none",
            },
            formatter: function (this: any): string | null {
              if ((this.y as number) > 0) {
                return `<span>${this.point.name}</span>`;
              }
              return null;
            },
          } as Highcharts.SeriesPieDataLabelsOptionsObject,
        },
      ],
      credits: { enabled: false },
      tooltip: {
        useHTML: true, // ← Permite <br/> en el tooltip
        style: { fontSize: "2.6rem", fontWeight: "bold" },
        formatter: function (this: any) {
          return (
            `<div style="text-align: center;">` +
            `<span>${this.point.name}</span><br/>` +
            `<span>Vehículos: ${this.y}</span>` +
            `</div>`
          );
        },
        backgroundColor: "rgba(255,255,255,0.95)",
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
      },
      accessibility: { enabled: false },
    };
  }, [is3DReady, selectedMetric, segmentsCount, LANGUAGE, devices]);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label htmlFor="metric-select">
            {`${LANGUAGE.fuel.donutGrpahic.metric}`}
          </label>
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as MetricOption)}
          >
            <option value="Combustible">
              {LANGUAGE.fuel.donutGrpahic.inventory}
            </option>
            <option value="Cargado">
              {LANGUAGE.fuel.donutGrpahic.charged}
            </option>
            <option value="Descargado">
              {LANGUAGE.fuel.donutGrpahic.discharged}
            </option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label htmlFor="segments-select">
            {LANGUAGE.fuel.donutGrpahic.segments}:
          </label>
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
          <div className={styles.loadingText}>
            {LANGUAGE.fuel.donutGrpahic.waitingMessage}
            <LoaderAnimation />
          </div>
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
