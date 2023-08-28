import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, BoxProps, Divider, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import { XsignerBalance } from "@/hooks/useGetBalance";

const BoxWrapper = styled(Box)<BoxProps>(() => ({
  padding: "1rem",
  minWidth: "18rem",
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
        sx={{ display: "flex", gap: "0.4rem" }}
      >
        <Typography variant="h3" color="white" component="span">
          {freeBalance}
        </Typography>{" "}
        <InfoOutlinedIcon fontSize="medium" />
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" component="span">
              Transferrable:
            </Typography>{" "}
            <Typography variant="body1" component="span">
              {freeBalance}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1" component="span">
              Reserved:
            </Typography>
            <Typography variant="body1" component="span">
              {reservedBalance}
            </Typography>
          </Box>
          <Divider />
          <Box display={"flex"} justifyContent={"space-between"} mt={1}>
            <Typography variant="body1" fontWeight={800} component="span">
              Total Balance:{" "}
            </Typography>
            <Typography variant="body1" fontWeight={800} component="span">
              {totalBalance}
            </Typography>
          </Box>
        </BoxWrapper>
      </Popover>
    </>
  );
}
