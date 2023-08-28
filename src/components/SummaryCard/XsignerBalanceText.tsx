import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, BoxProps, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import { XsignerBalance } from "@/hooks/useGetBalance";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  padding: "1rem",
}));

interface Props {
  balance: XsignerBalance;
}

export function XsignerBalanceText({ balance }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { freeBalance, reservedBalance, totalBalance } = balance;
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Typography
        component="div"
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Typography variant="h3" color="white" component="span">
          {freeBalance}
        </Typography>{" "}
        <InfoOutlinedIcon />
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <BoxWrapper>
          <Typography variant="body1">Transferrable: {freeBalance}</Typography>
          <Typography variant="body1">Reserved: {reservedBalance}</Typography>
          <Typography variant="body1">Total Balance: {totalBalance}</Typography>
        </BoxWrapper>
      </Popover>
    </>
  );
}
