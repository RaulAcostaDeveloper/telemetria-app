"use client";
import { useMemo } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighstockInit from "highcharts/modules/stock";

import {
  createTooltipFormatter,
  getChargesTooltipFields,
  getDisChargesTooltipFields,
  getLabelsForChargeGeoMap,
  getLabelsForDischargeGeoMap,
  getLabelsForLevelMessagesGeoMap,
  getLevelMessagesTooltipFields,
  getPerformancesBetweenChargesTooltipFields,
} from "../../utils/tooltipHighchartFormatter";
import { FuelMetricsValues } from "@/globalConfig/redux/slices/fuelMetricsSlice";
import { GeoModalData } from "@/modules/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelMetricsData: FuelMetricsValues;
  handleClicGeoData: (geoModalData: GeoModalData) => void;
}

if (typeof HighstockInit === "function") {
  (HighstockInit as (hc: typeof Highcharts) => void)(Highcharts);
}

export const FuelHighChart = ({
  LANGUAGE,
  fuelMetricsData,
  handleClicGeoData,
}: Props) => {
  // Tooltip de cada serie
  const chargesTooltipFields = getChargesTooltipFields(
    LANGUAGE.fuelVehicle.fuelChargesLabels
  );

  const dischargesTooltipFields = getDisChargesTooltipFields(
    LANGUAGE.fuelVehicle.fuelChargesLabels
  );

  const levelMessagesTooltipFields = getLevelMessagesTooltipFields(
    LANGUAGE.fuelVehicle.fuelChargesLabels
  );

  const performancesBetweenChargesTooltipFields =
    getPerformancesBetweenChargesTooltipFields(
      LANGUAGE.fuelVehicle.fuelChargesLabels
    );

  const chargesData = useMemo(() => {
    return fuelMetricsData.charges
      .map((c) => ({
        x: new Date(c.endDate).getTime(),
        y: c.magnitude,
        custom: {
          eventId: c.eventId,
          address: c.address,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.mainPower,
          magnitude: c.magnitude,
          initialFuel: c.initialFuel,
          finalFuel: c.finalFuel,
          startDate: c.startDate,
          endDate: c.endDate,
          origin: c.origin,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const disChargesData = useMemo(() => {
    return fuelMetricsData.discharges
      .map((c) => ({
        x: new Date(c.endDate).getTime(),
        y: c.magnitude,
        custom: {
          eventId: c.eventId,
          address: c.address,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.mainPower,
          magnitude: c.magnitude,
          initialFuel: c.initialFuel,
          finalFuel: c.finalFuel,
          startDate: c.startDate,
          endDate: c.endDate,
          origin: c.origin,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, []);

  const levelMessagesData = useMemo(() => {
    return fuelMetricsData.levelMessages
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.currentFuel,
        custom: {
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
    return fuelMetricsData.performancesBetweenCharges
      .map((c) => ({
        x: new Date(c.endDatePerformance).getTime(),
        y: c.averagePerformance,
        custom: {
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
    return fuelMetricsData.dailyPerformances
      .map((c) => ({
        x: new Date(c.endDate).getTime(),
        y: c.averagePerformance,
        custom: {
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
          text: LANGUAGE.fuelVehicle.fuelLoadsChart.time,
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
            text: LANGUAGE.fuelVehicle.fuelLoadsChart.fuelVariation,
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
            text: LANGUAGE.fuelVehicle.fuelLoadsChart.performance,
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
          name: LANGUAGE.fuelVehicle.fuelGraphicSeries.charges,
          data: chargesData,
          color: "#4ec516",
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const charge = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.fuelVehicle.geoModalTitles.fuelChargeTitle,
                  lat: charge.lat,
                  lon: charge.lon,
                  rows: getLabelsForChargeGeoMap(
                    LANGUAGE.fuelVehicle.fuelChargesLabels,
                    charge
                  ),
                });
              },
            },
          },
          dataLabels: { enabled: false },
          tooltip: {
            pointFormatter: createTooltipFormatter(chargesTooltipFields),
          },
        },
        {
          yAxis: 0,
          type: "column",
          name: LANGUAGE.fuelVehicle.fuelGraphicSeries.disCharges,
          data: disChargesData,
          color: "#ca5252",
          point: {
            events: {
              click: (e: Highcharts.PointClickEventObject) => {
                const disCharge = (
                  e.point.options as { custom: { lat: number; lon: number } }
                ).custom;
                handleClicGeoData({
                  title: LANGUAGE.fuelVehicle.geoModalTitles.fuelDischargeTitle,
                  lat: disCharge.lat,
                  lon: disCharge.lon,
                  rows: getLabelsForDischargeGeoMap(
                    LANGUAGE.fuelVehicle.fuelChargesLabels,
                    disCharge
                  ),
                });
              },
            },
          },
          dataLabels: { enabled: false },
          tooltip: {
            pointFormatter: createTooltipFormatter(dischargesTooltipFields),
          },
        },
        {
          yAxis: 0,
          name: LANGUAGE.fuelVehicle.fuelGraphicSeries.fuelVariaiton,
          data: levelMessagesData,
          color: "#006af5",
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
                  title: LANGUAGE.fuelVehicle.geoModalTitles.levelMessageTitle,
                  lat: message.lat,
                  lon: message.lon,
                  rows: getLabelsForLevelMessagesGeoMap(
                    LANGUAGE.fuelVehicle.fuelChargesLabels,
                    message
                  ),
                });
              },
            },
          },
        },
        {
          yAxis: 1,
          name: LANGUAGE.fuelVehicle.fuelGraphicSeries
            .performancesBetweenCharges,
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
          name: LANGUAGE.fuelVehicle.fuelGraphicSeries.dailyPerformance,
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
        height: 500,
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
            text: LANGUAGE.fuelVehicle.fuelLoadsChart.rangeSelectorShowAll,
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
