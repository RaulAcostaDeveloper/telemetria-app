"use client";
import { Dispatch, SetStateAction, useState } from "react";

import BorderColorIcon from "@mui/icons-material/BorderColor";

import { ButtonTypes, GeneralButton } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ZoneEditProfileModalForm } from "../../zoneEditProfileModalForm/zoneEditProfileModalForm";

interface Props {
  LANGUAGE: LanguageInterface;
  id: string;
  setUpdatesTracker: Dispatch<SetStateAction<number>>;
}

export const ProfileModalHandler = ({
  LANGUAGE,
  id,
  setUpdatesTracker,
}: Props) => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div>
      <GeneralButton
        type={ButtonTypes.CONFIRM}
        callback={() => setIsOpenForm(true)}
        title={LANGUAGE.zones.zoneProfileDataShelf.button}
        Icon={<BorderColorIcon />}
      />
      {isOpenForm && (
        <ZoneEditProfileModalForm
          LANGUAGE={LANGUAGE}
          closeModal={() => setIsOpenForm(false)}
          id={id}
          setUpdatesTracker={setUpdatesTracker}
        />
      )}
    </div>
  );
};
