"use client";
import { useState } from "react";

import styles from "./profileModalHandler.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ZoneEditProfileModalForm } from "../../zoneEditProfileModalForm/zoneEditProfileModalForm";

interface Props {
  LANGUAGE: LanguageInterface;
  id: string;
}

export const ProfileModalHandler = ({ LANGUAGE, id }: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div className={styles.buttonContainer}>
      <GeneralButton
        type={ButtonTypes.CONFIRM}
        callback={() => setIsOpenForm(true)}
        title={LANGUAGE.zones.zoneProfileDataShelf.button}
      />
      {isOpenForm && (
        <ZoneEditProfileModalForm
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsOpenForm(false)}
          id={id}
        />
      )}
    </div>
  );
};
