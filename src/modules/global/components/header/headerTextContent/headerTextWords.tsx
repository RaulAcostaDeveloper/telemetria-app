/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useSelector } from "react-redux";
import styles from "./headerTextWords.module.css";

// Tipado
import { RootState } from "@/globalConfig/redux/store";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  section: string;
}

export const HeaderTextWords = ({ LANGUAGE, section }: Props) => {
  const { vehicleByImeiData, vehicleByImeiStatus } = useSelector(
    (state: RootState) => state.vehicleByImei
  );

  function jsxOption(): JSX.Element {
    if ("succeeded" === vehicleByImeiStatus && vehicleByImeiData) {
      let resultantHTML = [];
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
          <span> · (IMEI: {vehicleByImeiData.value.imeIs[0]})</span>
        );
      return <>{resultantHTML}</>;
    } else {
      if ("single-fuel" === section) {
        return (
          <>
            <span>{LANGUAGE.sectionName.fuel}</span>
          </>
        );
      } else {
        /*       else if ("single-telemetry" === section) {
        return (
          <>
            <span>{LANGUAGE.sectionName.telemetry}</span>
          </>
        );
      } */
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
