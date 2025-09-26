import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { GeneralButton } from "../../../generalButton/generalButton";
import { ButtonTypes } from "../../../generalButton/generalButton.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
}

export const TableModalEditVehicle = ({ LANGUAGE, closeModal }: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.actions.editElement}
    >
      <GeneralButton
        callback={() => {}}
        title={LANGUAGE.table.buttons.saveEdit}
        type={ButtonTypes.CONFIRM}
      />
    </Modal>
  );
};
