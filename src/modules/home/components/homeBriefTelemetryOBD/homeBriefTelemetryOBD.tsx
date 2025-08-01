import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";
import { telemetryVehiclesOBD } from "@/modules/global/dataMock/telemetryVehiclesOBD/telemetryVehiclesOBD";
import CardGenThird from "@/modules/global/components/cardsDeck/cardGenThird";
import CardContentTCT5 from "@/modules/global/components/cardsDeck/cardContentTCT5";
import CardContentDrivenTime from "@/modules/global/components/cardsDeck/cardContentDrivenTime";
import CardContentIdle from "@/modules/global/components/cardsDeck/cardContentIdle";
import { dataTable } from "@/modules/global/components/table/table.model";
import styles from "../../../telemetryObd/components/telemetryOBDHome/telemetryOBDHome.module.css";

/**
 * Componente para la sección /home que muestra algo de información
 * de telemetryOBDHome.
 */
export const HomeBriefTelemetryOBD = () => {
  const LANGUAGE = useLanguage();

  // Llamado a slice para cuando haya endpoint disponible
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
        </>
      ) : (
        <div>...</div>
      )}
    </div>
  );
};
