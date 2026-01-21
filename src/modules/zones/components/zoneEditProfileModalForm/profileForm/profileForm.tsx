import styles from "../zoneEditProfileModalForm.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { Input } from "../input/input";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Select } from "../select/select";
import { ZoneCategoriesData } from "@/global/redux/serviceSlices/zoneCategoriesSlice";
import { ZoneProvidersData } from "@/global/redux/serviceSlices/zoneProvidersSlice";
import { getAuthOptions } from "../authOptions";
import { getCategories } from "../categories";

interface Props {
  LANGUAGE: LanguageInterface;
  authCharges: string;
  authDisharges: string;
  authRalenti: string;
  categoryId: string;
  closeModal: () => void;
  color: string;
  description: string;
  name: string;
  onConfirm: () => void;
  providerId: string;
  setAuthCharges: (authCharges: string) => void;
  setAuthDisharges: (authDischarges: string) => void;
  setAuthRalenti: (authRalenti: string) => void;
  setCategoryId: (categoryId: string) => void;
  setColor: (color: string) => void;
  setDescription: (description: string) => void;
  setName: (name: string) => void;
  setProviderId: (providerId: string) => void;
  zoneCategoriesData: ZoneCategoriesData | null;
  zoneCategoriesStatus: SERVICE_STATUS;
  zoneProvidersData: ZoneProvidersData | null;
}

export const ProfileForm = ({
  LANGUAGE,
  authCharges,
  authDisharges,
  authRalenti,
  categoryId,
  closeModal,
  color,
  description,
  name,
  onConfirm,
  providerId,
  setAuthCharges,
  setAuthDisharges,
  setAuthRalenti,
  setCategoryId,
  setColor,
  setDescription,
  setName,
  setProviderId,
  zoneCategoriesData,
  zoneCategoriesStatus,
  zoneProvidersData,
}: Props) => {
  return (
    <>
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
                options={getAuthOptions(LANGUAGE)}
                isLeft
              />
              <Select
                title={LANGUAGE.zones.zoneProfileForm.discharges}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="unloadedAuth"
                value={authDisharges}
                set={setAuthDisharges}
                options={getAuthOptions(LANGUAGE)}
              />
            </div>

            <div className={styles.row}>
              <Select
                title={LANGUAGE.zones.zoneProfileForm.ralenti}
                selectTitle={LANGUAGE.zones.zoneProfileForm.selectAnOption}
                name="ralenti"
                value={authRalenti}
                set={setAuthRalenti}
                options={getAuthOptions(LANGUAGE)}
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
        statusCode={zoneCategoriesData?.statusCode}
      />
    </>
  );
};
