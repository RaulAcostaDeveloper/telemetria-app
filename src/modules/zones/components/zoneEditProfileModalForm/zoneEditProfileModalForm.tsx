import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { LanguageInterface } from "@/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
}

export const ZoneEditProfileModalForm = ({ LANGUAGE, closeModal }: Props) => {
  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.table.actions.addProfileToZone}
    >
      <GeneralButton
        callback={() => {}}
        title={LANGUAGE.table.buttons.saveEdit}
        type={ButtonTypes.CONFIRM}
      />
    </Modal>
  );
};
