/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./headerTextWords.module.css";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  LANGUAGE: LanguageInterface;
  section: string;
  url: string;
}

export const HeaderTextWords = ({ LANGUAGE, section, url }: Props) => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const segmentsURL = url.split("/").filter(Boolean);
  const lastSegmentURL = segmentsURL[segmentsURL.length - 1];

  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  useEffect(() => {
    if (isAuthenticated && lastSegmentURL && lastSegmentURL.length > 3) {
      dispatch(fetchVehicleByImei({ imei: lastSegmentURL }));
    }
  }, [dispatch, isAuthenticated, lastSegmentURL]);

  return (
    <>
      {vehicleByImeiStatus === SERVICE_STATUS.succeeded && vehicleByImeiData ? (
        <>
          {vehicleByImeiData.value?.plate && (
            <span className={styles.plate}>
              {vehicleByImeiData.value.plate} ·{" "}
            </span>
          )}
          {vehicleByImeiData.value?.brand && (
            <span>{vehicleByImeiData.value.brand}</span>
          )}
          {vehicleByImeiData.value?.imeIs && (
            <span> · ({vehicleByImeiData.value?.imeIs[0]})</span>
          )}
        </>
      ) : section === "single-fuel" ? (
        <span>{LANGUAGE.sectionName.fuel}</span>
      ) : section === "single-telemetry" ? (
        <span>{LANGUAGE.sectionName.telemetryobd}</span>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default HeaderTextWords;
