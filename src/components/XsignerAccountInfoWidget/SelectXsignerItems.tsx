import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import Identicon from "@polkadot/react-identicon";
import * as React from "react";

import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { UseModalBehaviour } from "@/hooks/useModalBehaviour";
import { truncateAddress } from "@/utils/formatString";

interface Props extends Partial<UseModalBehaviour> {
  xsigners: SignatoriesAccount[];
}

export function SelectXsignerItems({ isOpen, closeModal, xsigners }: Props) {
  return (
    <Menu
      id="basic-menu"
      anchorReference="anchorPosition"
      anchorPosition={{ top: 140, left: 420 }}
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
        <MenuItem key={xsigner.address} onClick={closeModal}>
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
                    2/4
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
