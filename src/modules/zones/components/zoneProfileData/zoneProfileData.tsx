"use client";
import { useEffect, useState } from "react";

import styles from "./zoneProfileData.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/global/localStorage/utils/storageService";
import { Collapsable } from "@/global/components/collapsable/collapsable";
import { DataShelf } from "@/global/components/dataShelf/dataShelf";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ProfileModalHandler } from "./profileModalHandler/profileModalHandlet";
import { STORAGE_KEYS } from "@/global/localStorage/constants/storageKeys";
import { ZoneIdDetailsDataMock } from "@/global/dataMock/zoneIdDetailsDataMock";

interface Props {
  LANGUAGE: LanguageInterface;
  id: string;
}

export const ZoneProfileData = ({ LANGUAGE, id }: Props) => {
  const [isProfileDataOpen, setIsProfileDataOpen] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const defaultValue: boolean = false;
    const storedValue: boolean | null = localStorageGetItem(
      STORAGE_KEYS.IS_OPEN_PROFILE_ZONE
    );
    if (storedValue) {
      setIsProfileDataOpen(storedValue);
    } else {
      setIsProfileDataOpen(defaultValue);
      localStorageSetItem(STORAGE_KEYS.IS_OPEN_PROFILE_ZONE, defaultValue);
    }
  }, []);

  useEffect(() => {
    // Actualización del elemento en LocalStorage
    // Usa el valor null para evita actualizarlo en el primer render
    if (isProfileDataOpen !== null) {
      localStorageSetItem(STORAGE_KEYS.IS_OPEN_PROFILE_ZONE, isProfileDataOpen);
    }
  }, [isProfileDataOpen]);

  const data: DataShelf = {
    left: [
      {
        title: LANGUAGE.zones.zoneProfileDataShelf.zoneName,
        value: ZoneIdDetailsDataMock.value.zoneName,
      },
      {
        title: LANGUAGE.zones.zoneProfileDataShelf.profileName,
        value: ZoneIdDetailsDataMock.value.profileName,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.category,
        value: ZoneIdDetailsDataMock.value.zoneCategoryName,
      },
    ],
    right: [
      {
        title: LANGUAGE.zones.zoneProfileForm.provider,
        value: ZoneIdDetailsDataMock.value.provider,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.charges,
        value: ZoneIdDetailsDataMock.value.chargeState
          ? LANGUAGE.zones.zoneProfileForm.authorized
          : LANGUAGE.zones.zoneProfileForm.noAuthorized,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.discharges,
        value: ZoneIdDetailsDataMock.value.dischargeState
          ? LANGUAGE.zones.zoneProfileForm.authorized
          : LANGUAGE.zones.zoneProfileForm.noAuthorized,
      },
    ],
    third: [
      {
        title: LANGUAGE.zones.zoneProfileForm.ralenti,
        value: ZoneIdDetailsDataMock.value.idleState
          ? LANGUAGE.zones.zoneProfileForm.authorized
          : LANGUAGE.zones.zoneProfileForm.noAuthorized,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.description,
        value: ZoneIdDetailsDataMock.value.description,
      },
    ],
  };
  return (
    <div className={styles.container}>
      <Collapsable
        LANGUAGE={LANGUAGE}
        title={LANGUAGE.zones.zoneProfileDataShelf.title}
        defaultOpen={isProfileDataOpen}
        set={setIsProfileDataOpen}
      >
        <ProfileModalHandler LANGUAGE={LANGUAGE} id={id} />
        <DataShelf LANGUAGE={LANGUAGE} data={data} />
      </Collapsable>
    </div>
  );
};
