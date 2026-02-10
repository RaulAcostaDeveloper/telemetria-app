import { Input } from "@/global/components/formElements/Input/Input";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;

  //   Form values
  nickName: string | undefined;
  setNickname: (value: string) => void;
  familyName: string | undefined;
  setFamilyName: (value: string) => void;
}

export const UserPageInputs = ({
  LANGUAGE,
  nickName,
  setNickname,
  familyName,
  setFamilyName,
}: Props) => {
  return (
    <div>
      <Input
        title={LANGUAGE.zones.zoneProfileForm.name}
        name="usernNameUserForm"
        value={nickName}
        set={setNickname}
      />
      <Input
        title={LANGUAGE.zones.zoneProfileForm.name}
        name="familyNameUserForm"
        value={familyName}
        set={setFamilyName}
      />
    </div>
  );
};
