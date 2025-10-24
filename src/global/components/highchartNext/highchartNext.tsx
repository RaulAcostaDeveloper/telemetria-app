"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import LoaderAnimation from "../loaderAnimation/loaderAnimation";
import { StockChartOptions } from "./highchartNext.model";

const HighchartsReact = dynamic(() => import("highcharts-react-official"), {
  ssr: false,
});

interface Props {
  chartOptions: Highcharts.Options;
  chartStockOptions: StockChartOptions;

  isStock?: boolean;
  moreIsRequired?: boolean;
  isGauge?: boolean;
  is3d?: boolean;
}

export const HighchartNext = ({
  chartOptions,
  isStock,
  moreIsRequired,
  isGauge,
  is3d,
}: Props) => {
  const [HighchartsModule, setHighchartsModule] = useState<unknown>(null);
  const [HighStockModule, setHighStockModule] = useState<unknown>(null);
  const [isReady, setIsReady] = useState(false);

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
          await import("highcharts/highcharts-3d.js");
        }
        setIsReady(true);
      } catch (err) {
        console.warn(err);
        setIsReady(false);
      }
    })();
  }, [is3d, isGauge, moreIsRequired]);

  return (
    <>
      {HighchartsModule && HighchartsReact && isReady ? (
        <HighchartsReact
          highcharts={HighchartsModule}
          constructorType={isStock ? "stockChart" : "chart"}
          options={chartOptions}
        />
      ) : (
        <LoaderAnimation />
      )}
    </>
  );
};
