import { Table } from "@/modules/global/components";
import { telemetryVehiclesOBD } from "@/modules/global/dataMock/telemetryVehiclesOBD/telemetryVehiclesOBD";
import CardContentTCT5 from "@/modules/global/components/cardsDeck/cardContentTCT5";
import CardContentDrivenTime from "@/modules/global/components/cardsDeck/cardContentDrivenTime";
import CardContentIdle from "@/modules/global/components/cardsDeck/cardContentIdle";
import CardGenThird from "@/modules/global/components/cardsDeck/cardGenThird";

import styles from "./telemetryOBDHome.module.css";

//Tipado
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const TelemetryHome = ({ LANGUAGE }: Props) => {
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
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.plate,
      defaultSpace: 2,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.kilometerMarker,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.fuelType,
      defaultSpace: 2,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.litersPerHour,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalDistance,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalEngineHours,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalConsumed,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.teleOBD.tableColumns.totalIdleHours,
      defaultSpace: 3,
      orderColumn: true,
    },
  ];
  return (
    <div>
      {teleVehiclesOBDStatus === "succeeded" && teleVehiclesOBDData ? (
        <>
          <section className={styles.cardssection}>
            <CardGenThird>
              <CardContentTCT5 data={teleVehiclesOBDData} LANGUAGE={LANGUAGE} />
            </CardGenThird>
            <CardGenThird>
              <CardContentDrivenTime
                data={teleVehiclesOBDData}
                LANGUAGE={LANGUAGE}
              />
            </CardGenThird>
            <CardGenThird>
              <CardContentIdle data={teleVehiclesOBDData} LANGUAGE={LANGUAGE} />
            </CardGenThird>
          </section>
          <Table
            title={LANGUAGE.teleOBD.tableTitle.registerTeleOBD}
            LANGUAGE={LANGUAGE}
            columns={teleVehiclesOBDColumns}
            data={teleVehiclesOBDData}
            showGoFuel
            showGoOBT
            idKey="imeIs"
          />
        </>
      ) : (
        <div>...</div>
      )}
    </div>
  );
};
