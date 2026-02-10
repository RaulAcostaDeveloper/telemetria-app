import { LanguageInterface } from "@/global/language/constants/language.model";
import styles from "./userPageButtons.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";

interface Props {
  onDelete: () => void;
  onSafe: () => void;

  // Values para controlar el disabled
  nickName?: string;
  familyName?: string;
  LANGUAGE: LanguageInterface;
}

export const UserPageButtons = ({
  nickName,
  familyName,
  onDelete,
  onSafe,
  LANGUAGE,
}: Props) => {
  return (
    <div className={styles.userPageButtons}>
      <GeneralButton
        title={LANGUAGE.iam.users.userForm.deleteUser}
        type={ButtonTypes.DANGER}
        callback={onDelete}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />

      <GeneralButton
        title={LANGUAGE.iam.users.userForm.saveChanges}
        type={ButtonTypes.SUCCESS}
        callback={onSafe}
        disabled={!(nickName && familyName)}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.titleStyle}
      />
    </div>
  );
};
