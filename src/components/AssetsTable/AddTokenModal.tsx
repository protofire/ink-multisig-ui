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
import { useEffect } from "react";

import { useCall } from "@/hooks/useCall";
import { isValidAddress } from "@/utils/blockchain";

type Props = {
  open: boolean;
  handleNewToken: (address: string) => void;
  handleOpen: (open: boolean) => void;
};

export default function AddTokenModal(props: Props) {
  const { open, handleOpen, handleNewToken } = props;
  const theme = useTheme();
  const [address, setAddress] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const {
    data: getName,
    reset: resetName,
    error: nameError,
  } = useCall(address, "psp22Metadata::tokenName");
  const {
    data: getDecimals,
    reset: resetDecimals,
    error: decimalsError,
  } = useCall(address, "psp22Metadata::tokenDecimals");

  /*
  useEffect(() => {
    if (!address) return;
    if (nameError) {
      console.log("ERROR 1", [errors[0], nameError, errors[2]]);
      setErrors([errors[0], nameError, errors[2]]);
    }
    if (decimalsError) {
      console.log("ERROR 2", [errors[0], errors[1], decimalsError]);
      setErrors([errors[0], errors[1], decimalsError]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameError, decimalsError, address]);
  */

  useEffect(() => {
    if (!address) return;
    const isAddressValid = isValidAddress(address);
    if (!isAddressValid) {
      setErrors(["Invalid address.", errors[1], errors[2]]);
    } else {
      setErrors([...errors.splice(1)]);
    }
  }, [address, errors]);

  const handleSend = () => {
    handleNewToken(address);
    handleOpen(false);
    setAddress("");
  };

  const handleClose = () => {
    handleOpen(false);
    setAddress("");
    setErrors([]);
  };

  const onOpen = () => {
    handleOpen(true);
    setErrors([]);
    resetName();
    resetDecimals();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button onClick={onOpen}>+ Add token</Button>
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
              error={!!errors[0]}
              helperText={errors[0]}
              margin="normal"
            />
            <TextField
              label="Token name"
              value={getName?.value || ""}
              InputLabelProps={{ shrink: !!getName?.ok }}
              fullWidth
              error={!!nameError}
              helperText={nameError}
              margin="normal"
              InputProps={{
                endAdornment: address && !nameError && !getName?.value && (
                  <CircularProgress size={20} />
                ),
              }}
            />
            <TextField
              value={getDecimals?.value || ""}
              InputLabelProps={{ shrink: !!getDecimals?.ok }}
              label="Decimals"
              fullWidth
              error={!!decimalsError}
              helperText={decimalsError}
              InputProps={{
                endAdornment: address &&
                  !decimalsError &&
                  !getDecimals?.value && <CircularProgress size={20} />,
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
