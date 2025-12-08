import styles from "./zoneProfileData.module.css";
import { Collapsable } from "@/global/components/collapsable/collapsable";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ProfileInfo } from "./profileInfo/profileInfo";
import { ProfileModalHandler } from "./profileModalHandler/profileModalHandlet";
import { ZoneDetailsValue } from "@/global/redux/serviceSlices/zoneDetails";
import { getCategories } from "../zoneEditProfileModalForm/categories";

interface Props {
  LANGUAGE: LanguageInterface;
  id: string;
  isProfileDataOpen: boolean;
  zoneDetailsData: ZoneDetailsValue;
  setIsProfileDataOpen: (toggle: boolean) => void;
}

export const ZoneProfileData = ({
  LANGUAGE,
  id,
  isProfileDataOpen,
  zoneDetailsData,
  setIsProfileDataOpen,
}: Props) => {
  // useEffect(() => {
  //   const defaultValue: boolean = false;
  //   const storedValue: boolean | null = localStorageGetItem(
  //     STORAGE_KEYS.IS_OPEN_PROFILE_ZONE
  //   );
  //   if (storedValue) {
  //     setIsProfileDataOpen(storedValue);
  //   } else {
  //     setIsProfileDataOpen(defaultValue);
  //     localStorageSetItem(STORAGE_KEYS.IS_OPEN_PROFILE_ZONE, defaultValue);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Actualización del elemento en LocalStorage
  //   // Usa el valor null para evita actualizarlo en el primer render
  //   if (isProfileDataOpen !== null) {
  //     localStorageSetItem(STORAGE_KEYS.IS_OPEN_PROFILE_ZONE, isProfileDataOpen);
  //   }
  // }, [isProfileDataOpen]);

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
              value={
                getCategories(LANGUAGE).find(
                  (item) => item.id === zoneDetailsData.zoneCateogryid
                )?.name
              }
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
