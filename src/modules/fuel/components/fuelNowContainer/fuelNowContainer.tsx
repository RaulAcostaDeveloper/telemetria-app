import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import HistoryIcon from "@mui/icons-material/History";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import SpeedRounded from "@mui/icons-material/SpeedRounded";

import styles from "./fuelNowContainer.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";
import { FuelDataReport } from "./fuelDataReport/fuelDataReport";
import { FuelNowVehicleTank } from "./fuelNowVehicleTank/fuelNowVehicleTank";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { LastFuelReportValues } from "@/global/redux/serviceSlices/lastFuelReportSlice";
import { ToggleButton } from "../../../../global/components/toggleButton/toggleButton";

interface Props {
  LANGUAGE: LanguageInterface;
  isFuelNowSyncronizing: boolean;
  isModalOpen: boolean;
  lastFuelReportData: LastFuelReportValues;
  setIsFuelNowSyncronizing: (toggle: boolean) => void;
  setIsModalOpen: (toggle: boolean) => void;
}

export const FuelNowContainer = ({
  LANGUAGE,
  isFuelNowSyncronizing,
  isModalOpen,
  lastFuelReportData,
  setIsFuelNowSyncronizing,
  setIsModalOpen,
}: Props) => {
  const dateGps = new Date(lastFuelReportData.dateGps);

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
    dateOptions,
  );

  const tankValues = lastFuelReportData.tanksLevels
    ?.split(/\s*[,|]\s*/) //quita espacios y separa por coma y por pipe.
    .map(Number)
    .filter((n) => !isNaN(n));

  const numberOfTanks = tankValues?.length;
  const fuelNow = (tankValues ?? []).reduce((acc, val) => acc + val, 0);
  const totalCapacity = lastFuelReportData.maxFuelCapacity ?? 0;
  let averageTankSize: number;
  if (numberOfTanks && 0 < numberOfTanks && 0 < totalCapacity) {
    averageTankSize = totalCapacity / numberOfTanks;
  } else {
    averageTankSize = 1;
  }

  return (
    <div>
      <div className={styles.headerButtonsContainer}>
        <ToggleButton
          action={() => setIsFuelNowSyncronizing(!isFuelNowSyncronizing)}
          title={
            isFuelNowSyncronizing
              ? LANGUAGE.fuelVehicle.fuelNow.stopSynchronization
              : LANGUAGE.fuelVehicle.fuelNow.startSynchronization
          }
          isOn={isFuelNowSyncronizing}
          activeColor="#198754"
        />

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
          LANGUAGE={LANGUAGE}
        />
      </div>
    </div>
  );
};
