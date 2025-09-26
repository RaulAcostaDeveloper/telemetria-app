import { LanguageInterface } from "@/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { GeneralButton } from "../../../generalButton/generalButton";
import { ButtonTypes } from "../../../generalButton/generalButton.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
}

export const TableModalCreateVehicle = ({ LANGUAGE, closeModal }: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.formTitles.createElement}
    >
      <GeneralButton
        callback={() => {}}
        title={LANGUAGE.table.buttons.saveNew}
        type={ButtonTypes.CONFIRM}
      />
    </Modal>
  );
};
