"use client";
import { useState } from "react";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

import { ButtonTypes, GeneralButton, Modal } from "@/global/components";
import { Input } from "@/global/components/formElements/Input/input";
import { LanguageInterface } from "@/global/language/constants/language.model";

import styles from "./createUserModal.module.css";

interface Props {
  LANGUAGE: LanguageInterface;
  closeModal: () => void;
}

export const CreateUserModal = ({ LANGUAGE, closeModal }: Props) => {
  const [accountOption, setAccountOption] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [familyLastName, setFamilyLastName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [userName, setUserName] = useState<string>();

  return (
    <Modal
      LANGUAGE={LANGUAGE}
      closeModal={closeModal}
      title={LANGUAGE.iam.users.createUserForm.title}
    >
      <div className={styles.form}>
        <div className={styles.row}>
          <div className={styles.leftItem}>
            <Input
              title={LANGUAGE.iam.users.tableColumns.userName}
              name="nameProfile"
              value={userName}
              set={setUserName}
              LANGUAGE={LANGUAGE}
            />
          </div>
          <Input
            title={LANGUAGE.iam.users.tableColumns.password}
            name="passwordProfile"
            value={password}
            set={setPassword}
            type="password"
            LANGUAGE={LANGUAGE}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.leftItem}>
            <Input
              title={LANGUAGE.iam.users.tableColumns.email}
              name="emailProfile"
              value={email}
              set={setEmail}
              LANGUAGE={LANGUAGE}
            />
          </div>
          <Input
            title={LANGUAGE.iam.users.tableColumns.account}
            name="accountOptionProfile"
            value={accountOption}
            set={setAccountOption}
            LANGUAGE={LANGUAGE}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.leftItem}>
            <Input
              title={LANGUAGE.iam.users.tableColumns.name}
              name="familyNameProfile"
              value={familyName}
              set={setFamilyName}
              LANGUAGE={LANGUAGE}
            />
          </div>
          <Input
            title={LANGUAGE.iam.users.tableColumns.lastName}
            name="familyLastNameProfile"
            value={familyLastName}
            set={setFamilyLastName}
            LANGUAGE={LANGUAGE}
          />
        </div>
      </div>
      <div className={`${styles.bottom}`}>
        <GeneralButton
          Icon={<CloseIcon />}
          buttonStyle={`${styles.button}`}
          callback={closeModal}
          title={LANGUAGE.table.buttons.cancel}
          type={ButtonTypes.NEUTRAL}
        />
        <GeneralButton
          Icon={<AddCircleOutlineIcon />}
          callback={() => {}}
          title={LANGUAGE.table.buttons.create}
          type={ButtonTypes.CONFIRM}
        />
      </div>
    </Modal>
  );
};
