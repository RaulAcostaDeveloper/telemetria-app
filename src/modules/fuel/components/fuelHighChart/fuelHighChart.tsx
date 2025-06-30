"use client";
import { useMemo } from "react";
// import { useDispatch } from "react-redux";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighstockInit from "highcharts/modules/stock";

// import { openGoogleMapsModal } from "@/globalConfig/redux/slices/googleMapsModalSlice";
import {
  createTooltipFormatter,
  getChargesTooltipFields,
} from "../../utils/tooltipHighchartFormatter";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { fuelVehicleMetricsDataMock } from "@/modules/global/dataMock/fuelVehicleMetrics/fuelVehicleMetrics";

const {
  value: [{ Charges }],
} = fuelVehicleMetricsDataMock;

interface Props {
  LANGUAGE: LanguageInterface;
}

if (typeof HighstockInit === "function") {
  (HighstockInit as (hc: typeof Highcharts) => void)(Highcharts);
}

export const FuelHighChart = ({ LANGUAGE }: Props) => {
  //   const dispatch = useDispatch();

  //   Debe definir lo que habrá en el tooltip de cada serie
  const chargesTooltipFields = getChargesTooltipFields(
    LANGUAGE.fuelVehicle.fuelChargesLabels
  );

  const charges = useMemo(() => {
    return Charges.map((c) => ({
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
    })).sort((a, b) => a.x - b.x);
  }, [Charges]);

  const chartOptions = useMemo(
    () => ({
      title: {
        text: "",
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
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
      yAxis: {
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
      series: [
        {
          type: "column",
          name: LANGUAGE.fuelVehicle.fuelLoadsChart.fuelVariation,
          data: charges,
          marker: { enabled: true, radius: 4, symbol: "circle" },
          point: {
            events: {
              click: (e: any) => {
                const fullCharge = (e.point.options as any).custom;
                // dispatch(openGoogleMapsModal(fullCharge));
              },
            },
          },
          dataLabels: { enabled: false },
          tooltip: {
            pointFormatter: createTooltipFormatter(chargesTooltipFields),
          },
        },
      ],
      tooltip: {
        useHTML: true,
        shared: false,
        borderRadius: 6,
        padding: 10,
        shadow: true,
      },
      chart: {
        height: 500,
        panning: true,
      },
      legend: {
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
    [charges]
  );

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType="stockChart"
      options={chartOptions}
    />
  );
};
