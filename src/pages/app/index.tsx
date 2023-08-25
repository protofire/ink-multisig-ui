import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Grid, Popover, Typography } from "@mui/material";
import React from "react";

import { AddressBookWidget } from "@/components/AddressBookWidget";
import { SummaryCard } from "@/components/SummaryCard";
import { XsignerBalanceText } from "@/components/SummaryCard/XsignerBalanceText";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function AppDashboard() {
  const { xSignerSelected } = useGetXsignerSelected();

  const { balance, isLoading: isLoadingBalance } = useGetBalance(
    xSignerSelected?.address
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Balance"
            widthSkeleton="60%"
            captionComponent={
              <>
                {/*  <XsignerBalanceText freeBalance={balance?.freeBalance} /> */}
                <Typography
                  component="div"
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Typography variant="h3" color="white" component="span">
                    120 ROC
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
                  <XsignerBalanceText
                    freeBalance={balance?.freeBalance}
                    reservedBalance={balance?.reservedBalance}
                  />
                </Popover>
              </>
            }
            isLoading={isLoadingBalance}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard captionTitle="Tracked Tokens" caption="0" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard captionTitle="Tracked NFTs" caption="3" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard captionTitle="Owners" caption="0" />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "1rem",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary">
            Pinned addresses
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <AddressBookWidget />
        </Grid>
      </Grid>
    </>
  );
}
