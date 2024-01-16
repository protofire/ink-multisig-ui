import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Typography } from "@mui/material";
import React from "react";

import {
  ModalStyled,
  ModalTypography,
} from "@/components/ModalAddressBook/styled";

interface Props {
  open: boolean;
  onClose: () => void;
  transactionId: string | undefined;
}

export function ModalTxExecution({ open, onClose, transactionId }: Props) {
  // const { countdown, startAutoClose } = useAutoClose({
  //   handleClose: onClose,
  //   autoRun: false,
  // });

  return (
    <Modal open={open} onClose={onClose}>
      <ModalStyled>
        <ModalTypography id="tx-modal-execution-title" variant="h3">
          Transaction executed!
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
          The transaction with identifier {transactionId} was successfully
          executed.
        </Typography>
        {/* <Box>
          <Typography>Closing in {countdown} seconds...</Typography>
        </Box> */}
      </ModalStyled>
    </Modal>
  );
}
