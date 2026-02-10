"use client";

import { useState } from "react";

import { DeleteConfirmationModal } from "./deleteConfirmationModal/deleteConfirmationModal";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { UserPageButtons } from "../userPageButtons/userPageButtons";
import { UserPageInputs } from "./userPageInputs/userPageInputs";

interface Props {
  userId: string;
  LANGUAGE: LanguageInterface;
}

export const UserPageForm = ({ userId, LANGUAGE }: Props) => {
  const [nickName, setNickName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const openDeleteConfirmationModal = () => {
    setShowDeleteConfirmation(true);
  };

  const onDeleteUser = () => {
    console.log("userId ", userId);
  };

  const onSafe = () => {
    console.log("userId ", userId);
  };

  return (
    <div>
      <UserPageInputs
        LANGUAGE={LANGUAGE}
        nickName={nickName}
        setNickname={setNickName}
        familyName={familyName}
        setFamilyName={setFamilyName}
      />

      <UserPageButtons
        LANGUAGE={LANGUAGE}
        nickName={nickName}
        familyName={familyName}
        onDelete={openDeleteConfirmationModal}
        onSafe={onSafe}
      />

      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          LANGUAGE={LANGUAGE}
          closeModal={() => setShowDeleteConfirmation(false)}
          deleteFunction={onDeleteUser}
        />
      )}
    </div>
  );
};
