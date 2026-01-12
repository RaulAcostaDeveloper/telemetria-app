"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import LoaderAnimation from "@/global/components/loaderAnimation/loaderAnimation";
import { AppDispatch, RootState } from "@/global/redux/store";
import { FetcherProfileData } from "./fetchetProfileData/fetcherProfileData";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "@/global/components";
import { ProfileForm } from "./profileForm/profileForm";
import { PutProfile } from "../../services/putProfile/putProfile";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { fetchPostZoneProfile } from "@/global/redux/serviceSlices/postZoneProfile";
import { fetchPutZoneProfile } from "@/global/redux/serviceSlices/putZoneProfile";
import { fetchZoneDetails } from "@/global/redux/serviceSlices/zoneDetails";
import { fetchZonesSummary } from "@/global/redux/serviceSlices/zonesSummary";
import { formatToLocalIso8601 } from "@/global/utils/dateUtils";
import { getCategories } from "./categories";
import { isDifferentProfile } from "../../utils/compareProfileObjects";
import { resetZoneProfileDetailsSlice } from "@/global/redux/serviceSlices/zoneProfileDetailsSlice";
import { useAuth } from "@/modules/auth/utils";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  id: string;
}

export const ZoneEditProfileModalForm = ({
  LANGUAGE,
  closeModal,
  id,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, logoutState } = useAuth();

  const [isPut, setIsPut] = useState<boolean>(false);

  const [changesHaveBeenMade, setChangesHaveBeenMade] =
    useState<boolean>(false);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

  const { startDate, endDate } = useSelector(
    (state: RootState) => state.calendar
  );

  const { putZoneProfileStatus } = useSelector(
    (state: RootState) => state.putZoneProfile
  );
  const { postZoneProfileStatus } = useSelector(
    (state: RootState) => state.postZoneProfile
  );

  const { zoneCategoriesData, zoneCategoriesStatus } = useSelector(
    (state: RootState) => state.zoneCategories
  );

  const { zoneProvidersData, zoneProvidersStatus } = useSelector(
    (state: RootState) => state.zoneProviders
  );

  const { zoneProfileDetailsData, zoneProfileDetailsStatus } = useSelector(
    (state: RootState) => state.zoneProfileDetails
  );

  const [authCharges, setAuthCharges] = useState<string>("");
  const [authDisharges, setAuthDisharges] = useState<string>("");
  const [authRalenti, setAuthRalenti] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [color, setColor] = useState<string>("#000000");
  const [description, setDescription] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [providerId, setProviderId] = useState<string>("");

  const onConfirm = () => {
    const profileDetails =
      zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0];

    if (isPut && profileDetails) {
      // PUT
      const updated: PutProfile = {
        nick: name,
        zoneProviderId: providerId,
        chargeState: Number(authCharges),
        dischargeState: Number(authDisharges),
        idleState: Number(authRalenti),
        color,
        description,
        zoneId: id,
        idProfile: profileDetails.idProfile,
        zoneCategoryId: categoryId,
        logoutState,
      };

      // Enviar PUT sólo si se ha cambiado algo
      if (
        isDifferentProfile({
          original: profileDetails,
          updated,
        })
      ) {
        dispatch(fetchPutZoneProfile(updated));
        toast.success(LANGUAGE.notifications.savedData);
        setChangesHaveBeenMade(true);
        closeModal();
      } else {
        // No hubo cambios
        toast.success(LANGUAGE.notifications.noChanges);
        closeModal();
      }
    } else {
      // POST
      dispatch(
        fetchPostZoneProfile({
          nick: name,
          zoneProviderId: providerId,
          chargeState: Number(authCharges),
          dischargeState: Number(authDisharges),
          idleState: Number(authRalenti),
          color,
          description,
          zoneId: id,
          zoneCategoryId: categoryId,
          logoutState,
        })
      );
      toast.success(LANGUAGE.notifications.savedData);
      setChangesHaveBeenMade(true);
    }
    // Solo dejar los modales de confirmación al enviar
    setIsFormOpen(false);
  };

  useEffect(() => {
    if (!id) {
      console.warn("El Id de la zona no existe");
    }
    return () => {
      // Reiniciar el estado al desmontar
      dispatch(resetZoneProfileDetailsSlice());
    };
  }, [id]);

  useEffect(() => {
    if (changesHaveBeenMade) {
      setTimeout(() => {
        // Actualizar con los nuevos datos
        if (isAuthenticated && id && startDate && endDate) {
          dispatch(
            fetchZoneDetails({
              id: id.toString(),
              logoutState,
            })
          );
          // Actualiza la tabla
          dispatch(
            fetchZonesSummary({
              startDate: formatToLocalIso8601(startDate), // formatToLocalIso8601(startDate),
              endDate: formatToLocalIso8601(endDate),
              logoutState,
            })
          );
        }
      }, 2000);
    }
  }, [changesHaveBeenMade]);

  useEffect(() => {
    // Inicializar con datos
    if (zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0]) {
      const data = zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0];
      setIsPut(true);

      setName(data.nick);
      setCategoryId(data.zoneCategoryId);
      setProviderId(data.zoneProviderId);
      setAuthCharges(data.chargeState.toString());
      setAuthDisharges(data.dischargeState.toString());
      setAuthRalenti(data.idleState.toString());
      setColor(data.color);
      setDescription(data.description);
    }
  }, [zoneProfileDetailsData]);

  useEffect(() => {
    // Validar que tengamos los ID correctos de categorías

    const zoneIds = new Set(
      zoneCategoriesData?.value?.zoneCategories?.map((c) => c.id) ?? []
    );
    const categoryIds = new Set(getCategories(LANGUAGE).map((c) => c.id));

    const missingInCategories: string[] = [];

    zoneIds.forEach((id) => {
      if (!categoryIds.has(id)) {
        missingInCategories.push(id);
      }
    });

    const extraInCategories: string[] = [];

    categoryIds.forEach((id) => {
      if (!zoneIds.has(id)) {
        extraInCategories.push(id);
      }
    });

    const isValid =
      missingInCategories.length === 0 && extraInCategories.length === 0;
    if (!isValid) {
      console.error("Se ha encontrado disparidad entre los ID de categorias: ");
      console.error("missingInCategories ", missingInCategories);
      console.error("extraInCategories ", extraInCategories);
    }
  }, [zoneCategoriesData]);

  return (
    <>
      {isFormOpen && (
        <Modal
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          title={LANGUAGE.table.actions.addProfileToZone}
        >
          <FetcherProfileData id={id} />
          {/* Cargar datos del formulario */}
          {postZoneProfileStatus === SERVICE_STATUS.loading ||
          putZoneProfileStatus === SERVICE_STATUS.loading ||
          zoneProfileDetailsStatus === SERVICE_STATUS.loading ||
          zoneCategoriesStatus === SERVICE_STATUS.loading ||
          zoneProvidersStatus === SERVICE_STATUS.loading ? (
            <LoaderAnimation />
          ) : (
            <>
              {/* Atender este problema en otra tarea */}
              {/* Caso 429 no es manejado correctamente */}
              {zoneProfileDetailsStatus === SERVICE_STATUS.failed ? (
                <DataErrorHandler
                  LANGUAGE={LANGUAGE}
                  hasData={true}
                  infoStatus={zoneProfileDetailsStatus}
                />
              ) : (
                <ProfileForm
                  LANGUAGE={LANGUAGE}
                  authCharges={authCharges}
                  authDisharges={authDisharges}
                  authRalenti={authRalenti}
                  categoryId={categoryId}
                  closeModal={closeModal}
                  color={color}
                  description={description}
                  name={name}
                  onConfirm={onConfirm}
                  providerId={providerId}
                  setAuthCharges={setAuthCharges}
                  setAuthDisharges={setAuthDisharges}
                  setAuthRalenti={setAuthRalenti}
                  setCategoryId={setCategoryId}
                  setColor={setColor}
                  setDescription={setDescription}
                  setName={setName}
                  setProviderId={setProviderId}
                  zoneCategoriesData={zoneCategoriesData}
                  zoneCategoriesStatus={zoneCategoriesStatus}
                  zoneProvidersData={zoneProvidersData}
                />
              )}
            </>
          )}
        </Modal>
      )}
    </>
  );
};
