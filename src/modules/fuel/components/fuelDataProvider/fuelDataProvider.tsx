"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { LocalShipping, LocalGasStation } from "@mui/icons-material";

// import { FuelFilter } from "../fuelFilter/fuelFilter";
import DonutGraphic from "@/modules/fuel/components/donutGraphic/DonutGraphic";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "./fuelDataProvider.module.css";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table, TabsContent } from "@/global/components";
import { columnsTable } from "@/global/components/table/table.model";
import { FuelSummaryData } from "@/global/redux/serviceSlices/fuelSummarySlice";
import { toLocalDateTime } from "@/global/utils/utils";

interface Props {
  LANGUAGE: LanguageInterface;
  hideTabs?: boolean;
}

export const FuelDataProvider = ({ LANGUAGE, hideTabs = false }: Props) => {
  const [fuelSummaryDataFormated, setFuelSummaryDataFormated] =
    useState<FuelSummaryData>();

  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );

  const { topFuelReportData, topFuelReportStatus } = useSelector(
    (state: RootState) => state.topFuelReport
  );

  useEffect(() => {
    if (fuelSummaryData?.value) {
      const devices = fuelSummaryData.value.devices.map((messages) => ({
        ...messages,
        lastReportDate: toLocalDateTime(messages.lastReportDate),
      }));

      const dataFormated = {
        ...fuelSummaryData,
        value: {
          ...fuelSummaryData.value,
          devices,
        },
      };

      setFuelSummaryDataFormated(dataFormated);
    }
  }, [fuelSummaryData]);

  const tabOptions = [
    {
      text: LANGUAGE.fuel.tabs.unitys,
      icon: LocalShipping,
    },
    {
      text: LANGUAGE.fuel.tabs.topCharges,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(4, 187, 4)" },
    },
    {
      text: LANGUAGE.fuel.tabs.topDischarges,
      icon: LocalGasStation,
      iconStyle: { color: "rgb(223, 44, 59)" },
    },
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 5,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceOdometer,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 4,
      orderColumn: true,
    },
  ];

  const vehiclesReport = useMemo(() => {
    return fuelSummaryDataFormated?.value?.devices.map((value) => ({
      name: value.name,
      plate: value.plate,
      lastFuelLevel: value.lastFuelLevel,
      performanceOdometer: value.performanceOdometer,
      fuelLoadCount: value.fuelLoadCount,
      fuelUnloadCount: value.fuelUnloadCount,
      fuelLoaded: value.fuelLoaded,
      fuelUnloaded: value.fuelUnloaded,
      lastReportDate: value.lastReportDate,
      imei: value.imei,
    }));
  }, [fuelSummaryDataFormated]);

  const topFuelReportChargesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.groupName,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.driver,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.vehicleType,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
  ];

  const topFuelReportCharges = useMemo(() => {
    return topFuelReportData?.value?.charges.map((value) => ({
      name: value.name,
      plate: value.plate,
      brand: value.brand,
      model: value.model,
      group: value.group,
      driver: value.driver,
      vehicleType: value.vehicleType,
      serialNumber: value.serialNumber,
      totalCharges: value.totalNumberCharges,
      totalLitersCharges: value.totalLitersCharges,
      imei: value.imeis[0],
      id: value.id,
      clientOwnerName: value.clientOwnerName,
      economicNumber: value.economicNumber,
    }));
  }, [topFuelReportData]);

  const topFuelReportDischargesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.plates,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.brand,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.model,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.groupName,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.driver,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.vehicleType,
      defaultSpace: 4,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.management.tableColumns.serialNumber,
      defaultSpace: 4,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
      minMaxFilter: true,
    },
  ];

  const topFuelReportDischarges = useMemo(() => {
    return topFuelReportData?.value?.discharges.map((value) => ({
      name: value.name,
      plate: value.plate,
      brand: value.brand,
      model: value.model,
      group: value.group,
      driver: value.driver,
      vehicleType: value.vehicleType,
      serialNumber: value.serialNumber,
      totalNumberDischarges: value.totalNumberDischarges,
      totalLitersDischarges: value.totalLitersDischarges,
      imei: value.imeis[0],
      id: value.id,
      clientOwnerName: value.clientOwnerName,
      economicNumber: value.economicNumber,
    }));
  }, [topFuelReportData]);

  return (
    <div>
      {/* Descomentar para mostrar el filtrado de combustible */}
      {/* <FuelFilter
          LANGUAGE={LANGUAGE}
          callFetchFuelSummary={callFetchFuelSummary}
        /> */}

      <div className={styles.topResumeData}>
        {fuelSummaryStatus === SERVICE_STATUS.succeeded &&
          fuelSummaryDataFormated?.value && (
            <>
              <ReportSummary summaryValues={fuelSummaryDataFormated.value} />
              <DonutGraphic devices={fuelSummaryDataFormated.value.devices} />
            </>
          )}

        <DataErrorHandler
          LANGUAGE={LANGUAGE}
          hasData={!!fuelSummaryData?.value}
          infoStatus={fuelSummaryStatus}
        />
      </div>
      {!hideTabs && (
        <div className={styles.fuelTabs}>
          <TabsContent
            tabOptions={tabOptions}
            tabContents={[
              <div key={1}>
                {fuelSummaryStatus === SERVICE_STATUS.succeeded &&
                  vehiclesReport && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={vehiclesColumns}
                      data={vehiclesReport}
                      idKey="imei"
                      showGoFuel
                      showGoOBD
                    />
                  )}

                <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!vehiclesReport}
                  infoStatus={fuelSummaryStatus}
                />
              </div>,
              <div key={2}>
                {topFuelReportStatus === SERVICE_STATUS.succeeded &&
                  topFuelReportCharges && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={topFuelReportChargesColumns}
                      data={topFuelReportCharges}
                      idKey="imei"
                      showViewModal
                      showGoFuel
                      showGoOBD
                    />
                  )}

                <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!topFuelReportCharges}
                  infoStatus={topFuelReportStatus}
                />
              </div>,
              <div key={3}>
                {topFuelReportStatus === SERVICE_STATUS.succeeded &&
                  topFuelReportDischarges && (
                    <Table
                      LANGUAGE={LANGUAGE}
                      columns={topFuelReportDischargesColumns}
                      data={topFuelReportDischarges}
                      idKey="imei"
                      showViewModal
                      showGoFuel
                      showGoOBD
                    />
                  )}

                <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={!!topFuelReportDischarges}
                  infoStatus={topFuelReportStatus}
                />
              </div>,
            ]}
          />
        </div>
      )}
    </div>
  );
};
