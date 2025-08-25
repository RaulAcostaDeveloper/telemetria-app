"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import HistoryIcon from "@mui/icons-material/History";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import { SpeedRounded } from "@mui/icons-material";

import GeoModal, {
  GeoModalData,
} from "@/modules/global/components/geoModal/geoModal";
import styles from "./fuelNowContainer.module.css";
import {
  fetchLastFuelReport,
  LastFuelReportData,
} from "@/globalConfig/redux/slices/lastFuelReportSlice";
import { AppDispatch } from "@/globalConfig/redux/store";
import { ButtonTypes, GeneralButton } from "@/modules/global/components";
import { FuelDataReport } from "./fuelDataReport/fuelDataReport";
import { FuelNowVehicleTank } from "./fuelNowVehicleTank/fuelNowVehicleTank";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  imei: string;
  lastFuelReportData: LastFuelReportData;
}

export const FuelNowContainer = ({ LANGUAGE, lastFuelReportData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [geoModalData, setGeoModalData] = useState<GeoModalData>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Tener la data actualizada cada 10 segundos
    const intervalId = setInterval(() => {
      dispatch(
        fetchLastFuelReport({
          imei: "862524060822760", // imei.toString(),
        })
      );
    }, 20000);

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  useEffect(() => {
    setGeoModalData({
      lat: parseFloat(lastFuelReportData.lat.toString()),
      lon: parseFloat(lastFuelReportData.lon.toString()),
      title: LANGUAGE.geoModalTitles.fuelNowTitle,
      rows: [],
    });
  }, []);

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
    ?.split(",")
    .map(Number)
    .filter((n) => !isNaN(n));

  const numberOfTanks = tankValues?.length;
  const fuelNow = (tankValues ?? []).reduce((acc, val) => acc + val, 0);
  const totalCapacity = 45 * (numberOfTanks ?? 0);

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

      {isModalOpen && geoModalData && (
        <GeoModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsModalOpen(false)}
          geoModalData={geoModalData}
          height={600}
          width={600}
        />
      )}

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
        />
      </div>
    </div>
  );
};
