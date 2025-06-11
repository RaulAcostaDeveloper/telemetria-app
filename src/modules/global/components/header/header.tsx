"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { ArrowDownward, CalendarToday } from "@mui/icons-material";
import Calendar from "@/modules/global/components/calendar/Calendar";
import HeaderVehicleFilter from "./headerVehicleFilter/headerVehicleFilter";
import styles from "./header.module.css";
import { formatDateTime } from "@/modules/global/utils/utils";
import { LanguageInterface } from "../../language/constants/language.model";
import { HeaderBackButton } from "./headerBackButton/headerBackButton";

import { fetchVehicles } from "@/globalConfig/redux/slices/vehiclesSlice";
import type {
  AppDispatch,
  RootState as StoreState,
} from "@/globalConfig/redux/store";

interface CalendarState {
  endDate: string | null;
  startDate: string | null;
}

interface RootState {
  calendar: CalendarState;
}

interface Props {
  isMenuOpen: boolean | null;
  LANGUAGE: LanguageInterface;
}

export const Header = ({ isMenuOpen, LANGUAGE }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  // Normaliza el id para que sea siempre un string
  const rawId = params.id;
  const accountId: string = Array.isArray(rawId) ? rawId[0] : rawId ?? "";

  const [mounted, setMounted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const { startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(
    (state: RootState) => state.calendar
  );
  const vehiclesData = useSelector(
    (state: StoreState) => state.vehicles.vehiclesData
  );
  const vehiclesStatus = useSelector(
    (state: StoreState) => state.vehicles.vehiclesStatus
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lanza el thunk solo si tenemos un accountId válido
  useEffect(() => {
    if (!accountId) return;
    dispatch(fetchVehicles({ accountId }));
  }, [dispatch, accountId]);

  useEffect(() => {
    if (vehiclesStatus === "succeeded" && vehiclesData) {
      console.log("🚗 vehiclesData:", vehiclesData);
    }
  }, [vehiclesStatus, vehiclesData]);

  const toggleContainer = (): void => {
    setShowCalendar((prev) => !prev);
  };

  const defaultISO = new Date().toISOString();
  const start = formatDateTime(reduxStartDate ?? defaultISO);
  const end = formatDateTime(reduxEndDate ?? defaultISO);

  return (
    <>
      <header
        className={styles.header}
        style={{
          width:
            isMenuOpen !== true ? "calc(100% - 80px)" : "calc(100% - 250px)",
          transition: isMenuOpen !== true ? "0.9s" : "1.1s",
        }}
      >
        {mounted && (
          <>
            <nav className={styles.navBar}>
              <div className={styles.platesAndName}>
                <HeaderBackButton LANGUAGE={LANGUAGE} />
                <span>{vehiclesData?.value.vehicles[0].carNumber} </span>

                <span>HILUX</span>
              </div>{" "}
              <div className={styles.inputAndDatesContainer}>
                <HeaderVehicleFilter LANGUAGE={LANGUAGE} />
                <button
                  onClick={toggleContainer}
                  id="date"
                  type="button"
                  data-state={showCalendar ? "open" : "closed"}
                  className={styles.dateButton}
                  title={LANGUAGE.header.calendar.buttonHover}
                >
                  <CalendarToday className={styles.calendarIcon} />
                  <ArrowDownward className={styles.arrowIcon} />
                  <div className={styles.dateContainer}>
                    <span className={styles.startDate}>{start}</span>
                    <span className={styles.endDate}>{end}</span>
                  </div>
                </button>
              </div>
            </nav>
            {showCalendar && (
              <Calendar LANGUAGE={LANGUAGE} toggleContainer={toggleContainer} />
            )}
          </>
        )}
      </header>
      <div className={styles.shadowHeader}>{/* Shadow Header */}.</div>
    </>
  );
};

export default Header;
