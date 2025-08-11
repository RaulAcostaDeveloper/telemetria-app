import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { MODAL_OPTION } from "../table.model";
import { TableModalCreateVehicle } from "./tableModalCreateVehicle/tableModalCreateVehicle";

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
    case MODAL_OPTION.VEHICLES:
      return (
        <TableModalCreateVehicle LANGUAGE={LANGUAGE} closeModal={closeModal} />
      );
    default:
      return <div></div>;
  }
};
