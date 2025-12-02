"use client";
import { useSelector } from "react-redux";

import { LanguageInterface } from "../../language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { decideFeedback } from "./decideFeedBack";
import { hasLessThanOneDay } from "@/global/utils/dateUtils";

interface Props {
  LANGUAGE: LanguageInterface;
  hasData: boolean;
  infoStatus: SERVICE_STATUS;
}

export const DataErrorHandler = ({
  LANGUAGE,
  hasData,
  infoStatus,
}: Props): JSX.Element => {
  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const lessThanOneDay = hasLessThanOneDay(startDate, endDate);

  return (
    <div>
      {decideFeedback({ LANGUAGE, hasData, infoStatus, lessThanOneDay })}
    </div>
  );
};
