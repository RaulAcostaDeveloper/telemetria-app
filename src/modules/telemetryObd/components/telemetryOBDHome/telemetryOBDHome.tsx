import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import NorthEastIcon from "@mui/icons-material/NorthEast";

import CardContentDrivenTime from "@/modules/global/components/cardsDeck/cardContentDrivenTime";
import CardContentIdle from "@/modules/global/components/cardsDeck/cardContentIdle";
import CardContentTCT5 from "@/modules/global/components/cardsDeck/cardContentTCT5";
import CardGenThird from "@/modules/global/components/cardsDeck/cardGenThird";
import styles from "./telemetryOBDHome.module.css";
import { FuelDataReport } from "@/modules/fuel/components/fuelNowContainer/fuelDataReport/fuelDataReport";
import { Table } from "@/modules/global/components";
import { formatNumberWithCommas } from "@/modules/global/utils/utils";
import { telemetryVehiclesOBD } from "@/modules/global/dataMock/telemetryVehiclesOBD/telemetryVehiclesOBD";

//Tipado
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  showTable?: boolean; //Esconde la tabla si el módulo es usado en Home.
}

export const TelemetryHome = ({ LANGUAGE, showTable }: Props) => {
  // Llamado a slice para cuando haya endpoint disponible:
  /* const { teleVehiclesOBDData, teleVehiclesOBDStatus } = useSelector(
    (state: RootState ) => state.teleVehiclesOBD
  ); */
  const teleVehiclesOBDStatus = "succeeded";
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

  const totalDistance = teleVehiclesOBDData.reduce(
    (suma, data) => suma + Number(data.totalDistance ?? 0),
    0
  );

  const totalEngineHours = teleVehiclesOBDData.reduce(
    (suma, data) => suma + Number(data.totalEngineHours ?? 0),
    0
  );

  const totalIdleHours = teleVehiclesOBDData.reduce(
    (suma, data) => suma + Number(data.totalIdleHours ?? 0),
    0
  );
  return (
    <div className={styles.telemetryObd}>
      {teleVehiclesOBDStatus === "succeeded" && teleVehiclesOBDData ? (
        <>
          <section className={styles.cardssection}>
            <div>
              <div className={styles.resumeContainer}>
                <FuelDataReport
                  Icon={NorthEastIcon}
                  LANGUAGE={LANGUAGE}
                  data={formatNumberWithCommas(totalDistance) + " km"}
                  title={LANGUAGE.teleOBD.resumes.distance}
                />
              </div>
              <CardGenThird>
                <CardContentTCT5
                  data={teleVehiclesOBDData}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
            </div>
            <div>
              <div className={styles.resumeContainer}>
                <FuelDataReport
                  Icon={AccessTimeIcon}
                  LANGUAGE={LANGUAGE}
                  data={formatNumberWithCommas(totalEngineHours) + " h"}
                  title={LANGUAGE.teleOBD.resumes.timeDriven}
                />
              </div>
              <CardGenThird>
                <CardContentDrivenTime
                  data={teleVehiclesOBDData}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
            </div>
            <div>
              <div className={styles.resumeContainer}>
                <FuelDataReport
                  Icon={HourglassDisabledIcon}
                  LANGUAGE={LANGUAGE}
                  data={formatNumberWithCommas(totalIdleHours) + " h"}
                  title={LANGUAGE.teleOBD.resumes.timeIdle}
                />
              </div>
              <CardGenThird>
                <CardContentIdle
                  data={teleVehiclesOBDData}
                  LANGUAGE={LANGUAGE}
                />
              </CardGenThird>
            </div>
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
      ) : (
        <div>...</div>
      )}
    </div>
  );
};
