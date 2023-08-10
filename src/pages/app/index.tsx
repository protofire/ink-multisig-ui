import { Grid, Typography } from "@mui/material";

import { SummaryCard } from "@/components/SummaryCard";
import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetXsignerSelected } from "@/hooks/xsignerSelected/useGetXsignerSelected";

export default function AppDashboard() {
  const { xSignerSelected } = useGetXsignerSelected();

  const { balance, isLoading: isLoadingBalance } = useGetBalance(
    xSignerSelected?.address
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Summary</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SummaryCard
          captionTitle="Balance"
          widthSkeleton="60%"
          captionComponent={
            <>
              <Typography>{balance?.freeBalance}</Typography>
              <Typography>{balance?.reservedBalance}</Typography>
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
        <SummaryCard captionTitle="Transactions queued" caption="0" />
      </Grid>
    </Grid>
  );
}
