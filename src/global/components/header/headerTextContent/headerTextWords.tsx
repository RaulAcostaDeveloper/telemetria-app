/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./headerTextWords.module.css";
import { AppDispatch, RootState } from "@/global/redux/store";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchVehicleByImei } from "@/global/redux/serviceSlices/vehicleByImeiSlice";
import { useAuth } from "@/modules/auth/utils";

interface Props {
  LANGUAGE: LanguageInterface;
  section: string;
  url: string;
}

export const HeaderTextWords = ({ LANGUAGE, section, url }: Props) => {
  const { isAuthenticated, logoutState } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const segmentsURL = url.split("/").filter(Boolean);
  const lastSegmentURL = segmentsURL[segmentsURL.length - 1];

  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  useEffect(() => {
    if (isAuthenticated && lastSegmentURL && lastSegmentURL.length > 3) {
      dispatch(fetchVehicleByImei({ imei: lastSegmentURL, logoutState }));
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
