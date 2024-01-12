import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

const style = {
  backgroundColor: "background.paper",
};

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  title?: string;
}

const TITLE_CONFIRM = "Confirm to continue";
const TEXT_CONFIRM = "Are you sure you want to continue?";

function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  message = TEXT_CONFIRM,
  title = TITLE_CONFIRM,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={style}>
        <DialogTitle>
          <Typography sx={{ fontSize: "1.2rem" }} color="white">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="white">
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default ConfirmationDialog;
