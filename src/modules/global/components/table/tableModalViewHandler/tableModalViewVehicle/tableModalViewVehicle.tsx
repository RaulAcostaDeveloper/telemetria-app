import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Modal } from "../../../modal/modal";
import { PrimitiveValue } from "../../table.model";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
}

export const TableModalViewVehicle = ({
  LANGUAGE,
  closeModal,
  dataObject,
}: Props) => {
  return (
    <Modal LANGUAGE={LANGUAGE} closeModal={closeModal}>
      <div>{dataObject.brand}</div>
      <div>{dataObject.driver}</div>
      <div>{dataObject.group}</div>
      <div>{dataObject.id}</div>
      <div>{dataObject.imeIs}</div>
      <div>{dataObject.model}</div>
      <div>{dataObject.name}</div>
      <div>{dataObject.plate}</div>
      <div>{dataObject.serialNumber}</div>
      <div>{dataObject.vehicleType}</div>
      <div>{dataObject.year}</div>
    </Modal>
  );
};
