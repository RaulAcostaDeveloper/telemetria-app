import { LanguageInterface } from "@/global/language/constants/language.model";
import { MODAL_OPTION, PrimitiveValue } from "../../table.model";
import { TableDeleteModal } from "../../tableDeleteModal/tableDeleteModa";
import { TableModalEditHandler } from "../../tableModalEditHandler/tableModalEditHandler";
import { TableModalViewHandler } from "../../tableModalViewHandler/tableModalHandler";

interface Props {
  LANGUAGE: LanguageInterface;
  closeDeleteModal: () => void;
  closeEditModal: () => void;
  closeViewModal: () => void;
  dataObject: { [key: string]: PrimitiveValue };
  deleteFunction?: (idElement: string | number) => void;
  idObject: PrimitiveValue;
  modalOption?: MODAL_OPTION;
  showDeleteModal: boolean;
  showEditModal: boolean;
  viewModal: boolean;
}

export const TableModals = ({
  LANGUAGE,
  closeDeleteModal,
  closeEditModal,
  closeViewModal,
  dataObject,
  deleteFunction,
  idObject,
  modalOption,
  showDeleteModal,
  showEditModal,
  viewModal,
}: Props) => {
  return (
    <>
      {/* Modal que contiene el formulario de Editar*/}
      {showEditModal && modalOption && (
        <TableModalEditHandler
          LANGUAGE={LANGUAGE}
          closeModal={closeEditModal}
          modalOption={modalOption}
        />
      )}

      {/* Modal que contiene el formulario de Eliminar*/}
      {showDeleteModal && (
        <TableDeleteModal
          LANGUAGE={LANGUAGE}
          closeModal={closeDeleteModal}
          deleteFunction={deleteFunction}
          idObject={idObject}
        />
      )}

      {viewModal && modalOption && (
        <TableModalViewHandler
          LANGUAGE={LANGUAGE}
          closeModal={closeViewModal}
          dataObject={dataObject}
          modalOption={modalOption}
        />
      )}
    </>
  );
};
