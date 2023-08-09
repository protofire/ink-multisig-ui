// import { ArrowCircleRightRounded } from "@mui/icons-material";
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

import { CHAINS_ALLOWED } from "@/config/chain";
import { SignatoriesAccount } from "@/domain/SignatoriesAccount";
import { truncateAddress } from "@/utils/formatString";

type Props = Partial<SignatoriesAccount> & {
  networkName: (typeof CHAINS_ALLOWED)[number]["name"];
};

export function XsignerAccountAvatar({ address, name, networkName }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={"column"}
      height="100%"
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <Box
          display="flex"
          gap="0.2rem"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar>
            <Identicon value={address} size={32} theme="beachball" />
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
          <Typography variant="caption" color="white">
            {name}
          </Typography>
          <Typography color="white">{truncateAddress(address, 4)}</Typography>
          <Typography color="white">124,09 AST</Typography>
        </Box>
      </Box>
      <Box sx={{ right: "0", position: "absolute", top: "4rem" }}>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          aria-label="wallet-menu"
        >
          <ChangeCircleRoundedIcon
            fontSize="large"
            color="primary"
            sx={{ transition: "0.5s", "&:hover": { rotate: "180deg" } }}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          // anchorEl={anchorEl}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 200, left: 400 }}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="caption" color="white">
              Great-Journey-wallet
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="caption" color="white">
              Crazy-Journey-wallet
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="caption" color="white">
              Amazing-Journey-wallet
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Box>
        <Typography variant="caption" color="white">
          {networkName}
        </Typography>
      </Box>
    </Box>
  );
}
