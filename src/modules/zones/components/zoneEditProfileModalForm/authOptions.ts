import { LanguageInterface } from "@/global/language/constants/language.model";

export const getAuthOptions = (LANGUAGE: LanguageInterface) => {
  return [
    {
      name: LANGUAGE.zones.zoneProfileForm.noAuthorized,
      id: "0",
    },
    {
      name: LANGUAGE.zones.zoneProfileForm.authorized,
      id: "1",
    },
  ];
};
