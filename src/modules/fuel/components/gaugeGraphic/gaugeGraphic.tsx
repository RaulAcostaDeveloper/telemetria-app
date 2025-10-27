"use client";

import { useMemo } from "react";
import { HighchartNext } from "@/global/components/highchartNext/highchartNext";

interface Props {
  max: number;
  metric: string;
  title: string;
  value: number;
}

export const GaugeGraphic = ({ title, max, metric, value }: Props) => {
  const percent = Math.round((100 * value) / max);

  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      chart: {
        type: "gauge",
        plotBackgroundColor: undefined,
        plotBackgroundImage: undefined,
        plotBorderWidth: 0,
        plotShadow: false,
        height: "290px",
        backgroundColor: "transparent",
      },
      title: {
        text: title,
        style: {
          fontSize: "1.5rem",
        },
      },
      pane: {
        startAngle: -90,
        endAngle: 90,
        background: undefined,
        center: ["50%", "75%"],
        size: "320px",
      },
      yAxis: {
        min: 0,
        max: max,
        tickPixelInterval: 100,
        tickPosition: "inside",
        tickColor: "#FFFFFF",
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: undefined,
        labels: {
          distance: 20,
          style: {
            fontSize: "1.5rem",
          },
        },
        lineWidth: 0,
        plotBands: [
          {
            from: 0,
            to: max / 3,
            color: "#DF5353",
            thickness: 20,
            borderRadius: "50%",
          },
          {
            from: max / 3,
            to: (max / 3) * 2,
            thickness: 20,
            color: "#DDDF0D",
          },
          {
            from: (max / 3) * 2,
            to: max,
            thickness: 20,
            color: "#55BF3B",
            borderRadius: "50%",
          },
        ],
      },
      series: [
        {
          type: "gauge",
          name: title,
          data: [value],
          dataLabels: {
            format: "{y} " + metric + " - " + percent + " %",
            borderWidth: 1,
            color: "#333333",
            padding: 10,
            style: {
              fontSize: "1.2rem",
            },
          },
          dial: {
            radius: "100%",
            backgroundColor: "gray",
            baseWidth: 12,
            baseLength: "0%",
            rearLength: "0%",
          },
          pivot: {
            backgroundColor: "#333333",
            radius: 6,
          },
        },
      ],
      tooltip: {
        enabled: false,
        split: false,
      },
    };
  }, [max, metric, percent, title, value]);

  return (
    <>
      <HighchartNext chartOptions={chartOptions} moreIsRequired isGauge />
    </>
  );
};
