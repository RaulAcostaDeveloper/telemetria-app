import CarCrashIcon from "@mui/icons-material/CarCrash";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import HistoryIcon from "@mui/icons-material/History";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { SpeedRounded } from "@mui/icons-material";

import styles from "./fuelNowContainer.module.css";
import { FuelDataReport } from "./fuelDataReport/fuelDataReport";
import { FuelNowVehicleTank } from "./fuelNowVehicleTank/fuelNowVehicleTank";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { rabbitVehicleFuelNow } from "@/modules/global/dataMock/rabbitVehicleFuelNow/rabbitVehicleFuelNow";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelNowContainer = ({ LANGUAGE }: Props) => {
  const dateGps = new Date(rabbitVehicleFuelNow.DateGps);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dateGpsReadable = dateGps.toLocaleString(
    LANGUAGE.localeLanguage,
    dateOptions
  );

  const tankValues = rabbitVehicleFuelNow.TanksLevels.split(",")
    .map(Number)
    .filter((n) => !isNaN(n));

  const numberOfTanks = tankValues.length;
  const fuelNow = tankValues.reduce((acc, val) => acc + val, 0);
  const totalCapacity = 70 * numberOfTanks;

  return (
    <div className={styles.fuelNowContainer}>
      <div className={styles.fuelDataReportContainer}>
        <FuelDataReport
          Icon={HistoryIcon}
          LANGUAGE={LANGUAGE}
          data={dateGpsReadable}
          title={LANGUAGE.fuelVehicle.fuelNow.lastDateReport}
        />
        <FuelDataReport
          Icon={LocalGasStationIcon}
          LANGUAGE={LANGUAGE}
          data={fuelNow + " L"}
          title={LANGUAGE.fuelVehicle.fuelNow.fuelNow}
        />
        <FuelDataReport
          Icon={CarCrashIcon}
          LANGUAGE={LANGUAGE}
          data={totalCapacity + " L"}
          title={LANGUAGE.fuelVehicle.fuelNow.capacity}
        />
        <FuelDataReport
          Icon={SpeedRounded}
          LANGUAGE={LANGUAGE}
          data={rabbitVehicleFuelNow.Speed + " Km/h"}
          title={LANGUAGE.fuelVehicle.fuelNow.velocity}
        />
        <FuelDataReport
          Icon={NoCrashIcon}
          LANGUAGE={LANGUAGE}
          data={rabbitVehicleFuelNow.Odometer + " L"}
          title={LANGUAGE.fuelVehicle.fuelNow.performance}
        />
        <FuelDataReport
          Icon={ElectricCarIcon}
          LANGUAGE={LANGUAGE}
          data={
            rabbitVehicleFuelNow.Ignition === 1
              ? LANGUAGE.fuelVehicle.fuelNow.on
              : LANGUAGE.fuelVehicle.fuelNow.off
          }
          title={LANGUAGE.fuelVehicle.fuelNow.ignition}
        />
      </div>
      <div className={styles.tanksContainer}>
        <FuelNowVehicleTank numberOfTanks={numberOfTanks} />
      </div>
    </div>
  );
};
