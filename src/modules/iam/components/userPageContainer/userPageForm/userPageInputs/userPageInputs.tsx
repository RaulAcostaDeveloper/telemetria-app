import styles from "./userPageInputs.module.css";
import { Input } from "@/global/components/formElements/Input/input";
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
    <div className={styles.userPageInputs}>
      <Input
        title={LANGUAGE.iam.users.tableColumns.userName}
        name="usernNameUserForm"
        value={nickName}
        set={setNickname}
        LANGUAGE={LANGUAGE}
      />
      <Input
        title={LANGUAGE.iam.users.tableColumns.name}
        name="familyNameUserForm"
        value={familyName}
        set={setFamilyName}
        LANGUAGE={LANGUAGE}
      />
    </div>
  );
};
