/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/modules/auth/utils";
import { fetchVehicleByImei } from "@/globalConfig/redux/slices/vehicleByImeiSlice";

import styles from "./headerTextWords.module.css";

// Tipado
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

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

  function jsxOption(): JSX.Element {
    if ("succeeded" === vehicleByImeiStatus && vehicleByImeiData) {
      const resultantHTML = [];
      vehicleByImeiData.value.plate &&
        resultantHTML.push(
          <span className={styles.plate}>
            {vehicleByImeiData.value.plate} ·{" "}
          </span>
        );
      vehicleByImeiData.value.brand &&
        resultantHTML.push(<span>{vehicleByImeiData.value.brand}</span>);
      vehicleByImeiData.value.imeIs &&
        resultantHTML.push(
          <span> · ({vehicleByImeiData.value.imeIs[0]})</span>
        );
      return <>{resultantHTML}</>;
    } else {
      if ("single-fuel" === section) {
        return (
          <>
            <span>{LANGUAGE.sectionName.fuel}</span>
          </>
        );
      } else if ("single-telemetry" === section) {
        return (
          <>
            <span>{LANGUAGE.sectionName.telemetryobd}</span>
          </>
        );
      } else {
        return (
          <>
            <span></span>
          </>
        );
      }
    }
  }

  return <>{jsxOption()}</>;
};

export default HeaderTextWords;
