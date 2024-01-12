import * as React from "react";

import { UseModalBehaviour } from "@/hooks/useModalBehaviour";

import BaseConfirmationDialog from "../BaseConfirmationDialog";

interface Props extends Omit<UseModalBehaviour, "openModal"> {
  onConfirm: () => void;
}

const message =
  "You are about to change to a account that you aren' t the owner. You\
  will be redirected to the Welcome page. Do you want to continue?";

export default function AccountConfirmationModal({
  isOpen,
  closeModal,
  onConfirm,
}: Props) {
  return (
    <BaseConfirmationDialog
      title="Change XSigners Acccount Confirmation"
      message={message}
      open={isOpen}
      onClose={closeModal}
      onConfirm={onConfirm}
    />
  );
}
