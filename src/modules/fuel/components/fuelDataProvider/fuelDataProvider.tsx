"use client";

import { fetchFuelSummary } from "@/globalConfig/redux/slices/fuelSummarySlice";
import { AppDispatch, RootState } from "@/globalConfig/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FuelSummaryResumen } from "../fuelSummaryResumen/fuelSummaryResumen";

export const FuelDataProvider = () => {
  // Ejemplo de obtener data de una api (fuelSummary)
  const dispatch = useDispatch<AppDispatch>();
  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );

  // Llamar a la API cuando los valores cambien
  useEffect(() => {
    dispatch(
      fetchFuelSummary({
        accountId: "3786", // Obtener del cliente
        startDate: "2024-08-05T00:00:00", // obtener del estado
        endDate: "2024-09-05T00:00:00", // obtener del estado
        performanceType: "1",
      })
    );
  }, [dispatch]);

  // Manejar los status
  if (fuelSummaryStatus === "loading") return <b>Cargando Fuel Summary...</b>;

  if (fuelSummaryStatus === "failed")
    return <b>Error al cargar Fuel summary</b>;

  if (fuelSummaryData?.statusCode === 200) {
    console.log(fuelSummaryData);
    return (
      <div>
        <FuelSummaryResumen
          unitsAnalyzed={fuelSummaryData.value.unitsAnalyzed}
          inventory={fuelSummaryData.value.inventory}
          performanceOdometer={fuelSummaryData.value.performanceOdometer}
          performanceHorometer={fuelSummaryData.value.performanceHorometer}
          fuelCharged={fuelSummaryData.value.fuelCharged}
          fuelDischarged={fuelSummaryData.value.fuelDischarged}
        />
      </div>
    );
  } else return <b>Data no obtenida</b>;
};
