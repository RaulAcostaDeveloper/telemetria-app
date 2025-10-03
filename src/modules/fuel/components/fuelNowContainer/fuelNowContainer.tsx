import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import HistoryIcon from "@mui/icons-material/History";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { SpeedRounded } from "@mui/icons-material";

import styles from "./fuelNowContainer.module.css";
import { LastFuelReportData } from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { ButtonTypes, GeneralButton } from "@/global/components";
import { FuelDataReport } from "./fuelDataReport/fuelDataReport";
import { FuelNowVehicleTank } from "./fuelNowVehicleTank/fuelNowVehicleTank";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  isModalOpen: boolean;
  lastFuelReportData: LastFuelReportData;
  setIsModalOpen: (toggle: boolean) => void;
}

export const FuelNowContainer = ({
  LANGUAGE,
  isModalOpen,
  lastFuelReportData,
  setIsModalOpen,
}: Props) => {
  const dateGps = new Date(lastFuelReportData.dateGps + "Z");

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

  const tankValues = lastFuelReportData.tanksLevels
    ?.split(/\s*[,|]\s*/) //quita espacios y separa por coma y por pipe.
    .map(Number)
    .filter((n) => !isNaN(n));

  const numberOfTanks = tankValues?.length;
  const fuelNow = (tankValues ?? []).reduce((acc, val) => acc + val, 0);
  const totalCapacity = lastFuelReportData.maxFuelCapacity ?? 0;
  const averageTankSize = numberOfTanks && totalCapacity / numberOfTanks;

  return (
    <div>
      <div className={styles.openMapContainer}>
        <GeneralButton
          type={ButtonTypes.SUCCESS}
          title={`${
            isModalOpen
              ? LANGUAGE.fuelVehicle.fuelNow.hideLocation
              : LANGUAGE.fuelVehicle.fuelNow.showLocation
          }`}
          callback={() => setIsModalOpen(!isModalOpen)}
          Icon={<AddLocationAltIcon />}
        />
      </div>

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
            data={lastFuelReportData.speed + " Km/h"}
            title={LANGUAGE.fuelVehicle.fuelNow.velocity}
          />
          <FuelDataReport
            Icon={NoCrashIcon}
            LANGUAGE={LANGUAGE}
            data={lastFuelReportData.odometer + " Km"}
            title={LANGUAGE.fuelVehicle.fuelNow.odometer}
          />
          <FuelDataReport
            Icon={ElectricCarIcon}
            LANGUAGE={LANGUAGE}
            data={
              lastFuelReportData.ignition
                ? LANGUAGE.fuelVehicle.fuelNow.on
                : LANGUAGE.fuelVehicle.fuelNow.off
            }
            title={LANGUAGE.fuelVehicle.fuelNow.ignition}
          />
        </div>
        <FuelNowVehicleTank
          tankValues={tankValues}
          title={LANGUAGE.fuelVehicle.fuelNow.tank}
          averageTankSize={averageTankSize}
        />
      </div>
    </div>
  );
};
