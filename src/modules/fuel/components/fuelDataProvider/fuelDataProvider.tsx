"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { LocalShipping, LocalGasStation, Map } from "@mui/icons-material";

// import { FuelFilter } from "../fuelFilter/fuelFilter";
import DonutGraphic from "@/modules/fuel/components/donutGraphic/DonutGraphic";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "./fuelDataProvider.module.css";
// import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FuelPageZonesTable } from "@/modules/zones/components/fuelPageZonesTable/fuelPageZonesTable";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
// import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table, TabsContent } from "@/global/components";
import { columnsTable } from "@/global/components/table/table.model";
import { legibleDate } from "@/global/utils/dateUtils";
import { summaryFuelDataMock } from "@/global/dataMock/fuelSummary";

interface Props {
  LANGUAGE: LanguageInterface;
  hideTabs?: boolean;
}

export const FuelDataProvider = ({ LANGUAGE, hideTabs = false }: Props) => {
  const { fuelSummaryData } = useSelector(
    (state: RootState) => state.fuelSummary,
  );

  const tabOptions = [
    {
      text: LANGUAGE.fuel.tabs.unitys,
      icon: LocalShipping,
    },
    {
      text: LANGUAGE.fuel.tabs.charges,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4, 187, 4)" },
    },
    {
      text: LANGUAGE.fuel.tabs.discharges,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(223, 44, 59)" },
    },
    {
      text: LANGUAGE.fuel.tabs.zones,
      icon: Map,
    },
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 4,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: false,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceOdometer,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: false,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: false,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: false,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: false,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: false,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 5,
      orderColumn: true,
    },
  ];

  const vehiclesReport = useMemo(() => {
    return summaryFuelDataMock.devices.map((value) => ({
      name: value.name,
      plate: value.plate,
      lastFuelLevel: value.lastFuelLevel,
      performanceOdometer: value.performanceOdometer,
      fuelLoadCount: value.fuelLoadCount,
      fuelUnloadCount: value.fuelUnloadCount,
      fuelLoaded: value.fuelLoaded,
      fuelUnloaded: value.fuelUnloaded,
      lastReportDate: value.lastReportDate
        ? legibleDate(value.lastReportDate, LANGUAGE.localeLanguage)
        : "",
      imei: value.imei,
    }));
  }, [fuelSummaryData]);

  const fuelReportChargesColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.tabs.loadTable.vehicleId,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.zones.tabs.loadTable.date,
      defaultSpace: 5,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelStart} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.zones.tabs.loadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelEnd} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const fuelReportCharges = useMemo(() => {
    return summaryFuelDataMock.charges.map((value) => ({
      vehicle: value.imei,
      date: legibleDate(value.dateGps, LANGUAGE.localeLanguage),
      initialFuel: value.initialFuel,
      charge: value.magnitude,
      finalFuel: value.finalFuel,
      imei: value.imeiClean,
      idZone: value.zoneId,
    }));
  }, [fuelSummaryData]);

  const fuelReportDischargesColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.tabs.loadTable.vehicleId,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.zones.tabs.loadTable.date,
      defaultSpace: 5,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelStart} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.zones.tabs.unloadTable.loadValue} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: `${LANGUAGE.fuelVehicle.vehicleReports.fuelEnd} (L)`,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const fuelReportDischarges = useMemo(() => {
    return summaryFuelDataMock.discharges.map((value) => ({
      vehicle: value.imei,
      date: legibleDate(value.dateGps, LANGUAGE.localeLanguage),
      initialFuel: value.initialFuel,
      discharge: value.magnitude,
      finalFuel: value.finalFuel,
      imei: value.imeiClean,
      idZone: value.zoneId,
    }));
  }, [fuelSummaryData]);

  /* const zonesColumns: columnsTable = []; */

  return (
    <div>
      {/* Descomentar para mostrar el filtrado de combustible */}
      {/* <FuelFilter
          LANGUAGE={LANGUAGE}
          callFetchFuelSummary={callFetchFuelSummary}
        /> */}

      <div className={styles.topResumeData}>
        <ReportSummary summaryValues={summaryFuelDataMock} />
        <DonutGraphic devices={summaryFuelDataMock.devices} />
        {/* {
        fuelSummaryStatus === SERVICE_STATUS.succeeded &&
          fuelSummaryData?.value && (
            <>
              <ReportSummary summaryValues={fuelSummaryData.value} />
              <DonutGraphic devices={fuelSummaryData.value.devices} />
            </>
          )} */}

        {/* <DataErrorHandler
          LANGUAGE={LANGUAGE}
          hasData={!!fuelSummaryData?.value}
          infoStatus={fuelSummaryStatus}
          statusCode={fuelSummaryData?.statusCode}
        /> */}
      </div>
      {!hideTabs && (
        <div className={styles.fuelTabs}>
          <TabsContent
            tabOptions={tabOptions}
            tabContents={[
              <div key={1}>
                {
                  // fuelSummaryStatus === SERVICE_STATUS.succeeded &&
                  vehiclesReport && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={vehiclesColumns}
                      data={vehiclesReport}
                      idImei="imei"
                    />
                  )
                }

                {/* <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!vehiclesReport}
                  infoStatus={fuelSummaryStatus}
                  statusCode={fuelSummaryData?.statusCode}
                /> */}
              </div>,
              <div key={2}>
                {
                  // fuelSummaryStatus === SERVICE_STATUS.succeeded &&
                  fuelReportCharges && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={fuelReportChargesColumns}
                      data={fuelReportCharges}
                      showViewModal
                      idImei="imei"
                    />
                  )
                }

                {/* <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!fuelReportCharges}
                  infoStatus={fuelSummaryStatus}
                  statusCode={fuelSummaryData?.statusCode}
                /> */}
              </div>,
              <div key={3}>
                {
                  // fuelSummaryStatus === SERVICE_STATUS.succeeded &&
                  fuelReportDischarges && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={fuelReportDischargesColumns}
                      data={fuelReportDischarges}
                      showViewModal
                      idImei="imei"
                    />
                  )
                }

                {/* <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!fuelReportDischarges}
                  infoStatus={fuelSummaryStatus}
                  statusCode={fuelSummaryData?.statusCode}
                /> */}
              </div>,
              <div key={4}>
                <FuelPageZonesTable LANGUAGE={LANGUAGE} />
              </div>,
            ]}
          />
        </div>
      )}
    </div>
  );
};
