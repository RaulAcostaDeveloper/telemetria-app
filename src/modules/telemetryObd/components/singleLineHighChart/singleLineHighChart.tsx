"use client";
import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighstockInit from "highcharts/modules/stock";

import {
  createTooltipFormatter,
  getDistanceTooltipFields,
  getRPMTooltipFields,
  getTimeTraveledTooltipFields,
} from "@/modules/global/utils/highChartUtils";
import { GeoModalData } from "@/modules/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import {
  DataObject,
  getLabelsForDistanceGeoMap,
  getLabelsForRPMGeoMap,
  getLabelsForTimeTraveledGeoMap,
} from "@/modules/global/utils/geoMapUtils";

export interface ObdChartPoint {
  x: number;
  y: number | null;
  custom: {
    dateGps: string;
    lat: number;
    lon: number;
    value: number | string;
  };
}

export enum SINGLE_CHART_TYPES {
  rpm = "rpm_type",
  distance = "distance_type",
  timeTraveled = "time_type",
}

interface Props {
  LANGUAGE: LanguageInterface;
  chartData: ObdChartPoint[];
  handleClicGeoData: (geoModalData: GeoModalData) => void;
  type: SINGLE_CHART_TYPES;
}

if (typeof HighstockInit === "function") {
  (HighstockInit as (hc: typeof Highcharts) => void)(Highcharts);
}

export const SingleLineHighChart = ({
  LANGUAGE,
  chartData,
  handleClicGeoData,
  type,
}: Props) => {
  const rpmTooltipFields = getRPMTooltipFields(LANGUAGE);
  const distanceTooltipFields = getDistanceTooltipFields(LANGUAGE);
  const timeTraveledTooltipFields = getTimeTraveledTooltipFields(LANGUAGE);

  const chartOptions = useMemo(() => {
    const yAxisTitle = () => {
      switch (type) {
        case SINGLE_CHART_TYPES.rpm:
          return LANGUAGE.highCharts.tooltips.rpm.rpm;
        case SINGLE_CHART_TYPES.distance:
          return LANGUAGE.highCharts.axisTitles.distance;
        case SINGLE_CHART_TYPES.timeTraveled:
          return LANGUAGE.highCharts.axisTitles.timeTraveled;
        default:
          return LANGUAGE.highCharts.axisTitles.timeTraveled;
      }
    };

    const tooltipFields = () => {
      switch (type) {
        case SINGLE_CHART_TYPES.rpm:
          return rpmTooltipFields;
        case SINGLE_CHART_TYPES.distance:
          return distanceTooltipFields;
        case SINGLE_CHART_TYPES.timeTraveled:
          return timeTraveledTooltipFields;
        default:
          return timeTraveledTooltipFields;
      }
    };

    const labelsForGeoMap = (lang: LanguageInterface, mess: DataObject) => {
      switch (type) {
        case SINGLE_CHART_TYPES.rpm:
          return getLabelsForRPMGeoMap(lang, mess);
        case SINGLE_CHART_TYPES.distance:
          return getLabelsForDistanceGeoMap(lang, mess);
        case SINGLE_CHART_TYPES.timeTraveled:
          return getLabelsForTimeTraveledGeoMap(lang, mess);
        default:
          return getLabelsForTimeTraveledGeoMap(lang, mess);
      }
    };

    const geoModalTitle = () => {
      switch (type) {
        case SINGLE_CHART_TYPES.rpm:
          return LANGUAGE.geoModalTitles.rpmTitle;
        case SINGLE_CHART_TYPES.distance:
          return LANGUAGE.geoModalTitles.totalDistanceTitle;
        case SINGLE_CHART_TYPES.timeTraveled:
          return LANGUAGE.geoModalTitles.timeTraveledTitle;
        default:
          return LANGUAGE.geoModalTitles.timeTraveledTitle;
      }
    };
    return {
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
            text: yAxisTitle(),
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
            pointFormatter: createTooltipFormatter(tooltipFields()),
          },
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const message = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: geoModalTitle(),
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
        split: false,
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
    };
  }, [
    LANGUAGE,
    chartData,
    distanceTooltipFields,
    handleClicGeoData,
    rpmTooltipFields,
    timeTraveledTooltipFields,
    type,
  ]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={chartOptions}
    />
  );
};
