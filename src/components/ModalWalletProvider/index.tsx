import {
  Avatar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import React from "react";

import { Wallet } from "@/services/useink/types";

import {
  ModalStyled,
  ModalStyledDivider,
  ModalStyledList,
  ModalStyledListItem,
  ModalTypography,
} from "./styled";

type Props = {
  open: boolean;
  wallets: Wallet[];
  connectWallet: (wallet: string) => void;
  onClose: () => void;
};
export function ModalWallet({ open, wallets, connectWallet, onClose }: Props) {
  const walletInstalled = wallets.filter((wallet) => wallet.installed);
  const walletNotInstalled = wallets.filter((wallet) => !wallet.installed);

  const handleClick = (walletName: string) => {
    onClose();
    connectWallet(walletName);
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };
  return (
    <Modal open={open} onClose={onClose}>
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
                      handleClick(w.extensionName);
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
                      openInNewTab(w.installUrl);
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
