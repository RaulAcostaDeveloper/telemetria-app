"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import CardContentDrivenTime from "@/modules/global/components/cardsDeck/cardContentDrivenTime";
import CardContentIdle from "@/modules/global/components/cardsDeck/cardContentIdle";
import CardContentTCT5 from "@/modules/global/components/cardsDeck/cardContentTCT5";
import CardGenThird from "@/modules/global/components/cardsDeck/cardGenThird";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./OBDDataProvider.module.css";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { ErrorMessage } from "@/modules/global/components/errorMessage/errorMessage";
import { FuelDataReport } from "@/modules/fuel/components/fuelNowContainer/fuelDataReport/fuelDataReport";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Table } from "@/modules/global/components";
import { fetchObdRollup } from "@/globalConfig/redux/slices/obdRollupSlice";
import { formatNumberWithCommas } from "@/modules/global/utils/utils";
import { telemetryVehiclesOBD } from "@/modules/global/dataMock/telemetryVehiclesOBD/telemetryVehiclesOBD";

interface Props {
  LANGUAGE: LanguageInterface;
  showTable?: boolean; //Esconde la tabla si el módulo es usado en Home.
}

export const OBDDataProvider = ({ LANGUAGE, showTable }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { obdRollupData, obdRollupStatus } = useSelector(
    (state: RootState) => state.obdRollup
  );

  useEffect(() => {
    dispatch(
      fetchObdRollup({
        accountId: "90926",
        startDate: "2025-07-17T00:00:00", // formatToLocalIso8601(startDate),
        endDate: "2025-10-21T00:00:00",
      })
    );
  }, [startDate, endDate, dispatch]);

  const teleVehiclesOBDData: dataTable | undefined =
    telemetryVehiclesOBD?.value.vehicles.map((value) => ({
      name: value.name,
      plate: value.plate,
      kilometerMarker: value.kilometerMarker,
      fuelType: value.fuelType,
      litersPerHour: value.litersPerHour,
      totalDistance: value.totalDistance,
      totalEngineHours: value.totalEngineHours,
      totalConsumed: value.totalConsumed,
      totalIdleHours: value.totalIdleHours,
      imeIs: value.imeIs[0],
    }));

  const teleVehiclesOBDColumns: columnsTable = [
    {
      columnName: LANGUAGE.teleOBD.tableColumns.name,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.plate,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.kilometerMarker,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.fuelType,
      defaultSpace: 3,
      filterSelector: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.litersPerHour,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalDistance,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalEngineHours,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalConsumed,
      defaultSpace: 3,
      minMaxFilter: true,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalIdleHours,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
  ];

  return (
    <div className={styles.telemetryObd}>
      {obdRollupStatus === "succeeded" &&
        obdRollupData &&
        teleVehiclesOBDData && (
          <>
            <section>
              <div className={styles.resumeContainer}>
                <FuelDataReport
                  Icon={DirectionsCarFilledIcon}
                  LANGUAGE={LANGUAGE}
                  data={formatNumberWithCommas(
                    obdRollupData.value.unitsAnalyzed
                  )}
                  title={LANGUAGE.fuel.summaryReports.labels.unitsAnalyzed}
                />
                <FuelDataReport
                  Icon={NorthEastIcon}
                  LANGUAGE={LANGUAGE}
                  data={
                    formatNumberWithCommas(obdRollupData.value.driverDistance) +
                    " km"
                  }
                  title={LANGUAGE.teleOBD.resumes.distance}
                />
                <FuelDataReport
                  Icon={AccessTimeIcon}
                  LANGUAGE={LANGUAGE}
                  data={
                    formatNumberWithCommas(obdRollupData.value.driverTime) +
                    " h"
                  }
                  title={LANGUAGE.teleOBD.resumes.timeDriven}
                />
                <FuelDataReport
                  Icon={HourglassDisabledIcon}
                  LANGUAGE={LANGUAGE}
                  data={
                    formatNumberWithCommas(
                      obdRollupData.value.driverIdleTime ?? 0
                    ) + " h"
                  }
                  title={LANGUAGE.teleOBD.resumes.timeIdle}
                />
              </div>
            </section>
            <section className={styles.cardssection}>
              <CardGenThird>
                <CardContentTCT5
                  data={obdRollupData.value}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
              <CardGenThird>
                <CardContentDrivenTime
                  data={obdRollupData.value}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
              <CardGenThird>
                <CardContentIdle
                  data={obdRollupData.value}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
            </section>
            {showTable && (
              <Table
                title={LANGUAGE.teleOBD.tableTitle.registerTeleOBD}
                LANGUAGE={LANGUAGE}
                columns={teleVehiclesOBDColumns}
                data={teleVehiclesOBDData}
                showGoFuel
                showGoOBD
                idKey="imeIs"
              />
            )}
          </>
        )}

      {obdRollupStatus === "loading" && (
        <div>
          <LoaderAnimation />
        </div>
      )}

      {obdRollupStatus === "failed" && <ErrorMessage LANGUAGE={LANGUAGE} />}
    </div>
  );
};
