import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

import { useCall } from "@/hooks/useCall";

type Props = {
  open: boolean;
  handleNewToken: (address: string) => void;
  handleOpen: (open: boolean) => void;
};

export default function AddTokenModal(props: Props) {
  const { open, handleOpen, handleNewToken } = props;
  const theme = useTheme();
  const [address, setAddress] = React.useState("");
  const { data: getName, reset: resetName } = useCall(
    address,
    "psp22Metadata::tokenName"
  );
  const { data: getDecimals, reset: resetDecimals } = useCall(
    address,
    "psp22Metadata::tokenDecimals"
  );

  const handleSend = () => {
    handleNewToken(address);
    handleOpen(false);
    setAddress("");
  };

  const handleClose = () => {
    handleOpen(false);
    setAddress("");
  };

  const onOpen = () => {
    handleOpen(true);
    resetName();
    resetDecimals();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        sx={{ position: "absolute", right: "20px", zIndex: 1 }}
        onClick={onOpen}
      >
        + Add token
      </Button>
      <Modal
        open={open}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={2}
          width={500}
          sx={{ backgroundColor: theme.palette.grey.A100 }}
        >
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
            mt={1}
            pl={2}
          >
            <Typography variant="h4" color="primary">
              Add new token
            </Typography>
            <Typography variant="h6" onClick={handleClose}>
              <CloseIcon />
            </Typography>
          </Box>
          <Box
            mt={4}
            display="flex"
            gap={2.25}
            p={2}
            flexDirection="column"
            width="100%"
          >
            <TextField
              label="Address"
              autoFocus
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Token name"
              value={getName?.value || ""}
              InputLabelProps={{ shrink: !!getName?.ok }}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: address && !getName?.value && (
                  <CircularProgress size={20} />
                ),
              }}
            />
            <TextField
              value={getDecimals?.value || ""}
              InputLabelProps={{ shrink: !!getDecimals?.ok }}
              label="Decimals"
              autoFocus
              fullWidth
              InputProps={{
                endAdornment: address && !getDecimals?.value && (
                  <CircularProgress size={20} />
                ),
              }}
              margin="normal"
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={3}
            >
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{ width: 94 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSend}
                variant="contained"
                disabled={!address || (!getName?.value && !getDecimals?.value)}
                sx={{ width: 134 }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
