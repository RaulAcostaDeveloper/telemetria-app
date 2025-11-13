import { DataShower } from "@/global/components/dataShower/datasShower";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { ZoneIdDetailsDataMock } from "@/global/dataMock/zoneIdDetailsDataMock";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const ZoneProfileData = ({ LANGUAGE }: Props) => {
  const data: DataShower = {
    left: [
      {
        title: LANGUAGE.zones.zoneProfileDataShower.zoneName,
        value: ZoneIdDetailsDataMock.value.zoneName,
      },
      {
        title: LANGUAGE.zones.zoneProfileDataShower.profileName,
        value: ZoneIdDetailsDataMock.value.profileName,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.category,
        value: ZoneIdDetailsDataMock.value.zoneCategoryName,
      },
      {
        title: LANGUAGE.zones.zoneProfileForm.provider,
        value: ZoneIdDetailsDataMock.value.provider,
      },
    ],
    right: [
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
  return <DataShower LANGUAGE={LANGUAGE} data={data} />;
};
