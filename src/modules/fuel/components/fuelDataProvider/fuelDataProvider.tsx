"use client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "./fuelDataProvider.module.css";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { FuelFilter } from "../fuelFilter/fuelFilter";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Table, TabsContent } from "@/modules/global/components";
import { fetchFuelSummary } from "@/globalConfig/redux/slices/fuelSummarySlice";
import { fetchTopFuelReport } from "@/globalConfig/redux/slices/topFuelReportSlice";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelDataProvider = ({ LANGUAGE }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );

  const { brandsData, brandsStatus } = useSelector(
    (state: RootState) => state.brands
  );

  const { topFuelReportData, topFuelReportStatus } = useSelector(
    (state: RootState) => state.topFuelReport
  );

  const callFetchFuelSummary = useCallback(() => {
    dispatch(
      fetchFuelSummary({
        accountId: "4992",
        startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate),
        endDate: "2024-08-21T00:00:00",
        performanceType: "1",
      })
    );
    dispatch(
      fetchTopFuelReport({
        accountId: "90926",
        startDate: "2024-09-01T00:00:00", // formatToLocalIso8601(startDate),
        endDate: "2024-09-30T00:00:00",
        numberOfVehicles: 10,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    callFetchFuelSummary();
  }, [callFetchFuelSummary, startDate, endDate]);

  const tabOptions = [
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.topCharges,
    LANGUAGE.fuel.tabs.topDischarges,
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 3,
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
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 6,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 3,
      orderColumn: true,
    },
  ];

  const vehiclesReport: dataTable | undefined =
    fuelSummaryData?.value.devices.map((value) => ({
      name: value.name,
      lastFuelLevel: value.lastFuelLevel,
      performanceOdometer: value.performanceOdometer,
      fuelLoadCount: value.fuelLoadCount,
      fuelUnloadCount: value.fuelUnloadCount,
      fuelLoaded: value.fuelLoaded,
      fuelUnloaded: value.fuelUnloaded,
      plate: value.plate,
      lastReportDate: value.lastReportDate,
      imei: value.imei,
    }));

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

  const topFuelReportCharges: dataTable | undefined =
    topFuelReportData?.value.charges.map((value) => ({
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

  const topFuelReportDischarges: dataTable | undefined =
    topFuelReportData?.value.discharges.map((value) => ({
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

  return (
    <div>
      {brandsStatus === "succeeded" && brandsData ? (
        <FuelFilter
          LANGUAGE={LANGUAGE}
          callFetchFuelSummary={callFetchFuelSummary}
          brandsData={brandsData.value.brands.map((item) => item.name)}
        />
      ) : (
        <div>
          <LoaderAnimation />
        </div>
      )}

      <div className={styles.topResumeData}>
        {fuelSummaryStatus === "succeeded" && fuelSummaryData ? (
          <>
            <ReportSummary summaryValues={fuelSummaryData.value} />
            <DonutGraphic devices={fuelSummaryData.value.devices} />
          </>
        ) : (
          <div>
            <LoaderAnimation />
          </div>
        )}
      </div>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            {fuelSummaryStatus === "succeeded" && vehiclesReport ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={vehiclesColumns}
                data={vehiclesReport}
                idKey="imei"
                showGoFuel
                showGoOBD
              />
            ) : (
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
          <div key={2}>
            {topFuelReportStatus === "succeeded" && topFuelReportCharges ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={topFuelReportChargesColumns}
                data={topFuelReportCharges}
                idKey="imei"
                showViewModal
                showGoFuel
                showGoOBD
              />
            ) : (
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
          <div key={3}>
            {topFuelReportStatus === "succeeded" && topFuelReportDischarges ? (
              <Table
                LANGUAGE={LANGUAGE}
                columns={topFuelReportDischargesColumns}
                data={topFuelReportDischarges}
                idKey="imei"
                showViewModal
                showGoFuel
                showGoOBD
              />
            ) : (
              <div>
                <LoaderAnimation />
              </div>
            )}
          </div>,
        ]}
      />
    </div>
  );
};
