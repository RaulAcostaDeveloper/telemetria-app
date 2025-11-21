"use client";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./zoneEditProfileModalForm.module.css";
import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { FetcherProfileData } from "./fetchetProfileData/fetcherProfileData";
import { Input } from "./input/input";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { Select } from "./select/select";
import { getCategories } from "./categories";

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
  const [isPost, setIsPost] = useState<boolean>(false);

  const { zoneCategoriesData, zoneCategoriesStatus } = useSelector(
    (state: RootState) => state.zoneCategories
  );

  const { zoneProvidersData } = useSelector(
    (state: RootState) => state.zoneProviders
  );

  const { zoneProfileDetailsData } = useSelector(
    (state: RootState) => state.zoneProfileDetails
  );

  const [name, setName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [authCharges, setAuthCharges] = useState<string>("");
  const [authDisharges, setAuthDisharges] = useState<string>("");
  const [authRalenti, setAuthRalenti] = useState("");
  // rgb hexadecimal
  const [color, setColor] = useState<string>("#000000");
  const [providerId, setProviderId] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const authOptions = useMemo(
    () => [
      {
        name: LANGUAGE.zones.zoneProfileForm.noAuthorized,
        id: "0",
      },
      {
        name: LANGUAGE.zones.zoneProfileForm.authorized,
        id: "1",
      },
    ],
    [LANGUAGE]
  );

  const onConfirm = () => {
    // Pendiente implementar
    if (isPost) {
      // POST
    } else {
      // PUT
    }
  };

  // Está pendiente mapear que id corresponde a que nombre (categoría y proveedor)
  // No dejar renderizado lo que venga en el servicio si no mapearlo desde LENGUAJE

  useEffect(() => {
    if (zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0]) {
      const data = zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0];
      setIsPost(true);

      setName(data.nick);
      setCategoryId(data.zoneCategoryId);
      setProviderId(data.zoneProviderId);
      setAuthCharges(data.chargeState.toString());
      setAuthDisharges(data.dischargeState.toString());
      setAuthRalenti(data.idleState.toString());
      setColor(data.color);
      setDescription(data.description);
    }
  }, [zoneProfileDetailsData, authOptions]);

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
      {zoneCategoriesData?.value?.zoneCategories &&
        zoneProvidersData?.value && (
          <div className={styles.form}>
            <div className={styles.row}>
              <Input
                title={LANGUAGE.zones.zoneProfileForm.name}
                name="nameProfile"
                value={name}
                set={setName}
                isLeft
              />
              <Select
                title={LANGUAGE.zones.zoneProfileForm.category}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="category"
                value={categoryId}
                set={setCategoryId}
                options={getCategories(LANGUAGE)}
              />
            </div>

            <div className={styles.row}>
              <Select
                title={LANGUAGE.zones.zoneProfileForm.charges}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="loadedAuth"
                value={authCharges}
                set={setAuthCharges}
                options={authOptions}
                isLeft
              />
              <Select
                title={LANGUAGE.zones.zoneProfileForm.discharges}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="unloadedAuth"
                value={authDisharges}
                set={setAuthDisharges}
                options={authOptions}
              />
            </div>

            <div className={styles.row}>
              <Select
                title={LANGUAGE.zones.zoneProfileForm.ralenti}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="ralenti"
                value={authRalenti}
                set={setAuthRalenti}
                options={authOptions}
                isLeft
              />
              <Input
                title={LANGUAGE.zones.zoneProfileForm.color}
                name="color"
                value={color}
                set={setColor}
                isColor
              />
            </div>

            <div className={styles.row}>
              <Select
                title={LANGUAGE.zones.zoneProfileForm.provider}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="provider"
                value={providerId}
                set={setProviderId}
                options={zoneProvidersData.value.zoneTypes}
                isLeft
              />
            </div>

            <div className={styles.row}>
              <Input
                title={LANGUAGE.zones.zoneProfileForm.description}
                name="description"
                value={description}
                set={setDescription}
                isLarge
              />
            </div>

            <div className={styles.bottom}>
              <GeneralButton
                callback={closeModal}
                title={LANGUAGE.table.buttons.cancel}
                type={ButtonTypes.NEUTRAL}
              />
              <GeneralButton
                callback={onConfirm}
                title={LANGUAGE.table.buttons.saveEdit}
                type={ButtonTypes.CONFIRM}
                disabled={
                  !(
                    name &&
                    categoryId &&
                    authCharges &&
                    authDisharges &&
                    authRalenti &&
                    color &&
                    providerId
                  )
                }
              />
            </div>
          </div>
        )}

      <DataErrorHandler
        LANGUAGE={LANGUAGE}
        hasData={!!zoneCategoriesData?.value}
        infoStatus={zoneCategoriesStatus}
      />
    </Modal>
  );
};
