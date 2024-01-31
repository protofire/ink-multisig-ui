import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  DialogActions,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

import {
  ModalStyled,
  ModalTypography,
} from "@/components/ModalAddressBook/styled";
import { BlockchainIssuedEvent } from "@/domain/BlockchainIssuedEvent";
import { MultisigContractEvents } from "@/domain/events/MultisigContractEvents";
import { TransactionProposedItemUi } from "@/domain/TransactionProposedItemUi";

export type TransactionWithAction = TransactionProposedItemUi & {
  actionName: BlockchainIssuedEvent["name"];
};

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onConfirmText?: string;
  transactionToProcess: TransactionWithAction | undefined;
}

export function ModalTxExecution({
  open,
  onClose,
  onConfirm,
  onConfirmText = "Confirm",
  transactionToProcess,
}: Props) {
  if (!open || !transactionToProcess) return;

  const action =
    transactionToProcess.actionName ===
    MultisigContractEvents.TransactionExecuted
      ? "executed"
      : "cancelled";

  return (
    <Modal open={open} onClose={onClose}>
      <ModalStyled>
        <ModalTypography id="tx-modal-execution-title" variant="h3">
          {`Transaction #${transactionToProcess.txId} has been "${action}"!`}
        </ModalTypography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          The transaction with identifier {transactionToProcess.txId} will be
          out of the of the queue for reaching the required number of
          signatures.
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          You can follow the transaction in the history tab.
        </Typography>

        <DialogActions>
          <Button onClick={onClose}>Stay here</Button>
          <Button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {onConfirmText}
          </Button>
        </DialogActions>
      </ModalStyled>
    </Modal>
  );
}
