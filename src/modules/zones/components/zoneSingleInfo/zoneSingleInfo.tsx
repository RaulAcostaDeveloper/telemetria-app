import { toLocalDateTime } from "@/global/utils/dateUtils";
import styles from "./zoneSingleInfo.module.css";
import { zoneDataMock } from "@/global/dataMock/z0n3sD4t4M0ck";

/* type allButGeoZoneData = Omit<zoneDataMock, "geoData">; */

interface Props {
  allZoneData: zoneDataMock;
}

export const ZoneSingleInfo = ({ allZoneData }: Props) => {
  return (
    <div className={["containerinfo", styles.container].join(" ")}>
      <div className={["frame", styles.frame].join(" ")}>
        <div className={styles.row}>
          <div>Fecha de carga no conciliada</div>
          <div>{toLocalDateTime(allZoneData.fechaCargaNoConciliada ?? "")}</div>
        </div>
        <div className={styles.row}>
          <div>Dirección</div>
          <div>{allZoneData.address}</div>
        </div>
        <div className={styles.row}>
          <div>Latitud</div>
          <div>{allZoneData.geoData.lat}</div>
        </div>
        <div className={styles.row}>
          <div>Longitud</div>
          <div>{allZoneData.geoData.lon}</div>
        </div>
        <div className={styles.row}>
          <div>Odómetro</div>
          <div>{`${allZoneData.odometer} Km`}</div>
        </div>
        <div className={styles.row}>
          <div>Velocidad</div>
          <div>{`${allZoneData.speed} Km/h`}</div>
        </div>
        <div className={styles.row}>
          <div>Ignición</div>
          <div>{allZoneData.ignition ? "Encendido" : "Apagado"}</div>
        </div>
        <div className={styles.row}>
          <div>Batería del dispositivo</div>
          <div>{`${allZoneData.battery}%`}</div>
        </div>
        <div className={styles.row}>
          <div>Energía principal</div>
          <div>{`${allZoneData.mainEnergy} V`}</div>
        </div>
        <div className={styles.row}>
          <div>Origen</div>
          <div>{allZoneData.origin}</div>
        </div>
        <div className={styles.row}>
          <div>Magnitud</div>
          <div>{`${allZoneData.magnitude} L`}</div>
        </div>
        <div className={styles.row}>
          <div>Combustible inicial</div>
          <div>{`${allZoneData.startFuel} L`}</div>
        </div>
        <div className={styles.row}>
          <div>Combustible final</div>
          <div>{`${allZoneData.endFuel} L`}</div>
        </div>
        <div className={styles.row}>
          <div>Inició</div>
          <div>{toLocalDateTime(allZoneData.initialDate ?? "")}</div>
        </div>
        <div className={styles.row}>
          <div>Finalizó</div>
          <div>{toLocalDateTime(allZoneData.endDate ?? "")}</div>
        </div>
      </div>
    </div>
  );
};
