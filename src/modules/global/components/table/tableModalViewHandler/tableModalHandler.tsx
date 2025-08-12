import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../table.model";
import { TableModalViewVehicle } from "./tableModalViewVehicle/tableModalViewVehicle";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
  modalOption: MODAL_OPTION;
}

export const TableModalViewHandler = ({
  LANGUAGE,
  closeModal,
  dataObject,
  modalOption,
}: Props) => {
  switch (modalOption) {
    case MODAL_OPTION.VEHICLES:
      return (
        <TableModalViewVehicle
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          dataObject={dataObject}
        />
      );
    default:
      return <div></div>;
  }
};
