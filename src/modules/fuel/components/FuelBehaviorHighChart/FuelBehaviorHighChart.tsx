"use client";
import { useCallback, useMemo, useState } from "react";

import {
  createTooltipFormatter,
  getChargesTooltipFields,
  getDisChargesTooltipFields,
  getLevelMessagesTooltipFields,
  getPerformancesBetweenChargesTooltipFields,
  getSpeedTooltipFields,
} from "@/global/utils/highChartUtils";
import {
  getLabelsForChargeGeoMap,
  getLabelsForDischargeGeoMap,
  getLabelsForLevelMessagesGeoMap,
} from "@/global/utils/geoMapUtils";
import { FuelDataValues } from "@/global/redux/serviceSlices/fuelDataSlice";
import GeoModal, { GeoModalData } from "@/global/components/geoModal/geoModal";
import { HighchartNext } from "@/global/components/highchartNext/highchartNext";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { OBValue } from "../fuelReportDataProvider/fuelReportDataProvider";
import { formatTankValuesToInt } from "@/global/utils/mathUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  fuelDataData: FuelDataValues;
  opBEngineOff: OBValue[];
  /* opBEngineOffCoasting: OBValue[]; */
  opBEngineOnIdle: OBValue[];
  opBEngineOnMoving: OBValue[];
}

export const FuelBehaviorHighChart = ({
  LANGUAGE,
  fuelDataData,
  opBEngineOff,
  // opBEngineOffCoasting,
  opBEngineOnIdle,
  opBEngineOnMoving,
}: Props) => {
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const [isModalFuelOpen, setIsModalFuelOpen] = useState(false);

  const handleClicGeoData = useCallback((geoModalData: GeoModalData) => {
    setGeoModalData(geoModalData);
    setIsModalFuelOpen(true);
  }, []);

  const sensorOrCAN = fuelDataData.showData.isSensor ? "sensor" : "can";

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

  const speedTooltipFields = useMemo(() => {
    return getSpeedTooltipFields(LANGUAGE);
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
          finalFuel: c.finalFuel != null ? Math.round(c.finalFuel) : null,
          ignition: Boolean(c.ignition),
          initialFuel: c.initialFuel != null ? Math.round(c.initialFuel) : null,
          lat: c.lat,
          lon: c.lon,
          magnitude: c.magnitude != null ? Math.round(c.magnitude) : null,
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
          finalFuel: c.finalFuel != null ? Math.round(c.finalFuel) : null,
          ignition: Boolean(c.ignition),
          initialFuel: c.initialFuel != null ? Math.round(c.initialFuel) : null,
          lat: c.lat,
          lon: c.lon,
          magnitude: c.magnitude != null ? Math.round(c.magnitude) : null,
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
        y:
          sensorOrCAN === "sensor"
            ? c.sensorCurrentLevelSmoothly
            : c.canCurrentLevelSmoothly,
        custom: {
          dateGps: c.dateGps,
          lat: c.lat,
          lon: c.lon,
          odometer: c.odometer,
          speed: c.speed,
          ignition: Boolean(c.ignition),
          deviceBattery: c.deviceBattery,
          mainPower: c.externalPower,
          tanks: formatTankValuesToInt(c.tanks),
          currentLevelSmoothly:
            c.sensorCurrentLevelSmoothly != null
              ? Math.round(c.sensorCurrentLevelSmoothly)
              : null,
        },
      }))
      .sort((a, b) => a.x - b.x);
  }, [fuelDataData, sensorOrCAN]);

  const speedData = useMemo(() => {
    return fuelDataData.levelMessages
      .map((s) => ({
        x: new Date(s.dateGps).getTime(),
        y: s.speed,
        custom: {
          dateGps: s.dateGps,
          lat: s.lat,
          lon: s.lon,
          odometer: s.odometer,
          speed: s.speed,
          ignition: Boolean(s.ignition),
          deviceBattery: s.deviceBattery,
          mainPower: s.externalPower,
          tanks: formatTankValuesToInt(s.tanks),
          currentLevelSmoothly:
            s.sensorCurrentLevelSmoothly != null
              ? Math.round(s.sensorCurrentLevelSmoothly)
              : null,
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
          endDate: c.endDatePerformance,
          dateGps: c.startDatePerformance,
          averagePerformance: c.averagePerformance,
          fuelConsumed:
            c.fuelConsumed != null ? Math.round(c.fuelConsumed) : null,
          initialLevel:
            c.initialLevel != null ? Math.round(c.initialLevel) : null,
          finalLevel: c.finalLevel != null ? Math.round(c.finalLevel) : null,
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
          endDate: c.endDate,
          dateGps: c.startDate,
          averagePerformance: c.averagePerformance,
          fuelConsumed:
            c.fuelConsumed != null ? Math.round(c.fuelConsumed) : null,
          initialLevel:
            c.initialLevel != null ? Math.round(c.initialLevel) : null,
          finalLevel: c.finalLevel != null ? Math.round(c.finalLevel) : null,
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
    // Performance between chargers On en la gráfica
    // Para controlar título del eje Y "Performance"
    let isPerfBetwChargOn: boolean = false;
    let isDailyPerformanceOn: boolean = false;

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
            text: "", // Se controla en la serie
            style: {
              fontSize: "13px",
              fontWeight: "bold",
            },
          },
          opposite: true,
        },
        // Speed
        {
          labels: {
            style: {
              fontSize: "0px",
              fontWeight: "bold",
            },
          },
          title: {
            text: "", // LANGUAGE.highCharts.axisTitles.speed,
            style: {
              fontSize: "0px",
              fontWeight: "bold",
            },
          },
          opposite: false,
          max: 250,
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
              chargesTooltipFields,
            ),
          },
        },
        {
          yAxis: 0,
          type: "column",
          pointWidth: 20,
          name: LANGUAGE.highCharts.titles.disCharges,
          data: disChargesData,
          marker: { enabled: false, symbol: "diamond" },
          color: "#ff2033",
          showInNavigator: true,
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
              dischargesTooltipFields,
            ),
          },
        },
        {
          yAxis: 0,
          name:
            sensorOrCAN === "sensor"
              ? LANGUAGE.highCharts.titles.fuelVariation
              : LANGUAGE.highCharts.titles.fuelVariationCAN,
          type: "line",
          data: levelMessagesData,
          marker: { enabled: false, symbol: "diamond" },
          color: "#006af5",
          lineWidth: 2,
          showInNavigator: true,
          tooltip: {
            pointFormatter: createTooltipFormatter(
              sensorOrCAN === "sensor"
                ? LANGUAGE.highCharts.tooltips.fuel.titleFuelVariation
                : LANGUAGE.highCharts.tooltips.fuel.titleFuelVariationCAN,
              levelMessagesTooltipFields,
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
              performancesBetweenChargesTooltipFields,
            ),
          },
          // Toggle del Título "Performance"
          events: {
            show(this: Highcharts.Series) {
              isPerfBetwChargOn = true;
              this.chart.yAxis[1].setTitle(
                { text: LANGUAGE.highCharts.axisTitles.performance },
                false,
              );
            },
            hide(this: Highcharts.Series) {
              isPerfBetwChargOn = false;
              if (!isDailyPerformanceOn) {
                this.chart.yAxis[1].setTitle({ text: "" }, false);
              }
            },
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
              performancesBetweenChargesTooltipFields,
            ),
          },
          // Toggle del Título "Performance"
          events: {
            show(this: Highcharts.Series) {
              isDailyPerformanceOn = true;
              this.chart.yAxis[1].setTitle(
                { text: LANGUAGE.highCharts.axisTitles.performance },
                false,
              );
            },
            hide(this: Highcharts.Series) {
              isDailyPerformanceOn = false;
              if (!isPerfBetwChargOn) {
                this.chart.yAxis[1].setTitle({ text: "" }, false);
              }
            },
          },
        },
        {
          yAxis: 2,
          name: LANGUAGE.highCharts.titles.speed,
          type: "line",
          data: speedData,
          color: "#b3e207",
          lineWidth: 2,
          visible: false,
          showInNavigator: true,
          cursor: "pointer",
          tooltip: {
            pointFormatter: createTooltipFormatter(
              LANGUAGE.highCharts.tooltips.fuel.titleSpeed,
              speedTooltipFields,
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
          render: function () {},
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
    speedTooltipFields,
    levelMessagesData,
    speedData,
    levelMessagesTooltipFields,
    performancesBetweenChargesData,
    performancesBetweenChargesTooltipFields,
    plotBands,
    handleClicGeoData,
    sensorOrCAN,
  ]);

  return (
    <>
      <HighchartNext isStock chartStockOptions={chartOptions} />
      {isModalFuelOpen && geoModalData && (
        <GeoModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsModalFuelOpen(false)}
          geoModalData={geoModalData}
        />
      )}
    </>
  );
};
