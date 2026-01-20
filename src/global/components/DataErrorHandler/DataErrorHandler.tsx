"use client";
import { useSelector } from "react-redux";

import styles from "./dataErrorHandler.module.css";
import { LanguageInterface } from "../../language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { decideFeedback } from "./decideFeedBack";
import { hasLessThanOneDay } from "@/global/utils/dateUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: SERVICE_STATUS;
  codeStatus?: number;
}

export const DataErrorHandler = ({
  LANGUAGE,
  hasData,
  infoStatus,
  codeStatus,
}: Props): JSX.Element => {
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar,
  );

  const lessThanOneDay = hasLessThanOneDay(startDate, endDate);

  return (
    <div className={styles.center}>
      {decideFeedback({
        LANGUAGE,
        hasData,
        infoStatus,
        lessThanOneDay,
        codeStatus,
      })}
    </div>
  );
};
