import {
  Avatar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import React from "react";

import { Wallet } from "@/infrastructure/useink/walletTypes";

import {
  ModalStyled,
  ModalStyledDivider,
  ModalStyledList,
  ModalStyledListItem,
  ModalTypography,
} from "./styled";

type Props = {
  open: boolean;
  handleClose: () => void;
  wallets: Wallet[];
  setCurrentWallet: (wallet: Wallet) => void;
};
export function ModalWallet({
  open,
  handleClose,
  wallets,
  setCurrentWallet,
}: Props) {
  const walletInstalled = wallets.filter((wallet) => wallet.installed);
  const walletNotInstalled = wallets.filter((wallet) => !wallet.installed);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalStyled>
        <ModalTypography id="modal-modal-title" variant="h3">
          Connect your wallet
        </ModalTypography>
        <Box>
          <ModalTypography variant="h6">Installed Wallets</ModalTypography>
          <ModalStyledList disablePadding>
            {walletInstalled.map((w) => (
              <ListItem key={w.title}>
                <>
                  <ModalStyledListItem
                    onClick={() => {
                      setCurrentWallet(w);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={w.logo.src} alt={w.logo.alt} />
                    </ListItemIcon>
                    <ListItemText primary={`${w.title}`} />
                  </ModalStyledListItem>
                </>
              </ListItem>
            ))}
          </ModalStyledList>
        </Box>
        <Box>
          <ModalStyledDivider variant="middle" />
          <ModalStyledList disablePadding>
            {walletNotInstalled.map((w) => (
              <ListItem key={w.title}>
                <>
                  <ModalStyledListItem
                    onClick={() => {
                      setCurrentWallet(w);
                      handleClose();
                    }}
                  >
                    <ListItemIcon>
                      <Avatar src={w.logo.src} alt={w.logo.alt} />
                    </ListItemIcon>
                    <ListItemText primary={`Install ${w.title}`} />
                  </ModalStyledListItem>
                </>
              </ListItem>
            ))}
          </ModalStyledList>
        </Box>
      </ModalStyled>
    </Modal>
  );
}