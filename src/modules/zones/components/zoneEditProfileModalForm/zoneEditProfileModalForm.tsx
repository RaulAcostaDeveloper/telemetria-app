"use client";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./zoneEditProfileModalForm.module.css";
import { AppDispatch, RootState } from "@/global/redux/store";
import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { fetchZoneProfileDetails } from "@/global/redux/serviceSlices/zoneProfileDetailsSlice";
import { useAuth } from "@/modules/auth/utils";

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
  const [category, setCategory] = useState("");
  const [authCharges, setAuthCharges] = useState("");
  const [authDisharges, setAuthDisharges] = useState("");
  const [authRalenti, setAuthRalenti] = useState("");
  // rgb hexadecimal
  const [color, setColor] = useState<string>("#000000");
  const [provider, setProvider] = useState<string>("");
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
  const zoneCategories = useMemo(() => {
    return zoneCategoriesData?.value?.zoneCategories.map((value) => ({
      name: value.name,
      id: value.id,
    }));
  }, [zoneCategoriesData]);

  const zoneProviders = useMemo(() => {
    return zoneProvidersData?.value?.zoneTypes.map((value) => ({
      name: value.name,
      id: value.id,
    }));
  }, [zoneProvidersData]);

  useEffect(() => {
    if (zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0]) {
      const data = zoneProfileDetailsData?.value?.zoneProfileDetailsExtends[0];
      setIsPost(true);

      setName(data.nick);
      setCategory(data.zoneCategoryId);
      setProvider(data.zoneTypeName);
      setAuthCharges(
        data.chargeState ? authOptions[1].name : authOptions[0].name
      );
      setAuthDisharges(
        data.dischargeState ? authOptions[1].name : authOptions[0].name
      );
      setAuthRalenti(
        data.idleState ? authOptions[1].name : authOptions[0].name
      );
      setColor(data.color);
      setDescription(data.description);
    }
  }, [zoneProfileDetailsData, authOptions]);

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.actions.addProfileToZone}
    >
      <FetcherProfileData id={id} />
      {zoneCategories && zoneProviders && (
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
              value={category}
              set={setCategory}
              options={zoneCategories}
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
              value={provider}
              set={setProvider}
              options={zoneProviders}
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
                  category &&
                  authCharges &&
                  authDisharges &&
                  authRalenti &&
                  color &&
                  provider
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

interface Option {
  name: string;
  id: string;
}

interface SelectProps {
  isLeft?: boolean;
  name: string;
  options: Option[];
  selectTitle: string;
  set: (value: string) => void;
  title: string;
  value: string;
}

const Select = ({
  isLeft,
  name,
  options,
  selectTitle,
  set,
  title,
  value,
}: SelectProps) => {
  return (
    <div className={`${styles.inputNormal} ${isLeft ? styles.left : ""}`}>
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => set(e.target.value)}
        className={` ${styles.input} ${styles.selectInput} ${
          value !== "" ? styles.withValue : ""
        }`}
      >
        <option value="">{selectTitle}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.name?.toString() ?? ""}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

interface InputProps {
  title: string;
  name: string;
  value: string;
  set: (value: string) => void;
  isColor?: boolean;
  isLarge?: boolean;
  isLeft?: boolean;
}

const Input = ({
  title,
  name,
  value,
  set,
  isColor,
  isLarge,
  isLeft,
}: InputProps) => {
  return (
    <div
      className={`${styles.inputNormal} ${isLeft ? styles.left : ""} ${
        isLarge ? styles.inputLarge : ""
      }`}
    >
      <label htmlFor={name}>{title}</label>
      {isLarge ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${styles.textarea} ${
            value !== "" ? styles.withValue : ""
          }`}
        />
      ) : (
        <input
          type={`${isColor ? "color" : "text"}`}
          name={name}
          id={name}
          value={value}
          onChange={(e) => set(e.target.value)}
          className={` ${styles.input} ${value !== "" ? styles.withValue : ""}`}
        />
      )}
    </div>
  );
};

interface PropsFetcherProfileData {
  id: string;
}

const FetcherProfileData = ({ id }: PropsFetcherProfileData) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, logoutState } = useAuth();

  useEffect(() => {
    if (id && isAuthenticated) {
      dispatch(
        fetchZoneProfileDetails({
          id, // imei.toString(),
          logoutState,
        })
      );
    }
  }, [isAuthenticated, id]);
  return null;
};
