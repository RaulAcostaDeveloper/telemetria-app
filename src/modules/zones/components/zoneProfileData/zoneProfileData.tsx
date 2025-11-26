"use client";
import { useEffect, useState } from "react";

import styles from "./zoneProfileData.module.css";
import {
  localStorageGetItem,
  localStorageSetItem,
} from "@/global/localStorage/utils/storageService";
import { Collapsable } from "@/global/components/collapsable/collapsable";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ProfileInfo } from "./profileInfo/profileInfo";
import { ProfileModalHandler } from "./profileModalHandler/profileModalHandlet";
import { STORAGE_KEYS } from "@/global/localStorage/constants/storageKeys";
import { ZoneDetailsValue } from "@/global/redux/serviceSlices/zoneDetails";

interface Props {
  LANGUAGE: LanguageInterface;
  id: string;
  zoneDetailsData: ZoneDetailsValue;
}

export const ZoneProfileData = ({ LANGUAGE, id, zoneDetailsData }: Props) => {
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

  return (
    <div className={styles.container}>
      <Collapsable
        LANGUAGE={LANGUAGE}
        title={LANGUAGE.zones.zoneProfileDataShelf.title}
        defaultOpen={isProfileDataOpen}
        set={setIsProfileDataOpen}
      >
        <div className={styles.inside}>
          <div className={styles.infoSection}>
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileDataShelf.zoneName}
              value={zoneDetailsData.zoneName}
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileDataShelf.profileName}
              value={zoneDetailsData.profileName}
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.category}
              value={zoneDetailsData.zoneCategoryName}
              // Cuando añadan el categoryId en los detalles de la zona
              // {
              //   getCategories(LANGUAGE).find((item) => item.id === "targetId")
              //     ?.name
              // }
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.provider}
              value={zoneDetailsData.zoneProviderName}
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.charges}
              value={
                zoneDetailsData.chargeState
                  ? LANGUAGE.zones.zoneProfileForm.authorized
                  : LANGUAGE.zones.zoneProfileForm.noAuthorized
              }
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.discharges}
              value={
                zoneDetailsData.dischargeState
                  ? LANGUAGE.zones.zoneProfileForm.authorized
                  : LANGUAGE.zones.zoneProfileForm.noAuthorized
              }
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.ralenti}
              value={
                zoneDetailsData.idleState
                  ? LANGUAGE.zones.zoneProfileForm.authorized
                  : LANGUAGE.zones.zoneProfileForm.noAuthorized
              }
            />
            <ProfileInfo
              title={LANGUAGE.zones.zoneProfileForm.description}
              value={zoneDetailsData.description}
              isLarge
            />
          </div>
          <div className={styles.buttonSection}>
            <ProfileModalHandler LANGUAGE={LANGUAGE} id={id} />
          </div>
        </div>
      </Collapsable>
    </div>
  );
};
