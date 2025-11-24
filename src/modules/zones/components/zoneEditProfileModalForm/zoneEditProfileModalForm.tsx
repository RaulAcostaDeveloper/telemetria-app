"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/global/redux/store";
import { FetcherProfileData } from "./fetchetProfileData/fetcherProfileData";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "@/global/components";
import { ProfileForm } from "./profileForm/profileForm";
import { fetchPostZoneProfile } from "@/global/redux/serviceSlices/postZoneProfile";
import { fetchPutZoneProfile } from "@/global/redux/serviceSlices/putZoneProfile";
import { getCategories } from "./categories";
import { useAuth } from "@/modules/auth/utils";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import LoaderAnimation from "@/global/components/loaderAnimation/loaderAnimation";

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
  const { logoutState } = useAuth();

  const [isPut, setIsPut] = useState<boolean>(false);

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

  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [authCharges, setAuthCharges] = useState<string>("");
  const [authDisharges, setAuthDisharges] = useState<string>("");
  const [authRalenti, setAuthRalenti] = useState("");
  const [color, setColor] = useState<string>("#000000");
  const [providerId, setProviderId] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const onConfirm = () => {
    // Pendiente implementar
    if (isPut && zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0]) {
      // PUT
      dispatch(
        fetchPutZoneProfile({
          nick: name,
          zoneProviderId: providerId,
          chargeState: Number(authCharges),
          dischargeState: Number(authDisharges),
          idleState: Number(authRalenti),
          color,
          description,
          zoneId: id,
          idProfile:
            zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0]
              .idProfile,
          zoneCategoryId: categoryId,
          logoutState,
        })
      );
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
    }
  };

  useEffect(() => {
    if (
      postZoneProfileStatus === SERVICE_STATUS.succeeded ||
      putZoneProfileStatus === SERVICE_STATUS.succeeded
    ) {
      closeModal();
    }
  }, [postZoneProfileStatus, putZoneProfileStatus]);

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
    </Modal>
  );
};
