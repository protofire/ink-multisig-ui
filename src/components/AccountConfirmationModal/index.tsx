import * as React from "react";

import { useModalBehaviour } from "@/hooks/useModalBehaviour";

import BaseConfirmationDialog from "../BaseConfirmationDialog";

const message =
  "You are about to change to a account that you aren&apos;t the owner. You\
  will be redirected to the Welcome page. Do you want to continue?";

export default function AccountConfirmationModal() {
  const { closeModal, isOpen, openModal } = useModalBehaviour();

  return (
    <BaseConfirmationDialog
      title="Change XSigners Acccount Confirmation"
      message={message}
      open={isOpen}
      onClose={closeModal}
      onConfirm={() => console.log}
    />
  );
}
