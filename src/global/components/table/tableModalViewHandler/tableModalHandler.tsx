import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../table.model";
import { TableModalViewGroup } from "./tableModalViewGroup/tableModalViewGroup";
import { TableModalViewVehicle } from "./tableModalViewVehicle/tableModalViewVehicle";
import { ZoneLoadsModal } from "@/modules/zones/components/zoneLoadsModal/zoneLoadsModal";
import { ZoneUnloadsModal } from "@/modules/zones/components/zoneUnloadsModal/zoneUnloadsModal";
import { TableModalViewZone } from "./tableModalViewZone/tableModalViewZone";

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
    case MODAL_OPTION.GROUPS:
      return (
        <TableModalViewGroup
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          dataObject={dataObject}
        />
      );
    case MODAL_OPTION.ZONE:
      return (
        <TableModalViewZone
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          dataObject={dataObject}
        />
      );
    case MODAL_OPTION.ZONELOAD:
      return (
        <ZoneLoadsModal
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          dataObject={dataObject}
        />
      );
    case MODAL_OPTION.ZONEUNLOAD:
      return (
        <ZoneUnloadsModal
          LANGUAGE={LANGUAGE}
          closeModal={closeModal}
          dataObject={dataObject}
        />
      );
    default:
      return <div></div>;
  }
};
