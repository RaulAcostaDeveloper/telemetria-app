"use client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
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
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";

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

  const callFetchFuelSummary = useCallback(() => {
    dispatch(
      fetchFuelSummary({
        accountId: "4992",
        startDate: "2024-08-17T00:00:00", // formatToLocalIso8601(startDate),
        endDate: "2024-08-21T00:00:00",
        performanceType: "1",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    callFetchFuelSummary();
  }, [callFetchFuelSummary, startDate, endDate]);

  const tabOptions = [
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.zones,
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 3,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceOdometer,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 2,
      orderColumn: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      orderColumn: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 6,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 3,
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
                showGoOBT
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
