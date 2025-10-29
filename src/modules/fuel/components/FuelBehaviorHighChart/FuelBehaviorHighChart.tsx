"use client";
import { useMemo } from "react";

import {
  createTooltipFormatter,
  getChargesTooltipFields,
  getDisChargesTooltipFields,
  getLevelMessagesTooltipFields,
  getPerformancesBetweenChargesTooltipFields,
} from "@/global/utils/highChartUtils";
import {
  getLabelsForChargeGeoMap,
  getLabelsForDischargeGeoMap,
  getLabelsForLevelMessagesGeoMap,
} from "@/global/utils/geoMapUtils";
import { FuelDataValues } from "@/global/redux/serviceSlices/fuelDataSlice";
import { GeoModalData } from "@/global/components/geoModal/geoModal";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { OBValue } from "../fuelReportDataProvider/fuelReportDataProvider";
import { HighchartNext } from "@/global/components/highchartNext/highchartNext";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  handleClicGeoData: (geoModalData: GeoModalData) => void;
  opBEngineOff: OBValue[];
  opBEngineOffCoasting: OBValue[];
  opBEngineOnIdle: OBValue[];
  opBEngineOnMoving: OBValue[];
}

export const FuelBehaviorHighChart = ({
  LANGUAGE,
  fuelDataData,
  handleClicGeoData,
  opBEngineOff,
  // opBEngineOffCoasting,
  opBEngineOnIdle,
  opBEngineOnMoving,
}: Props) => {
  // Tooltip de cada serie
  const chargesTooltipFields = useMemo(() => {
    return getChargesTooltipFields(LANGUAGE);
  }, [LANGUAGE]);

  const dischargesTooltipFields = useMemo(() => {
    return getDisChargesTooltipFields(LANGUAGE);
  }, [LANGUAGE]);

  const levelMessagesTooltipFields = useMemo(() => {
    return getLevelMessagesTooltipFields(LANGUAGE);
  }, [LANGUAGE]);

  const performancesBetweenChargesTooltipFields = useMemo(() => {
    return getPerformancesBetweenChargesTooltipFields(LANGUAGE);
  }, [LANGUAGE]);

  const chargesData = useMemo(() => {
    return fuelDataData.charges
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.magnitude,
        custom: {
          address: c.address,
          dateGps: c.dateGps,
          deviceBattery: c.deviceBattery,
          endDate: c.endDate,
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
  }, [fuelDataData]);

  const disChargesData = useMemo(() => {
    return fuelDataData.discharges
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.magnitude,
        custom: {
          address: c.address,
          dateGps: c.dateGps,
          deviceBattery: c.deviceBattery,
          endDate: c.endDate,
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
  }, [fuelDataData]);

  const levelMessagesData = useMemo(() => {
    return fuelDataData.levelMessages
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.sensorCurrentLevelSmoothly,
        custom: {
          dateGps: c.dateGps,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.externalPower,
          tanks: c.tanks,
          currentLevelSmoothly: c.sensorCurrentLevelSmoothly,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, [fuelDataData]);

  const levelMessagesCANData = useMemo(() => {
    return fuelDataData.levelMessages
      .map((c) => ({
        x: new Date(c.dateGps).getTime(),
        y: c.canCurrentLevelSmoothly,
        custom: {
          dateGps: c.dateGps,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.externalPower,
          tanks: c.tanks,
          currentLevelSmoothly: c.canCurrentLevelSmoothly,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, [fuelDataData]);

  // Performance es km/L
  const performancesBetweenChargesData = useMemo(() => {
    return fuelDataData.performancesBetweenCharges
      .map((c) => ({
        x: new Date(c.endDatePerformance).getTime(),
        y: c.averagePerformance,
        custom: {
          startDate: c.startDatePerformance,
          dateGps: c.endDatePerformance,
          averagePerformance: c.averagePerformance,
          fuelConsumed: c.fuelConsumed,
          initialLevel: c.initialLevel,
          finalLevel: c.finalLevel,
          initialOdometer: c.initialOdometer,
          finalOdometer: c.finalOdometer,
          kilometersTraveled: c.kilometersTraveled,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, [fuelDataData]);

  const dailyPerformancesData = useMemo(() => {
    return fuelDataData.dailyPerformances
      .map((c) => ({
        x: new Date(c.endDate).getTime(),
        y: c.averagePerformance,
        custom: {
          startDate: c.startDate,
          dateGps: c.endDate,
          averagePerformance: c.averagePerformance,
          fuelConsumed: c.fuelConsumed,
          initialLevel: c.initialLevel,
          finalLevel: c.finalLevel,
          initialOdometer: c.initialOdometer,
          finalOdometer: c.finalOdometer,
          kilometersTraveled: c.kilometersTraveled,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, [fuelDataData]);

  const plotBands = useMemo(() => {
    return [
      ...opBEngineOff.map((c) => ({
        from: new Date(c.startDate).getTime(),
        to: new Date(c.endDate).getTime(),
        color: "#fbccf1",
        zIndex: 0,
        className: "opBEngineOff",
        custom: {
          speed: c.speed,
          dateGps: c.startDate,
        },
      })),
      // ...opBEngineOffCoasting.map((c) => ({
      //   from: new Date(c.startDate).getTime(),
      //   to: new Date(c.endDate).getTime(),
      //   color: "#ff000098",
      //   className: "opBEngineOffCoasting",
      //   zIndex: 0,
      //   custom: {
      //     speed: c.speed,
      //     dateGps: c.startDate,
      //   },
      // })),
      ...opBEngineOnMoving.map((c) => ({
        from: new Date(c.startDate).getTime(),
        to: new Date(c.endDate).getTime(),
        color: "#f1fbcc",
        zIndex: 0,
        className: "opBEngineOnMoving",
        custom: {
          speed: c.speed,
          dateGps: c.startDate,
        },
      })),
      ...opBEngineOnIdle.map((c) => ({
        from: new Date(c.startDate).getTime(),
        to: new Date(c.endDate).getTime(),
        color: "#ccf1fb",
        zIndex: 0,
        className: "opBEngineOnIdle",
        custom: {
          speed: c.speed,
          dateGps: c.startDate,
        },
      })),
    ];
  }, [opBEngineOff, opBEngineOnMoving, opBEngineOnIdle]);

  const chartOptions = useMemo(() => {
    // @ts-expect-error //No se puede determinar el tipo de Chart
    const removeSeries = (chart) => {
      const serieFuelCAN = chart.series.find(
        (serie: { name: string }) =>
          serie.name === LANGUAGE.highCharts.titles.fuelVariationCAN
      );

      const serieFuelSensor = chart.series.find(
        (serie: { name: string }) =>
          serie.name === LANGUAGE.highCharts.titles.fuelVariation
      );

      if (fuelDataData.showData.isSensor) {
        if (serieFuelCAN) {
          serieFuelCAN.remove(false);
          chart.redraw();
        }
      } else if (fuelDataData.showData.isCAN) {
        if (serieFuelSensor) {
          serieFuelSensor.remove(false);
          chart.redraw();
        }
      } else {
        if (serieFuelSensor && serieFuelCAN) {
          serieFuelSensor.remove(false);
          serieFuelCAN.remove(false);
          chart.redraw();
        }
      }
    };

    return {
      xAxis: {
        type: "datetime",
        plotBands: plotBands,
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
          // Por defecto, el navigator toma la primera serie solamente
          showInNavigator: true,
          cursor: "pointer",
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
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titleCharges,
              chargesTooltipFields
            ),
          },
        },
        {
          yAxis: 0,
          type: "column",
          pointWidth: 20,
          name: LANGUAGE.highCharts.titles.disCharges,
          data: disChargesData,
          color: "#ff2033",
          showInNavigator: true,
          cursor: "pointer",
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
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titleDischarges,
              dischargesTooltipFields
            ),
          },
        },
        {
          yAxis: 0,
          name: LANGUAGE.highCharts.titles.fuelVariationCAN,
          type: "line",
          data: levelMessagesCANData,
          color: "#f77f00",
          lineWidth: 2,
          showInNavigator: true,
          cursor: "pointer",
          tooltip: {
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titleFuelVariationCAN,
              levelMessagesTooltipFields
            ),
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
          yAxis: 0,
          name: LANGUAGE.highCharts.titles.fuelVariation,
          type: "line",
          data: levelMessagesData,
          color: "#006af5",
          lineWidth: 2,
          showInNavigator: true,
          cursor: "pointer",
          tooltip: {
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titleFuelVariation,
              levelMessagesTooltipFields
            ),
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
          type: "line",
          data: performancesBetweenChargesData,
          marker: { enabled: true, radius: 4, symbol: "square" },
          color: "#f5c800",
          visible: false,
          showInNavigator: true,
          tooltip: {
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titlePerformanceBetween,
              performancesBetweenChargesTooltipFields
            ),
          },
        },
        {
          yAxis: 1,
          name: LANGUAGE.highCharts.titles.dailyPerformance,
          type: "line",
          data: dailyPerformancesData,
          marker: { enabled: true, radius: 4, symbol: "circle" },
          color: "#8f07ff",
          visible: false,
          showInNavigator: true,
          tooltip: {
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titlePerformanceDaily,
              performancesBetweenChargesTooltipFields
            ),
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
        headerFormat: "",
        style: {
          pointerEvents: "none",
        },
      },
      chart: {
        zooming: {
          type: "x",
        },
        height: 600,
        // panning: true,
        events: {
          render: function () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const chart = this;
            removeSeries(chart);
          },
        },
      },
      legend: {
        enabled: true,
        itemStyle: {
          fontSize: "18px",
        },
        itemHiddenStyle: { color: "#9aa0a6", textDecoration: "none" },
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
        xrange: {
          pointPadding: 0,
          groupPadding: 0,
          borderWidth: 0,
        },
      },
      accessibility: { enabled: false },
    };
  }, [
    LANGUAGE,
    chargesData,
    chargesTooltipFields,
    dailyPerformancesData,
    disChargesData,
    dischargesTooltipFields,
    fuelDataData,
    levelMessagesCANData,
    levelMessagesData,
    levelMessagesTooltipFields,
    performancesBetweenChargesData,
    performancesBetweenChargesTooltipFields,
    plotBands,
  ]);

  return (
    <>
      <HighchartNext isStock chartStockOptions={chartOptions} />
    </>
  );
};
