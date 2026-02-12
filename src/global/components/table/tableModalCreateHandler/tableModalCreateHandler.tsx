import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION } from "../table.model";
import { CreateUserModal } from "@/modules/iam/components/createUserModal/createUserModal";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  modalOption: MODAL_OPTION;
}

export const TableModalCreateHandler = ({
  LANGUAGE,
  closeModal,
  modalOption,
}: Props) => {
  switch (modalOption) {
    case MODAL_OPTION.USER:
      return <CreateUserModal LANGUAGE={LANGUAGE} closeModal={closeModal} />;
    default:
      return <div></div>;
  }
};
