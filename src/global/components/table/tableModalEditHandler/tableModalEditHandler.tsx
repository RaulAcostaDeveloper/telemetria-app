import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION } from "../table.model";
import { TableModalEditVehicle } from "./tableModalEditVehicle/tableModalEditVehicle";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  modalOption: MODAL_OPTION;
}

export const TableModalEditHandler = ({
  LANGUAGE,
  closeModal,
  modalOption,
}: Props) => {
  switch (modalOption) {
    case MODAL_OPTION.VEHICLES:
      return (
        <TableModalEditVehicle LANGUAGE={LANGUAGE} closeModal={closeModal} />
      );
    default:
      return <div></div>;
  }
};
