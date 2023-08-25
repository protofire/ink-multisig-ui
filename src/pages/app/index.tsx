import { Grid, Typography } from "@mui/material";

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

  return (
    <>
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryCard
            captionTitle="Balance"
            widthSkeleton="60%"
            captionComponent={
              balance && <XsignerBalanceText balance={balance} />
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
