import ChangeCircleRoundedIcon from "@mui/icons-material/ChangeCircleRounded";
import PeopleIcon from "@mui/icons-material/People";
import {
  Avatar,
  Box,
  IconButton,
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

interface Props extends UseModalBehaviour {
  xsigners: SignatoriesAccount[];
}

export function SelectXsignerItems({
  isOpen,
  openModal,
  closeModal,
  xsigners,
}: Props) {
  return (
    <Box sx={{ right: "0", position: "absolute", top: "3.5rem" }}>
      <IconButton
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={openModal}
        aria-label="wallet-menu"
      >
        <ChangeCircleRoundedIcon
          fontSize="large"
          color="primary"
          sx={{
            transition: "0.6s",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
            "&.MuiIconButton-root:hover": {
              scale: "1.1",
              backgroundColor: "transparent" /* , rotate: "90deg" */,
            },
          }}
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorReference="anchorPosition"
        anchorPosition={{ top: 140, left: 580 }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        open={isOpen}
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
                    <PeopleIcon fontSize="small" color="primary" />
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ margin: "-4px 0" }}
                    >
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
    </Box>
  );
}
