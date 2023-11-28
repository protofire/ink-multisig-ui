import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useEffect, useState } from "react";

import { getChain } from "@/config/chain";
import { ROUTES } from "@/config/routes";
import { usePolkadotContext } from "@/context/usePolkadotContext";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function NetworkConfirmationModal() {
  const theme = useTheme();
  const { network, setNetwork } = usePolkadotContext();
  const { xSignerSelected } = useGetXsignerSelected();
  const router = useRouter();
  const { name: networkName } = getChain(xSignerSelected?.networkId);
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    router.replace(ROUTES.Welcome);
  };

  const handleConfirm = () => {
    xSignerSelected && setNetwork(xSignerSelected.networkId);
    setOpen(false);
  };

  useEffect(() => {
    if (!network || !xSignerSelected) return;
    if (network !== xSignerSelected.networkId) {
      setOpen(true);
    }
  }, [network, xSignerSelected]);

  return (
    <Box sx={{ width: "100%" }}>
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
          m={2}
          width={500}
          sx={{ backgroundColor: theme.palette.grey.A100 }}
        >
          <Typography variant="h4" color="primary" m={2}>
            Change Network confirmation
          </Typography>
          <Typography variant="h6" m={2}>
            This ink account exists on {networkName} network. Do you want to
            change the network to be able to see the account?
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width={300}
            mt={3}
          >
            <Button
              onClick={handleConfirm}
              variant="contained"
              sx={{ width: 134 }}
            >
              Confirm
            </Button>
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{ width: 94 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
