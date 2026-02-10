import styles from "./userPageButtons.module.css";
import { ButtonTypes, GeneralButton } from "@/global/components";

interface Props {
  onDelete: () => void;
  onSafe: () => void;

  // Values para controlar el disabled
  nickName?: string;
  familyName?: string;
}

export const UserPageButtons = ({
  nickName,
  familyName,
  onDelete,
  onSafe,
}: Props) => {
  return (
    <div className={styles.userPageButtons}>
      <GeneralButton
        title="Delete user"
        type={ButtonTypes.DANGER}
        callback={onDelete}
      />

      <GeneralButton
        title="Safe changes"
        type={ButtonTypes.SUCCESS}
        callback={onSafe}
        disabled={!(nickName && familyName)}
      />
    </div>
  );
};
