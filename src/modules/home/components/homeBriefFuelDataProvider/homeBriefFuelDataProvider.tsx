/**
 * Componente para desplegar en la sección /home, la información
 * de FuelDataProvider (y más información requerida de otros componentes en un futuro)
 * Al ser un componente reducido en contenido respecto del original (FuelDataProvider),
 * requirió su propio apartado o componente.
 */
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import styles from "@/modules/fuel/components/fuelDataProvider/fuelDataProvider.module.css";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
import { fetchFuelSummary } from "@/globalConfig/redux/slices/fuelSummarySlice";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const HomeBriefFuelDataProvider = ({ LANGUAGE}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  )

  const { fuelSummaryData, fuelSummaryStatus} = useSelector(
    (state: RootState) => state.fuelSummary
  )

  /* Llamada al dispatch para tener información que presentar y poder "pasar" la validacion
  * existente para mostrar componentes ReportSummary y su vecina DonutGraphic.
  */
  const callFetchFuelSummary = useCallback(() => {
    dispatch(
      fetchFuelSummary({
        accountId: "4992",
        startDate: "2024-08-05T00:00:00", // formatToLocalIso8601(startDate),
        endDate: "2024-09-07T00:00:00",
        performanceType: "1",
      })
    )
  }, [dispatch]);

  useEffect(() => {
    callFetchFuelSummary();
  }, [callFetchFuelSummary, startDate, endDate]);

  return (
    <div>
      <div className={styles.topResumeData}>
        {"succeeded" === fuelSummaryStatus && fuelSummaryData ?
          (
            <>
              <ReportSummary />
              <DonutGraphic devices={fuelSummaryData.value.devices} />
            </>  
          ) :
          (
            //TODO: Añadir loading
            <div>...</div>
          )
        }
      </div>
    </div>
  )
}