"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import CardContentDrivenTime from "@/modules/global/components/cardsDeck/cardContentDrivenTime";
import CardContentIdle from "@/modules/global/components/cardsDeck/cardContentIdle";
import CardContentTCT5 from "@/modules/global/components/cardsDeck/cardContentTCT5";
import CardGenThird from "@/modules/global/components/cardsDeck/cardGenThird";
import styles from "./OBDDataProvider.module.css";
import { DataErrorHandler } from "@/modules/global/components/DataErrorHandler/DataErrorHandler";
import { FuelDataReport } from "@/modules/fuel/components/fuelNowContainer/fuelDataReport/fuelDataReport";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { RootState } from "@/globalConfig/redux/store";
import { Table } from "@/modules/global/components";
import { columnsTable } from "@/modules/global/components/table/table.model";
import { formatNumberWithCommas } from "@/modules/global/utils/utils";

interface Props {
  LANGUAGE: LanguageInterface;
  showTable?: boolean; //Esconde la tabla si el módulo es usado en Home.
}

export const OBDDataProvider = ({ LANGUAGE, showTable }: Props) => {
  const { obdRollupData, obdRollupStatus } = useSelector(
    (state: RootState) => state.obdRollup
  );

  const teleVehiclesOBDData = useMemo(() => {
    return obdRollupData?.value?.details.map((value) => ({
      name: value.name,
      plate: value.plate,
      driverDistance: value.driverDistance ?? "ND",
      averageSpeed: value.averageSpeed,
      driverTime: value.driverTime,
      driverIdleTime: value.driverIdleTime,
      maxSpeed: value.maxSpeed,
      imei: value.imei,
    }));
  }, [obdRollupData]);

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
      columnName: LANGUAGE.teleOBD.tableColumns.driverDistance,
      defaultSpace: 4,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.averageSpeed,
      defaultSpace: 5,
      minMaxFilter: true,
      orderColumn: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.driverTime,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.driverIdleTime,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.maxSpeed,
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
        obdRollupData.value &&
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
                idKey="imei"
                windowMaxSize={50}
              />
            )}
          </>
        )}

      <DataErrorHandler
        LANGUAGE={LANGUAGE}
        hasData={!!obdRollupData}
        infoStatus={obdRollupStatus}
      />
    </div>
  );
};
