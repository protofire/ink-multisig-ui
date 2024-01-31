import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import router from "next/router";
import * as React from "react";

import { ROUTES } from "@/config/routes";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { UseModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { formatThreshold, truncateAddress } from "@/utils/formatString";

import CopyButton from "../common/CopyButton";

interface Props extends Partial<UseModalBehaviour> {
  xsigners: SignatoriesAccount[];
  onClick: (account: SignatoriesAccount) => Promise<void | SignatoriesAccount>;
}

export function SelectXsignerItems({
  isOpen,
  closeModal,
  xsigners,
  onClick: setXsigner,
}: Props) {
  const handleMultisigRedirect = (address: string) => {
    const selectedMultisig = xsigners?.find(
      (xsigners) => xsigners.address === address
    );
    if (!selectedMultisig) {
      return;
    }
    setXsigner(selectedMultisig as SignatoriesAccount);
    router.replace(ROUTES.App);
  };

  if (xsigners === null) return null;
  return (
    <Menu
      id="basic-menu"
      anchorReference="anchorPosition"
      anchorPosition={{ top: 200, left: 520 }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      open={isOpen || false}
      onClose={closeModal}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {xsigners.map((xsigner) => (
        <MenuItem
          key={xsigner.address}
          onClick={() => {
            handleMultisigRedirect(xsigner.address);
            closeModal && closeModal();
          }}
        >
          <Box display="flex" alignItems="center" gap="0.5rem">
            <Box
              display="flex"
              gap="0.2rem"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar>
                <Identicon
                  value={xsigner.address}
                  size={32}
                  theme="beachball"
                />
              </Avatar>
              <Tooltip title="Threshold" arrow>
                <Box display="flex" flexDirection="column">
                  <Typography variant="caption" color="primary">
                    {formatThreshold({
                      threshold: xsigner.threshold,
                      owners: xsigner.owners.length,
                    })}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
            <Box marginLeft={1}>
              <Typography variant="subtitle1" color="white" noWrap>
                {xsigner.name}
              </Typography>
              <Typography color="white" variant="caption">
                {truncateAddress(xsigner.address, 4)}
              </Typography>
              <CopyButton text={xsigner.address as string} />
            </Box>
            <Box>
              {/* 
                TODO
                <Typography color="white" fontWeight="bold">
                  124,09 AST
                </Typography> */}
            </Box>
          </Box>
        </MenuItem>
      ))}
    </Menu>
  );
}
