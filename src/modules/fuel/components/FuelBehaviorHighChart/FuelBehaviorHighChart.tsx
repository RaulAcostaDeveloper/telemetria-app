"use client";
import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighstockInit from "highcharts/modules/stock";

import {
  createTooltipFormatter,
  getChargesTooltipFields,
  getDisChargesTooltipFields,
  getLevelMessagesTooltipFields,
  getPerformancesBetweenChargesTooltipFields,
} from "@/modules/global/utils/highChartUtils";
import {
  getLabelsForChargeGeoMap,
  getLabelsForDischargeGeoMap,
  getLabelsForLevelMessagesGeoMap,
} from "@/modules/global/utils/geoMapUtils";
import { FuelDataValues } from "@/globalConfig/redux/slices/fuelDataSlice";
import { GeoModalData } from "@/modules/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  handleClicGeoData: (geoModalData: GeoModalData) => void;
}

if (typeof HighstockInit === "function") {
  (HighstockInit as (hc: typeof Highcharts) => void)(Highcharts);
}

export const FuelBehaviorHighChart = ({
  LANGUAGE,
  fuelDataData,
  handleClicGeoData,
}: Props) => {
  // Tooltip de cada serie
  const chargesTooltipFields = getChargesTooltipFields(LANGUAGE);

  const dischargesTooltipFields = getDisChargesTooltipFields(LANGUAGE);

  const levelMessagesTooltipFields = getLevelMessagesTooltipFields(LANGUAGE);

  const performancesBetweenChargesTooltipFields =
    getPerformancesBetweenChargesTooltipFields(LANGUAGE);

  const chargesData = useMemo(() => {
    return fuelDataData.charges
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.magnitude,
        custom: {
          address: c.address,
          dateGps: c.dateGps,
          deviceBattery: c.deviceBattery,
          endDate: c.dateGps,
          finalFuel: c.finalFuel,
          ignition: Boolean(c.ignition),
          initialFuel: c.initialFuel,
          lat: c.lat,
          lon: c.lon,
          magnitude: c.magnitude,
          mainPower: c.mainPower,
          odometer: c.odometer,
          origin: c.origin,
          speed: c.speed,
          startDate: c.startDate,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const disChargesData = useMemo(() => {
    return fuelDataData.discharges
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.magnitude,
        custom: {
          address: c.address,
          dateGps: c.dateGps,
          deviceBattery: c.deviceBattery,
          endDate: c.dateGps,
          eventId: c.eventId,
          finalFuel: c.finalFuel,
          ignition: Boolean(c.ignition),
          initialFuel: c.initialFuel,
          lat: c.lat,
          lon: c.lon,
          magnitude: c.magnitude,
          mainPower: c.mainPower,
          odometer: c.odometer,
          origin: c.origin,
          speed: c.speed,
          startDate: c.startDate,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const levelMessagesData = useMemo(() => {
    return fuelDataData.levelMessages
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.currentFuel,
        custom: {
          dateGps: c.dateGps,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.mainPower,
          tanks: c.tanks,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  // Performance es km/L
  const performancesBetweenChargesData = useMemo(() => {
    return fuelDataData.performancesBetweenCharges
      .map((c) => ({
        x: new Date(c.endDatePerformance).getTime(),
        y: c.averagePerformance,
        custom: {
          dateGps: c.endDatePerformance,
          averagePerformance: c.averagePerformance,
          fuelConsumed: c.fuelConsumed,
          initialLevel: c.initialLevel,
          finalLevel: c.finalLevel,
          initialOdometer: c.initialOdometer,
          finalOdometer: c.finalOdometer,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const dailyPerformancesData = useMemo(() => {
    return fuelDataData.dailyPerformances
      .map((c) => ({
        x: new Date(c.endDate).getTime(),
        y: c.averagePerformance,
        custom: {
          dateGps: c.endDate,
          averagePerformance: c.averagePerformance,
          fuelConsumed: c.fuelConsumed,
          initialLevel: c.initialLevel,
          finalLevel: c.finalLevel,
          initialOdometer: c.initialOdometer,
          finalOdometer: c.finalOdometer,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

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
            text: LANGUAGE.highCharts.axisTitles.fuelVariation,
            style: {
              fontSize: "13px",
              fontWeight: "bold",
            },
          },
          opposite: false,
        },
        {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          title: {
            text: LANGUAGE.highCharts.axisTitles.performance,
            style: {
              fontSize: "13px",
              fontWeight: "bold",
            },
          },
          opposite: true,
        },
      ],
      series: [
        {
          yAxis: 0,
          type: "column",
          pointWidth: 20,
          name: LANGUAGE.highCharts.titles.charges,
          data: chargesData,
          color: "#4ec516",
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const charge = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.geoModalTitles.fuelChargeTitle,
                  lat: charge.lat,
                  lon: charge.lon,
                  rows: getLabelsForChargeGeoMap(LANGUAGE, charge),
                });
              },
            },
          },
          tooltip: {
            pointFormatter: createTooltipFormatter(chargesTooltipFields),
          },
        },
        {
          yAxis: 0,
          type: "column",
          pointWidth: 20,
          name: LANGUAGE.highCharts.titles.disCharges,
          data: disChargesData,
          color: "#ca5252",
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const disCharge = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.geoModalTitles.fuelDischargeTitle,
                  lat: disCharge.lat,
                  lon: disCharge.lon,
                  rows: getLabelsForDischargeGeoMap(LANGUAGE, disCharge),
                });
              },
            },
          },
          tooltip: {
            pointFormatter: createTooltipFormatter(dischargesTooltipFields),
          },
        },
        {
          yAxis: 0,
          name: LANGUAGE.highCharts.titles.fuelVariation,
          data: levelMessagesData,
          color: "#006af5",
          lineWidth: 2,
          tooltip: {
            pointFormatter: createTooltipFormatter(levelMessagesTooltipFields),
          },
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const message = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.geoModalTitles.levelMessageTitle,
                  lat: message.lat,
                  lon: message.lon,
                  rows: getLabelsForLevelMessagesGeoMap(LANGUAGE, message),
                });
              },
            },
          },
        },
        {
          yAxis: 1,
          name: LANGUAGE.highCharts.titles.performancesBetweenCharges,
          data: performancesBetweenChargesData,
          marker: { enabled: true, radius: 4, symbol: "square" },
          color: "#f5c800",
          tooltip: {
            pointFormatter: createTooltipFormatter(
              performancesBetweenChargesTooltipFields
            ),
          },
        },
        {
          yAxis: 1,
          name: LANGUAGE.highCharts.titles.dailyPerformance,
          data: dailyPerformancesData,
          marker: { enabled: true, radius: 4, symbol: "circle" },
          color: "#07b9ff",
          tooltip: {
            pointFormatter: createTooltipFormatter(
              performancesBetweenChargesTooltipFields
            ),
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
      legend: {
        enabled: true,
        itemStyle: {
          fontSize: "18px",
        },
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
