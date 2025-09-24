import Image from "next/image";

import styles from "./tableModalViewVehicle.module.css";
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
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.management.tableColumns.vehicleInformation}
    >
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div>
            <h4>{LANGUAGE.management.tableColumns.imei}</h4>
            <p>{dataObject.imeIs}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.plates}</h4>
            <p>{dataObject.plate}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.name}</h4>
            <p>{dataObject.name}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.brand}</h4>
            <p>{dataObject.brand}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.model}</h4>
            <p>{dataObject.model}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.year}</h4>
            <p>{dataObject.year}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.vehicleType}</h4>
            <p>{dataObject.vehicleType}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.driver}</h4>
            <p>{dataObject.driver}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.groupName}</h4>
            <p>{dataObject.groupName ?? "ND"}</p>
          </div>
          <div>
            <h4>{LANGUAGE.management.tableColumns.serialNumber}</h4>
            <p>{dataObject.serialNumber}</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <Image
            src={"/gif/car-plates.gif"}
            width={360}
            height={225}
            alt="Car.gif"
          />
        </div>
      </div>
    </Modal>
  );
};
