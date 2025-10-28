"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import LoaderAnimation from "../loaderAnimation/loaderAnimation";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface Props {
  // Opciones para charts "normales"
  chartOptions?: Highcharts.Options;

  // Opciones para charts de stock (con más parámetros)
  chartStockOptions?: unknown;

  // Indicar que el chart es de stock
  isStock?: boolean;

  // El gráfico requiere importar de la librería "highcharts-more"
  moreIsRequired?: boolean;

  // Es el gráfico gauge. En un futuro podrían ser más opciones
  isGauge?: boolean;

  // El gráfico requiere importar de la libreria "highcharts-3d.js"
  is3d?: boolean;
}

export const HighchartNext = ({
  chartOptions,
  isStock,
  moreIsRequired,
  chartStockOptions,
  isGauge,
  is3d,
}: Props) => {
  const [HighchartsModule, setHighchartsModule] = useState<unknown>(null);
  const [HighStockModule, setHighStockModule] = useState<unknown>(null);
  const [modulesReady, setModulesReady] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isMounted) {
        const highChartsModule = await import("highcharts");
        setHighchartsModule(highChartsModule.default ?? highChartsModule);

        if (isStock) {
          const stockModule = await import("highcharts/modules/stock");
          setHighStockModule(stockModule.default ?? stockModule);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [isStock]);

  useEffect(() => {
    if (
      isStock &&
      HighchartsModule &&
      HighStockModule &&
      typeof HighStockModule === "function"
    ) {
      (HighStockModule as (hc: typeof HighchartsModule) => void)(
        HighchartsModule
      );
    }
  }, [isStock, HighchartsModule, HighStockModule]);

  useEffect(() => {
    (async () => {
      try {
        if (moreIsRequired) {
          await import("highcharts/highcharts-more");
          if (isGauge) {
            await import("highcharts/modules/solid-gauge");
          }
        }
        if (is3d) {
          setTimeout(async () => {
            await import("highcharts/highcharts-3d.js");
          }, 1);
        }
        setModulesReady(true);
      } catch (err) {
        console.warn(err);
        setModulesReady(false);
      }
    })();
  }, [is3d, isGauge, moreIsRequired]);

  return (
    <>
      {!!HighchartsModule && !!HighchartsReact && !!modulesReady ? (
        <HighchartsReact
          highcharts={HighchartsModule}
          constructorType={isStock ? "stockChart" : "chart"}
          options={isStock ? chartStockOptions : chartOptions}
        />
      ) : (
        <LoaderAnimation />
      )}
    </>
  );
};
