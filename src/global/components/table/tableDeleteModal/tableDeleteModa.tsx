import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import styles from "./tableDeleteModal.module.css";
import { ButtonTypes } from "../../generalButton/generalButton.model";
import { GeneralButton } from "../../generalButton/generalButton";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "../../modal/modal";
import { PrimitiveValue } from "../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  deleteFunction?: (idElement: string | number) => void;
  idObject?: PrimitiveValue;
}

export const TableDeleteModal = ({
  LANGUAGE,
  closeModal,
  deleteFunction,
  idObject,
}: Props) => {
  const deleteFeedback = () => {
    if (deleteFunction) {
      if (idObject) {
        deleteFunction(idObject);
      } else {
        console.error("No se ha pasado un idKey a la tabla");
      }
    } else {
      console.error("No se le ha pasado una función deleteFunction a la tabla");
    }
  };

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.buttons.delete}
    >
      <div className={`${styles.inside}`}>
        <div className={`${styles.warningIconContainer}`}>
          <div className={`${styles.warningIcon}`}>
            <WarningAmberIcon
              sx={{ fontSize: "4rem", color: "red" }}
              className={`${styles.icon}`}
            />
          </div>
        </div>
        <div className={`${styles.formTitle}`}>
          <h3>{LANGUAGE.table.formTitles.deleteElement}</h3>
          <p>{LANGUAGE.table.formTitles.deleteSubString}</p>
        </div>
        <div className={`${styles.content}`}></div>
        <div className={`${styles.buttons}`}>
          <GeneralButton
            Icon={<CloseIcon />}
            buttonStyle={`${styles.button}`}
            callback={closeModal}
            title={LANGUAGE.table.buttons.cancel}
            type={ButtonTypes.NEUTRAL}
          />
          <GeneralButton
            Icon={<DeleteForeverIcon />}
            buttonStyle={`${styles.button}`}
            callback={deleteFeedback}
            title={LANGUAGE.table.buttons.delete}
            type={ButtonTypes.DANGER}
          />
        </div>
      </div>
      <></>
    </Modal>
  );
};
