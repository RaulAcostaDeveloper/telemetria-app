"use client";
import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighstockInit from "highcharts/modules/stock";

import {
  createTooltipFormatter,
  getRPMTooltipFields,
} from "@/modules/global/utils/highChartUtils";
import { GeoModalData } from "@/modules/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { getLabelsForRPMGeoMap } from "@/modules/global/utils/geoMapUtils";

export interface ObdChartPoint {
  eventId: number;
  dateGps: string;
  lat: number;
  lon: number;
  value: number;
}

interface Props {
  data: ObdChartPoint[];
  LANGUAGE: LanguageInterface;
  handleClicGeoData: (geoModalData: GeoModalData) => void;
}

if (typeof HighstockInit === "function") {
  (HighstockInit as (hc: typeof Highcharts) => void)(Highcharts);
}

export const SingleLineHighChart = ({
  data,
  LANGUAGE,
  handleClicGeoData,
}: Props) => {
  const rpmTooltipFields = getRPMTooltipFields(LANGUAGE);

  const rpmData = useMemo(() => {
    return data
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.value,
        custom: {
          dateGps: c.dateGps,
          lat: c.lat,
          lon: c.lon,
          rpm: c.value,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const chartData = rpmData;
  const tooltipFields = rpmTooltipFields;
  const labelsForGeoMap = getLabelsForRPMGeoMap;

  const chartOptions = useMemo(
    () => ({
      xAxis: {
        type: "datetime",
        labels: {
          style: {
            fontSize: "12px",
          },
        },
        title: {
          text: LANGUAGE.highCharts.axisTitles.time,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
          },
        },
      },
      yAxis: [
        {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          title: {
            text: LANGUAGE.highCharts.tooltips.rpm, // aquí
            style: {
              fontSize: "13px",
              fontWeight: "bold",
            },
          },
          opposite: false,
        },
      ],
      series: [
        {
          yAxis: 0,
          data: chartData,
          color: "#006af5",
          lineWidth: 2,
          tooltip: {
            pointFormatter: createTooltipFormatter(tooltipFields),
          },
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const message = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.geoModalTitles.rpmTitle,
                  lat: message.lat,
                  lon: message.lon,
                  rows: labelsForGeoMap(LANGUAGE, message),
                });
              },
            },
          },
        },
      ],
      tooltip: {
        useHTML: true,
        shared: false,
        borderRadius: 6,
        padding: 10,
        shadow: true,
        style: {
          pointerEvents: "none",
        },
      },
      chart: {
        height: 600,
        panning: true,
      },
      credits: {
        enabled: false,
      },
      rangeSelector: {
        selected: 0,
        buttons: [
          {
            type: "all",
            text: "",
          },
          {
            type: "all",
            text: LANGUAGE.highCharts.options.rangeSelectorShowAll,
          },
        ],
        buttonTheme: {
          style: {
            fontSize: "18px",
            color: "#254E70",
            border: "solid",
            backgroundColor: "blue !important",
          },
          states: {
            hover: {
              style: {
                fontSize: "18px",
                color: "#8ED2EF",
              },
            },
            select: {
              style: {
                fontSize: "18px",
              },
            },
          },
        },
        inputStyle: {
          fontSize: "18px",
        },
        labelStyle: {
          fontSize: "18px",
          marginRight: "20px",
          color: "#254E70",
        },
      },
      navigator: {
        enabled: true,
      },
      scrollbar: {
        enabled: true,
      },
      plotOptions: {
        series: {
          turboThreshold: 50000,
        },
      },
    }),
    []
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={chartOptions}
    />
  );
};
