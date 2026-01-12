import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../table.model";
import { TableModalEditVehicle } from "./tableModalEditVehicle/tableModalEditVehicle";
import { ZoneEditProfileModalForm } from "@/modules/zones/components/zoneEditProfileModalForm/zoneEditProfileModalForm";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  modalOption: MODAL_OPTION;
  idObject: PrimitiveValue;
}

export const TableModalEditHandler = ({
  LANGUAGE,
  closeModal,
  modalOption,
  idObject,
}: Props) => {
  switch (modalOption) {
    case MODAL_OPTION.VEHICLES:
      return (
        <TableModalEditVehicle LANGUAGE={LANGUAGE} closeModal={closeModal} />
      );
    case MODAL_OPTION.ZONE:
      return (
        <ZoneEditProfileModalForm
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          id={idObject ? idObject?.toString() : ""}
        />
      );
    default:
      return <div></div>;
  }
};
