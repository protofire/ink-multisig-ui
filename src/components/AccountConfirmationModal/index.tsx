import * as React from "react";

import { UseModalBehaviour } from "@/hooks/common/useModalBehaviour";

import BaseConfirmationDialog from "../BaseConfirmationDialog";

interface Props extends Omit<UseModalBehaviour, "openModal"> {
  onConfirm: () => void;
}

const message =
  "You are about to switch to an account that is not an owner of the current multisig. You\
  will be redirected to the Welcome page. Do you want to continue?";

export default function AccountConfirmationModal({
  isOpen,
  closeModal,
  onConfirm,
}: Props) {
  return (
    <BaseConfirmationDialog
      title="Change XSigners Account Confirmation"
      message={message}
      open={isOpen}
      onClose={closeModal}
      onConfirm={onConfirm}
    />
  );
}
